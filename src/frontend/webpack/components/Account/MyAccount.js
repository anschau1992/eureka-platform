import React, {Component} from 'react';
import styled from 'styled-components';
import {Row} from '../../../helpers/layout.js';
import {
  __ALERT_ERROR,
  __FIFTH,
  __GRAY_200,
  __THIRD
} from '../../../helpers/colors.js';
import EurekaLogo from '../../views/icons/EurekaLogo.js';
import Icon from '../../views/icons/Icon.js';
import CircleSpinner from '../../views/spinners/CircleSpinner.js';
import connect from 'react-redux/es/connect/connect.js';
import withWeb3 from '../../contexts/WithWeb3.js';
import {Link} from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardContainer = styled(Row)`
  transition: all 0.15s ease;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  word-wrap: break-word;
  border: 0.0625rem solid rgba(0, 0, 0, 0.05);
  border-radius: 0.25rem;
  background-color: #ffffff;
  background-clip: border-box;
  min-height: 420px;
  min-width: 800px;
  box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07) !important;
`;

const PhotoContainer = styled.div`
  position: relative;
`;

const Photo = styled.img`
  width: 100%;
`;

const Email = styled.div`
  font-family: inherit;
  font-weight: 400;
  line-height: 1.3;
  font-size: 1.75rem;
  color: ${__THIRD};
`;

const ProfileRow = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0;
`;

const EmailContainer = styled(ProfileRow)`
  margin-top: 9rem;
`;

const EthereumAddress = styled.div`
  color: ${__THIRD};
  font-weight: 300 !important;
  font-size: 1rem;
`;

const Separator = styled.div`
  height: 1px;
  width: 80%;
  background: ${__GRAY_200};
  margin: 10px 0;
`;

const Balances = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
`;

const Balance = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
`;

const SubTitle = styled.h4`
  margin-top: 0;
  margin-bottom: 5px;
  color: ${__ALERT_ERROR};
  text-align: center;
`;
const Number = styled.div`
  margin-left: 5px;
`;

const SeeHistory = styled.div`
  font-size: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
`;

const numberWithCommas = x => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
};

const Parent = styled.div`
  position: absolute;
  left: 50%;
  max-width: 180px;
  transition: all 0.15s ease;
  transform: translate(-50%, -30%);
  border-radius: 0.25rem;
`;

const Upload = styled.div`
  color: white;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  max-width: 180px;
  align-items: center;
  text-align: center;
  display: flex;
  background: rgba(0, 0, 0, 0.3);
  visibility: ${props => (props.show ? 'visible' : 'hidden')};
  transition: all 0.3s ease-in-out;
`;

const Explore = styled.div`
  &:hover {
    transform: translateY(-2px);
  }
  & > a {
    text-decoration: none;
  }
  letter-spacing: 1.4px;
  cursor: pointer;
  transition: 0.3s ease-in-out all;
  background: ${__FIFTH};
  color: white;
  padding: 3px 8px;
  border-radius: 5px;
`;

class MyAccount extends Component {
  constructor() {
    super();
    this.state = {
      show: false
    };
  }

  render() {
    return (
      <Container>
        <CardContainer>
          <Card>
            <PhotoContainer>
              <Parent
                onMouseEnter={() => {
                  this.setState({show: true});
                }}
                onMouseLeave={() => {
                  this.setState({show: false});
                }}
              >
                <Photo src={'/' + this.props.user.avatar} />
                <Upload show={this.state.show}>
                  Upload your profile picture
                </Upload>
              </Parent>
            </PhotoContainer>
            <EmailContainer>
              <Email>{this.props.user.email}</Email>
            </EmailContainer>
            <ProfileRow style={{margin: 0}}>
              <EthereumAddress>
                {this.props.user.ethereumAddress}
              </EthereumAddress>
            </ProfileRow>
            <ProfileRow>
              <Link
                to={`/app/users/${this.props.user.ethereumAddress}`}
                style={{textDecoration: 'none'}}
              >
                <Explore>
                  Explore
                  <Icon
                    noMove
                    icon={'explore'}
                    width={15}
                    height={15}
                    color={'white'}
                  />
                </Explore>
              </Link>
            </ProfileRow>

            <ProfileRow>
              <Separator />
            </ProfileRow>
            <ProfileRow>
              {this.props.selectedAccount.EKABalance &&
              this.props.selectedAccount.balance ? (
                <Balances>
                  <SubTitle>Your Balances</SubTitle>
                  <Balance>
                    <EurekaLogo width={30} height={30} />
                    <Number>
                      {numberWithCommas(this.props.selectedAccount.EKABalance)}{' '}
                      EKA
                    </Number>
                    <SeeHistory>
                      <Icon
                        width={22}
                        height={22}
                        material={'history'}
                        icon={'material'}
                        top={8}
                      />
                      <div style={{marginTop: '-5px'}}>See History</div>
                    </SeeHistory>
                  </Balance>
                  <Balance>
                    <Icon
                      icon={'ethereum'}
                      width={25}
                      height={25}
                      right={5}
                      noMove
                    />
                    <Number>
                      {this.props.selectedAccount.balance >= 1000
                        ? numberWithCommas(
                            this.props.selectedAccount.balance
                              .toString()
                              .substr(0, 6)
                          )
                        : this.props.selectedAccount.balance
                            .toString()
                            .substr(0, 6)}{' '}
                      ETH
                    </Number>
                  </Balance>
                </Balances>
              ) : (
                <CircleSpinner />
              )}
            </ProfileRow>
          </Card>
        </CardContainer>
      </Container>
    );
  }
}

export default withWeb3(
  connect(state => ({
    user: state.userData.data,
    selectedAccount: state.accountsData.selectedAccount
  }))(MyAccount)
);
