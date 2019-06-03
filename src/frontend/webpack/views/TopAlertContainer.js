import React from 'react';
import Web3Providers from '../../web3/Web3Providers.js';
import Alert from '../design-components/Alerts.js';
import {
  TitleRow,
  Title,
  AlertDevContainer,
  AlertContainer
} from './SharedForms.js';
import EurekaLogo from './icons/EurekaLogo.js';

const TopAlertContainer = ({provider}) => {
  return (
    <TitleRow>
      {provider === Web3Providers.META_MASK ? (
        <AlertContainer>
          <Alert status={'info'} iconSize={18}>
            We detected MetaMask in your Browser! We use it as our
            authentication provider. Please note that we are not able neither to
            see nor to store your private keys.{' '}
          </Alert>
        </AlertContainer>
      ) : null}
      {provider === Web3Providers.LOCALHOST ? (
        <AlertDevContainer>
          <Alert status={'warning'} iconSize={18}>THIS IS A DEV ENVIRONMENT</Alert>
        </AlertDevContainer>
      ) : null}
      <Title>
        Welcome to{' '}
        <div style={{marginLeft: 10}}>
          <EurekaLogo blueNoLogo width={200} />
        </div>
      </Title>
    </TitleRow>
  );
};

export default TopAlertContainer;
