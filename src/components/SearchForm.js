import React from "react";

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
    this.setState({
      inputField: event.target.value
    });
  }

  render() {
    return (
      <div>
        <form
          onSubmit={this.handleSubmit}
          className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search"
        >
          <div className="input-group">
            <input
              type="text"
              value={this.state.inputField}
              onChange={this.handleChange}
              className="form-control bg-light border-0 small"
              placeholder="Search for..."
              aria-label="Search"
              aria-describedby="basic-addon2"
            />
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
