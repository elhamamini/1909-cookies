import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import axios from 'axios';
class MainPage extends Component {
  state = {
    username: '',
    password: '',
    loggedIn: false,
    loggedInError: false
  };
  handleLoggin = () => {
    axios
      .post('/login', this.state)
      .then(() => this.setState({ loggedIn: true }))
      .catch(() => {
        this.setState({
          loggedInError: true
        });
      });
  };
  componentDidMount() {
    axios
      .get('/whoami')
      .then(() => {
        this.setState({ loggedIn: true });
      })
      .catch(e => console.log(e));
  }
  render() {
    return (
      <Fragment>
        {!this.state.loggedIn ? (
          <div>
            <input
              name={'username'}
              onChange={ev => this.setState({ username: ev.target.value })}
            />
            <input
              name={'password'}
              onChange={ev => this.setState({ password: ev.target.value })}
            />
            <button onClick={this.handleLoggin}></button>
          </div>
        ) : (
          <h1>logged In!</h1>
        )}
      </Fragment>
    );
  }
}

ReactDOM.render(<MainPage />, document.querySelector('#app'), () => {
  console.log('Application rendered!');
});
