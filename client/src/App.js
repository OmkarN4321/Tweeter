import { Component } from "react";
import HomePage from "./components/homepage/feed/HomePage";
import AppNavbar from "./components/homepage/navbar/AppNavbar";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";

import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  state = {
    toggle: false,
  };

  componentDidMount() {
    store.dispatch(loadUser());
  }

  toggleFeed = () => {
    this.setState({
      toggle: !this.state.toggle,
    });
  };

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar toggleFeed={this.toggleFeed} />
          <HomePage toggle={this.state.toggle} />
        </div>
      </Provider>
    );
  }
}

export default App;
