import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {Row} from '../../../helpers/layout.js';
import MetaMaskLogo from '../../views/icons/MetaMaskLogo.js';
import {signPrivateKey} from '../../../web3/Helpers.js';
import Web3Providers from '../../../web3/Web3Providers.js';
import {MetaMaskStatus} from '../../../web3/MetaMaskStatus.js';
import Modal from '../../design-components/Modal.js';
import AccountBalance from '../../../web3/AccountBalance.js';
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
import withWeb3 from '../../contexts/WithWeb3.js';
import connect from 'react-redux/es/connect/connect.js';
import {fetchUserData} from '../../reducers/user.js';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      isShowed: false,
      signature: null,
      isEmailValidModal: false,
      submitted: false,
      errorMessage: null,
      loading: false
    };
  }

  componentWillUnmount() {
    this.setState({});
  }

  async login() {
    this.setState({submitted: true});

    // DEV ENVIRONMENT
    if (this.props.context.provider === Web3Providers.LOCALHOST) {
      await this.apiCall();
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
        await this.apiCall();
      }
    }
  }

  async apiCall() {
    const signature = await this.signPrivateKey();
    this.setState({signature});

    if (signature) {
      this.setState({loading: true});
      fetch(`${getDomain()}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          password: this.state.signature,
          ethereumAddress: this.props.selectedAccount.address
        })
      })
        .then(response => response.json())
        .then(response => {
          if (response.success) {
            this.props.fetchUserData();
          } else {
            this.setState({
              errorMessage: response.error,
              loading: false
            });
          }
        })
        .catch(err => {
          console.log(err);
          this.setState({
            errorMessage: 'Ouh. Something went wrong.',
            loading: false
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
          title={'You got the following error'}
        >
          {this.state.errorMessage}
        </Modal>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.props.authed ? <Redirect to={'/dashboard'} /> : null}
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
                    <SubTitle>Please Login</SubTitle>

                    {this.props.accounts ? (
                      <LoginRow>
                        <AccountBalance />
                      </LoginRow>
                    ) : null}
                    <ButtonRow>
                      <Button
                        onClick={async () => {
                          await this.login();
                        }}
                      >
                        Login with Metamask{' '}
                        <MetaMaskLogo width={20} height={20} />
                      </Button>
                    </ButtonRow>
                  </LoginContainer>
                </Row>
                <Row>
                  <Paragraph>
                    Don't have an <strong>account</strong>? Please{' '}
                    <Link to="/signup">Sign up </Link>here.
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
  withWeb3(
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
    )(Login)
  )
);
