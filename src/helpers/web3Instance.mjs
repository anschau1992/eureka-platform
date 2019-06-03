import Web3 from 'web3';
const web3 = new Web3();

const initProvider = () => {
  web3.setProvider(getProvider());
};

const getProvider = () => {
  let provider;
  if (process.env.BC_NETWORK === 'main') {
    provider = new Web3.providers.WebsocketProvider('wss://infura.io/ws');
  }
  else if (process.env.BC_NETWORK === 'ganache') {
    provider = new Web3.providers.WebsocketProvider('ws://127.0.0.1:7545');
  }
  else if (process.env.BC_NETWORK === 'kovan') {
    provider = new Web3.providers.WebsocketProvider('ws://' + process.env.ETHEREUM_FULL_NODE_KOVAN);   //connecting to digital ocean ethereum-kovan-node
  }
  else {
    console.error('provider ' + process.env.BC_NETWORK + ' couldn\'t be found');
    process.exit(1);
  }
  provider.on('connect', (e) => {
    console.log('Web3 Provider connected to ' + e.target._url);
  });
  provider.on('error', e => {
    console.error('Web3 Provider Error', e);
    web3.setProvider(getProvider());
  });
  provider.on('end', e => {
    console.error('Web3 Provider Ended', e);
    web3.setProvider(getProvider());
  });
  return provider;
};

initProvider();
export default web3;
