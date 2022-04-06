import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getToken, sendInfoPlayer } from '../Action';

import logo from '../trivia.png';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      btnDisabled: true,
    };
  }

  componentDidMount() {
    const { fetchToken } = this.props;
    console.log('oi');
    fetchToken();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, () => this.validButton());
  }

  validButton = () => {
    const { email, name } = this.state;
    const number = 2;
    let button = true;

    if (name.length > number && this.validEmail(email)) button = false;

    this.setState({
      btnDisabled: button,
    });
  }

  validEmail = (email) => /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email)

  handleClickButton = () => {
    const { sendInfo, history } = this.props;
    const { name, email } = this.state;

    sendInfo({ email, name });
    history.push('/game');
  }

  render() {
    const { btnDisabled, name, email } = this.state;
    const { history } = this.props;

    return (
      <main>
        <img src={ logo } className="App-logo" alt="logo" />
        <input
          type="text"
          name="name"
          data-testid="input-player-name"
          value={ name }
          onChange={ this.handleChange }
        />
        <input
          type="email"
          name="email"
          data-testid="input-gravatar-email"
          value={ email }
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="btn-play"
          disabled={ btnDisabled }
          onClick={ this.handleClickButton }
        >
          Play
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ () => history.push('/settings') }
        >
          Configuração
        </button>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendInfo: (state) => dispatch(sendInfoPlayer(state)),
  fetchToken: () => dispatch(getToken()),
});

Login.propTypes = {
  fetchToken: PropTypes.func.isRequired,
  sendInfo: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
