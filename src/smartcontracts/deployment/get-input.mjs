import path from 'path';
import fs from 'fs';

const DIR_NAME = path.resolve(path.dirname(''));

export const getEurekaSmartContractInput = () => {
  return {
    libraries: {
      'Utils.sol': fs.readFileSync(
        path.resolve(DIR_NAME, 'src/smartcontracts/contracts/Utils.sol'),
        'utf-8'
      ),
      'SafeMath.sol': fs.readFileSync(
        path.resolve(DIR_NAME, 'src/smartcontracts/contracts/SafeMath.sol'),
        'utf-8'
      )
    },
    contract: {
      'Eureka.sol': fs.readFileSync(
        path.resolve(DIR_NAME, 'src/smartcontracts/contracts/Eureka.sol'),
        'utf-8'
      ),
      'EurekaPlatform.sol': fs.readFileSync(
        path.resolve(
          DIR_NAME,
          'src/smartcontracts/contracts/EurekaPlatform.sol'
        ),
        'utf-8'
      )
    }
  };
};

export default getEurekaSmartContractInput;
