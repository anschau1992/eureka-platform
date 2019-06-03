import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Row} from '../../../helpers/layout.js';
import MetaMaskLogo from '../../views/icons/MetaMaskLogo.js';
import {signPrivateKey} from '../../../web3/Helpers.js';
import Web3Providers from '../../../web3/Web3Providers.js';
import {MetaMaskStatus} from '../../../web3/MetaMaskStatus.js';
import Modal from '../../design-components/Modal.js';
import AccountBalance from '../../../web3/AccountBalance.js';
import {isEmailValid} from '../../../../helpers/emailValidator.js';
import {InputField} from '../../design-components/Inputs.js';
import GridSpinner from '../../views/spinners/GridSpinner.js';
import {getDomain} from '../../../../helpers/getDomain.mjs';
import {
  Container,
  Paragraph,
  SubTitle,
  Button,
  ButtonRow,
  LoginContainer,
  LoginRow
} from '../../views/SharedForms.js';
import TopAlertContainer from '../../views/TopAlertContainer.js';
import {getRandomAvatar} from '../../../helpers/getRandomAvatar.mjs';
import withWeb3 from '../../contexts/WithWeb3.js';
import {connect} from 'react-redux';
import {fetchUserData} from '../../reducers/user.js';
import {TITLE_GENERAL_ERROR} from '../../constants/ModalErrors.js';

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      username: null,
      email: null,
      isShowed: false,
      signature: null,
      inputStatus: null,
      isEmailValidModal: false,
      submitted: false,
      errorMessage: null,
      loading: false
    };
  }

  componentWillUnmount() {
    this.setState({});
  }

  async register() {
    this.setState({submitted: true});
    if (!isEmailValid(this.state.email)) {
      this.setState({isEmailValidModal: true});
      return;
    }

    // DEV ENVIRONMENT
    if (this.props.context.provider === Web3Providers.LOCALHOST) {
      this.apiCall();
    } else if (this.props.context.provider === Web3Providers.META_MASK) {
      const status = this.props.metaMaskStatus;
      if (
        status === MetaMaskStatus.DETECTED_NO_LOGGED_IN ||
        status === MetaMaskStatus.NO_DETECTED
      ) {
        this.setState({isShowed: true});
        return;
      }

      if (status === MetaMaskStatus.DETECTED_LOGGED_IN) {
        // Already logged in
        this.apiCall();
      }
    }
  }

  async apiCall() {
    const signature = await this.signPrivateKey();
    this.setState({signature});

    if (signature) {
      this.setState({loading: true});
      fetch(`${getDomain()}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          password: this.state.signature,
          email: this.state.email,
          ethereumAddress: this.props.selectedAccount.address,
          avatar: 'img/icons/avatars/' + getRandomAvatar()
        })
      })
        .then(response => response.json())
        .then(response => {
          if (response.success) {
            this.props.fetchUserData();
          } else {
            this.setState({
              errorMessage: response.error,
              loading: false,
              inputStatus: null
            });
          }
        })
        .catch(err => {
          console.log(err);
          this.setState({
            errorMessage: 'Ouh. Something went wrong.',
            loading: false,
            inputStatus: null
          });
        });
    }
  }

  async signPrivateKey() {
    const message =
      'EUREKA Register Authentication - Please click to the Sign Button below.';

    if (this.props.context.provider === Web3Providers.LOCALHOST) {
      // FAKE PASSWORD FOR DEV
      return '0xb91467e570a6466aa9e9876cbcd013baba02900b8979d43fe208a4a4f339f5fd6007e74cd82e037b800186422fc2da167c747ef045e5d18a5f5d4300f8e1a0291c';
    }
    if (this.props.context.provider === Web3Providers.META_MASK) {
      return signPrivateKey(
        this.props.context.web3,
        this.props.selectedAccount.address,
        message
      );
    }
  }

  handleInput(stateKey, e) {
    if (isEmailValid(e.target.value)) {
      this.setState({inputStatus: 'valid'});
    } else {
      this.setState({inputStatus: 'error'});
    }
    this.setState({[stateKey]: e.target.value});
  }

  renderModals() {
    return (
      <div>
        {' '}
        <Modal
          toggle={isShowed => {
            this.setState({isShowed});
          }}
          show={
            this.state.isShowed &&
            this.props.metaMaskStatus !== MetaMaskStatus.DETECTED_LOGGED_IN
          }
          title={'Register using MetaMask - INFORMATION'}
        >
          Please be sure to have MetaMask<MetaMaskLogo width={15} height={15} />{' '}
          installed in your browser! If you already have installed it, open the
          Extension and log in into your account please!{' '}
          <strong>Remember: </strong> we can neither see nor store your private
          keys.
        </Modal>
        <Modal
          type={'notification'}
          toggle={isEmailValidModal => {
            this.setState({isEmailValidModal});
          }}
          show={this.state.isEmailValidModal && this.state.submitted}
          title={'Inserted Email is invalid'}
        >
          Ouh. The email {this.state.email} does not seem to be a valid email.
          Please insert a correct one.
        </Modal>
        <Modal
          type={'notification'}
          toggle={isErrorMessage => {
            this.setState({errorMessage: null});
          }}
          show={this.state.errorMessage}
          title={TITLE_GENERAL_ERROR}
        >
          {this.state.errorMessage}
        </Modal>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div>
          {this.state.loading ? (
            <GridSpinner />
          ) : (
            <div>
              {this.renderModals()}
              <Container>
                <TopAlertContainer provider={this.props.context.provider} />

                <Row>
                  <LoginContainer>
                    <SubTitle>Please Register</SubTitle>
                    <LoginRow>
                      <InputField
                        placeholder={'email address'}
                        status={
                          this.state.email ? this.state.inputStatus : null
                        }
                        onChange={e => this.handleInput('email', e)}
                        onKeyPress={e => {
                          if (e.key === 'Enter') {
                            this.register();
                          }
                        }}
                      />
                    </LoginRow>

                    {this.props.accounts ? (
                      <LoginRow>
                        <AccountBalance />
                      </LoginRow>
                    ) : null}
                    <ButtonRow>
                      <Button
                        onClick={() => {
                          this.register();
                        }}
                      >
                        Register with Metamask{' '}
                        <MetaMaskLogo width={20} height={20} />
                      </Button>
                    </ButtonRow>
                  </LoginContainer>
                </Row>
                <Row>
                  <Paragraph>
                    Already have an <strong>account</strong>? Please{' '}
                    <Link to="/login">Log in </Link>here.
                  </Paragraph>
                </Row>
              </Container>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withWeb3(
  withRouter(
    connect(
      state => ({
        metaMaskStatus: state.metamaskData.status,
        selectedAccount: state.accountsData.selectedAccount,
        accounts: state.accountsData.accounts
      }),
      dispatch => {
        return {
          fetchUserData: () => {
            dispatch(fetchUserData());
          }
        };
      }
    )(SignUp)
  )
);
