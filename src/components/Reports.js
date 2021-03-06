import React from "react";
import Tracker from "./Tracker";

//Reports - real time crypto updates
export default class Reports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: [
        {
          id: undefined,
          name: "litecoin",
          price: "loading..."
        },
        {
          id: undefined,
          name: "ethereum",
          price: "loading..."
        }
      ]
    };

    this.closeTracker = this.closeTracker.bind(this);
  }
  // let socket = new WebSocket(`wss://ws.coincap.io/prices?assets=ALL`);
  // socket.onmessage = e => {
  //   console.log(e.data);
  // };
  componentDidMount() {
    const currNames = [];
    for (let i = 0; i < this.state.currencies.length; i++) {
      this.state.currencies[i].id = i;
      currNames.push(this.state.currencies[i].name);
    }

    currNames.forEach(curr => {
      let socket = new WebSocket(`wss://ws.coincap.io/prices?assets=${curr}`);
      socket.onmessage = e => {
        let priceStream = JSON.parse(e.data)[curr];
        for (let i = 0; i < this.state.currencies.length; i++) {
          if (this.state.currencies[i].name === curr) {
            this.state.currencies[i].price = priceStream;
          }
        }
        this.setState({ currencies: this.state.currencies });
      };
    });
  }

  closeTracker(id) {
    this.setState({
      currencies: this.state.currencies.filter(currency => {
        return currency.id !== id;
      })
    });
  }

  addTracker(name) {
    const currNames = [];
    const newCurrencies = this.state.currencies.concat({
      id: undefined,
      name: name,
      price: "loading..."
    });
    this.setState({
      currencies: newCurrencies
    });
    for (let i = 0; i < newCurrencies.length; i++) {
      newCurrencies[i].id = i;
      currNames.push(newCurrencies[i].name);
    }
    currNames.forEach(curr => {
      const socket = new WebSocket(`wss://ws.coincap.io/prices?assets=${curr}`);
      socket.onmessage = e => {
        const priceStream = JSON.parse(e.data)[curr];
        for (let i = 0; i < newCurrencies.length; i++) {
          if (newCurrencies[i].name === curr) {
            newCurrencies[i].price = priceStream;
          }
        }
        this.setState({ currencies: this.state.currencies });
      };
    });
  }

  render() {
    return (
      <div className="row">
        {this.state.currencies.map(currency => (
          <Tracker
            key={currency.id}
            crypto={currency}
            closeTracker={this.closeTracker}
          />
        ))}
      </div>
    );
  }
}
