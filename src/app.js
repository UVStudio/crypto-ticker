import React from "react";
import ReactDOM from "react-dom";

import Footer from "./components/Footer";
import BarIllustrations from "./components/BarIllustrations";
import TwoCharts from "./components/TwoCharts";
import Reports from "./components/Reports";
import ScrollToTop from "./components/ScrollToTop";
import SearchForm from "./components/SearchForm";

class Content extends React.Component {
  constructor() {
    super();
    this.handleData = this.handleData.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.reportsElement = React.createRef();
    this.state = {
      fromChild: ""
    };
  }

  handleData(data) {
    this.setState({
      fromChild: data
    });
  }

  handleClick() {
    this.reportsElement.current.addTracker(this.state.fromChild);
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
          <SearchForm searchResult={this.handleData} />
          <ul className="navbar-nav ml-auto">
            <li className="nav-item dropdown no-arrow d-sm-none">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="searchDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fas fa-search fa-fw"></i>
              </a>
              <div
                className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                aria-labelledby="searchDropdown"
              >
                <form className="form-inline mr-auto w-100 navbar-search">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control bg-light border-0 small"
                      placeholder="Search for..."
                      aria-label="Search"
                      aria-describedby="basic-addon2"
                    />
                    <div className="input-group-append">
                      <button className="btn btn-primary" type="button">
                        <i className="fas fa-search fa-sm"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </li>
            <h5 className="mr-2 d-none d-lg-inline text-gray-600">Cryptick</h5>
          </ul>
        </nav>

        <div className="container-fluid">
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.handleClick}
            >
              Add: {this.state.fromChild}
            </button>
          </div>
          <Reports crypto={this.state.fromChild} ref={this.reportsElement} />
          <TwoCharts />
          <BarIllustrations />
          <Footer />
          <ScrollToTop />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Content />, document.getElementById("content"));
