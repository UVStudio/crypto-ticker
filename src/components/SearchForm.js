import React from "react";

const cryptoNamesArray = [];
fetch("https://api.coincap.io/v2/assets")
  .then(res => res.json())
  .then(data => {
    const array = data.data;
    array.map(elem => cryptoNamesArray.push(elem.id));
  })
  .catch(error => console.log(error));

export default class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputField: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.searchResult(this.state.inputField);
    this.setState({
      inputField: ""
    });
  }

  handleChange(event) {
    const input = event.target.value;
    const result = cryptoNamesArray.filter(str => str.includes(input));
    console.log(result);
    this.setState({
      inputField: event.target.value
    });
  }

  render() {
    return (
      <div>
        <form
          onSubmit={this.handleSubmit}
          className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search  dropdown"
        >
          <div className="input-group">
            <input
              type="text"
              id="search-field"
              value={this.state.inputField}
              onChange={this.handleChange}
              className="form-control bg-light border-0 small"
              placeholder="Search for..."
              aria-label="Search"
              aria-describedby="basic-addon2"
            />
            <ul className="dropdown-menu">
              <li className="dropdown-item" href="#">
                test
              </li>
              <li className="dropdown-item" href="#">
                test
              </li>
              <li className="dropdown-item" href="#">
                test
              </li>
            </ul>
            <div className="input-group-append">
              <button className="btn btn-primary" type="submit">
                <i className="fas fa-search fa-sm"></i>
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
