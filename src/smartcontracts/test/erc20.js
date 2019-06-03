// Based on https://github.com/ConsenSys/Tokens/tree/master/test

const EurekaToken = artifacts.require('./Eureka.sol');
const utils = require('../lib/utils');

contract('EurekaToken', accounts => {
	// https://ethereum.stackexchange.com/questions/15567/truffle-smart-contract-testing-does-not-reset-state/15574#15574
	let contract;
	beforeEach(() => {
		return EurekaToken.deployed()
			.then(instance => {
				contract = instance;
			});
	});

	const evmThrewRevertError = (err => {
		if (err.toString().includes('Error: VM Exception while processing transaction: revert')) {
			return true;
		}
		return false;
	});

	//* ************************* TEST ERC20 - the smart contract code is copy&paste from reliable sources ************
	it('test ERC20 basic functionality', () => {
		contract.balanceOf.call(accounts[0], 0, {from: accounts[0]})
			.then(balance => {
				assert.equal(balance.valueOf(), 0, 'everything should be empty');
				return contract.mint([accounts[0]], [1000], {from: accounts[1]});
			}).then(retVal => {
				assert.equal(false, 'only owner can mint');
			}).catch(e => {
				return contract.mint([accounts[0]], [1000], {from: accounts[0]});
			}).then(retVal => {
				// Return contract.balanceOf.call(accounts[0], 0, {from: accounts[0]});
				// }).then(function (balance) {
				// assert.equal(balance.valueOf(), 1000, "balance is 1000, seen by owner");
				//   return contract.balanceOf.call(accounts[0], 0, {from: accounts[1]});
				// }).then(function (balance) {
				//   assert.equal(balance.valueOf(), 1000, "balance is 1000, seen by any account");
				return contract.totalSupply.call({from: accounts[1]});
			}).then(balance => {
				assert.equal(balance.valueOf(), 1000, 'total supply is 1000');
				return contract.transfer(accounts[1], 1, 0, {from: accounts[0]});
			}).then(retVal => {
				assert.equal(false, 'minting not done yet, cannot transfer');
			}).catch(e => {
				// Minting done
				return contract.finishMinting({from: accounts[0]});
			}).then(retVal => {
				//   Return contract.transfer(accounts[1], 1, 0, {from: accounts[0]});
			});// .then(function (retVal) {
		//   assert.equal(false, "account 1 does not have any tokens");
		// }).catch(function (e) {
		//   return contract.transfer(accounts[1], 0, 0, {from: accounts[1]});
		// }).then(function (retVal) {
		//   assert.equal(false, "cannot transfor 0 tokens");
		// }).catch(function (e) {
		//   return contract.transfer(accounts[1], -1, 0, {from: accounts[1]});
		// }).then(function (retVal) {
		//   assert.equal(false, "negative values are not possible");
		// }).catch(function (e) {
		//   return contract.transfer(accounts[0], 1, 0, {from: accounts[1]});
		// }).then(function (retVal) {
		//   assert.equal(false, "cannot steal tokens from another account");
		// }).catch(function (e) {
		//   return contract.transfer(accounts[0], 1001, 0, {from: accounts[1]});
		// }).then(function (retVal) {
		//   assert.equal(false, "account 0 only has 1000 tokens, cannot transfor 1001");
		// }).catch(function (e) {
		//   console.log('till here');
		//   return contract.transfer(accounts[0], 1000, 0, {from: accounts[0]});
		// }).then(function (retVal) {
		//   //transfer was successful
		//   return contract.balanceOf.call(accounts[0], {from: accounts[0]});
		// }).then(function (balance) {
		//   assert.equal(balance.valueOf(), 1000, "we sent from account 0 to account 0, so account 0 has still 1000 tokens");
		//   return contract.transfer(accounts[1], 1000, {from: accounts[0]});
		// }).then(function (retVal) {
		//   return contract.balanceOf.call(accounts[0], {from: accounts[1]});
		// }).then(function (balance) {
		//   assert.equal(balance.valueOf(), 0, "we transfer all tokens to account 1");
		//   return contract.balanceOf.call(accounts[1], {from: accounts[2]});
		// }).then(function (balance) {
		//   assert.equal(balance.valueOf(), 1000, "account 1 has 1000 tokenscd ");
		// });
	});

	// CREATION

	it('creation: should create an initial balance of 0 for everyone', () => {
		EurekaToken.new({from: accounts[0]}).then(ctr => {
			return ctr.balanceOf.call(accounts[0]);
		}).then(result => {
			assert.strictEqual(result.toNumber(), 0);
		}).catch(err => {
			throw new Error(err);
		});
	});

	// TRANSERS
	// normal transfers without approvals.

	// this is not *good* enough as the contract could still throw an error otherwise.
	// ideally one should check balances before and after, but estimateGas currently always throws an error.
	// it's not giving estimate on gas used in the event of an error.
	it('transfers: ether transfer should be reversed.', () => {
		let ctr;
		return EurekaToken.new({from: accounts[0]}).then(result => {
			ctr = result;
			return web3.eth.sendTransaction({from: accounts[0], to: ctr.address, value: web3.toWei('10', 'Ether')});
		}).catch(result => {
			assert(true);
		}).catch(err => {
			throw new Error(err);
		});
	});

	it('transfers: should transfer 10000 to accounts[1] with accounts[0] having 10000', () => {
		return EurekaToken.deployed().then(instance => {
			return utils.testMint(contract, accounts, 10000, 0, 0);
		}).then(result => {
			return contract.transfer(accounts[1], 10000, {from: accounts[0]});
		}).then(result => {
			return contract.balanceOf.call(accounts[1]);
		}).then(result => {
			assert.strictEqual(result.toNumber(), 10000);
		}).catch(err => {
			throw new Error(err);
		});
	});

	it('transfers: should fail when trying to transfer 10001 to accounts[1] with accounts[0] having 10000', () => {
		return EurekaToken.deployed().then(instance => {
			return utils.testMint(contract, accounts, 10000, 0, 0);
		}).then(result => {
			return contract.transfer.call(accounts[1], 10001, {from: accounts[0]});
		}).then(result => {
			assert(false, 'The preceding call should have thrown an error.');
		}).catch(err => {
			assert(evmThrewRevertError(err), 'the EVM did not throw an error or did not ' +
        'throw the expected error');
		});
	});

	it('transfers: should fail on zero-transfers', () => {
		return EurekaToken.deployed().then(instance => {
			return utils.testMint(contract, accounts, 10000, 0, 0);
		}).then(result => {
			return contract.transfer.call(accounts[1], 0, {from: accounts[0]});
		}).then(result => {
			assert(false, 'The preceding call should have thrown an error.');
		}).catch(err => {
			assert(evmThrewRevertError(err), 'the EVM did not throw an error or did not ' +
        'throw the expected error');
		});
	});

	// NOTE: testing uint256 wrapping is impossible in this standard token since you can't supply > 2^256 -1.

	// APPROVALS

	it('approvals: msg.sender should approve 100 to accounts[1]', () => {
		return EurekaToken.deployed().then(instance => {
			return utils.testMint(contract, accounts, 10000, 0, 0);
		}).then(result => {
			return contract.approve(accounts[1], 100, {from: accounts[0]});
		}).then(result => {
			return contract.allowance.call(accounts[0], accounts[1]);
		}).then(result => {
			assert.strictEqual(result.toNumber(), 100);
		}).catch(err => {
			throw new Error(err);
		});
	});

	// Bit overkill. But is for testing a bug
	it('approvals: msg.sender approves accounts[1] of 100 & withdraws 20 once.', () => {
		return EurekaToken.deployed().then(instance => {
			return utils.testMint(contract, accounts, 10000, 0, 0);
		}).then(result => {
			return contract.balanceOf.call(accounts[0]);
		}).then(result => {
			assert.strictEqual(result.toNumber(), 10000);
			return contract.approve(accounts[1], 100, {from: accounts[0]});
		}).then(result => {
			return contract.balanceOf.call(accounts[2]);
		}).then(result => {
			assert.strictEqual(result.toNumber(), 0);
			return contract.allowance.call(accounts[0], accounts[1]);
		}).then(result => {
			assert.strictEqual(result.toNumber(), 100);
			return contract.transferFrom.call(accounts[0], accounts[2], 20, {from: accounts[1]});
		}).then(result => {
			return contract.transferFrom(accounts[0], accounts[2], 20, {from: accounts[1]});
		}).then(result => {
			return contract.allowance.call(accounts[0], accounts[1]);
		}).then(result => {
			assert.strictEqual(result.toNumber(), 80);
			return contract.balanceOf.call(accounts[2]);
		}).then(result => {
			assert.strictEqual(result.toNumber(), 20);
			return contract.balanceOf.call(accounts[0]);
		}).then(result => {
			assert.strictEqual(result.toNumber(), 9980);
		}).catch(err => {
			throw new Error(err);
		});
	});

	// Should approve 100 of msg.sender & withdraw 50, twice. (should succeed)
	it('approvals: msg.sender approves accounts[1] of 100 & withdraws 20 twice.', () => {
		return EurekaToken.deployed().then(instance => {
			return utils.testMint(contract, accounts, 10000, 0, 0);
		}).then(result => {
			return contract.approve(accounts[1], 100, {from: accounts[0]});
		}).then(result => {
			return contract.allowance.call(accounts[0], accounts[1]);
		}).then(result => {
			assert.strictEqual(result.toNumber(), 100);
			return contract.transferFrom(accounts[0], accounts[2], 20, {from: accounts[1]});
		}).then(result => {
			return contract.allowance.call(accounts[0], accounts[1]);
		}).then(result => {
			assert.strictEqual(result.toNumber(), 80);
			return contract.balanceOf.call(accounts[2]);
		}).then(result => {
			assert.strictEqual(result.toNumber(), 20);
			return contract.balanceOf.call(accounts[0]);
		}).then(result => {
			assert.strictEqual(result.toNumber(), 9980);
			// FIRST tx done.
			// onto next.
			return contract.transferFrom(accounts[0], accounts[2], 20, {from: accounts[1]});
		}).then(result => {
			return contract.allowance.call(accounts[0], accounts[1]);
		}).then(result => {
			assert.strictEqual(result.toNumber(), 60);
			return contract.balanceOf.call(accounts[2]);
		}).then(result => {
			assert.strictEqual(result.toNumber(), 40);
			return contract.balanceOf.call(accounts[0]);
		}).then(result => {
			assert.strictEqual(result.toNumber(), 9960);
		}).catch(err => {
			throw new Error(err);
		});
	});

	// Should approve 100 of msg.sender & withdraw 50 & 60 (should fail).
	it('approvals: msg.sender approves accounts[1] of 100 & withdraws 50 & 60 (2nd tx should fail)', () => {
		return EurekaToken.deployed().then(instance => {
			return utils.testMint(contract, accounts, 10000, 0, 0);
		}).then(result => {
			return contract.approve(accounts[1], 100, {from: accounts[0]});
		}).then(result => {
			return contract.allowance.call(accounts[0], accounts[1]);
		}).then(result => {
			assert.strictEqual(result.toNumber(), 100);
			return contract.transferFrom(accounts[0], accounts[2], 50, {from: accounts[1]});
		}).then(result => {
			return contract.allowance.call(accounts[0], accounts[1]);
		}).then(result => {
			assert.strictEqual(result.toNumber(), 50);
			return contract.balanceOf.call(accounts[2]);
		}).then(result => {
			assert.strictEqual(result.toNumber(), 50);
			return contract.balanceOf.call(accounts[0]);
		}).then(result => {
			assert.strictEqual(result.toNumber(), 9950);
			// FIRST tx done.
			// onto next.
			return contract.transferFrom.call(accounts[0], accounts[2], 60, {from: accounts[1]});
		}).then(result => {
			assert(false, 'The preceding call should have thrown an error.');
		}).catch(err => {
			assert(evmThrewRevertError(err), 'the EVM did not throw an error or did not ' +
        'throw the expected error');
		});
	});

	it('approvals: attempt withdrawal from acconut with no allowance (should fail)', () => {
		return EurekaToken.deployed().then(instance => {
			return utils.testMint(contract, accounts, 10000, 0, 0);
		}).then(result => {
			return contract.transferFrom.call(accounts[0], accounts[2], 60, {from: accounts[1]});
		}).then(result => {
			assert(false, 'The preceding call should have thrown an error.');
		}).catch(err => {
			assert(evmThrewRevertError(err), 'the EVM did not throw an error or did not ' +
        'throw the expected error');
		});
	});

	it('approvals: allow accounts[1] 100 to withdraw from accounts[0]. Withdraw 60 and then approve 0 & attempt transfer.', () => {
		return EurekaToken.deployed().then(instance => {
			return utils.testMint(contract, accounts, 10000, 0, 0);
		}).then(result => {
			return contract.approve(accounts[1], 100, {from: accounts[0]});
		}).then(result => {
			return contract.transferFrom(accounts[0], accounts[2], 60, {from: accounts[1]});
		}).then(result => {
			return contract.approve(accounts[1], 0, {from: accounts[0]});
		}).then(result => {
			return contract.transferFrom.call(accounts[0], accounts[2], 10, {from: accounts[1]});
		}).then(result => {
			assert(false, 'The preceding call should have thrown an error.');
		}).catch(err => {
			assert(evmThrewRevertError(err), 'the EVM did not throw an error or did not ' +
        'throw the expected error');
		});
	});

	it('approvals: approve max (2^256 - 1)', () => {
		return EurekaToken.deployed().then(instance => {
			return utils.testMint(contract, accounts, 10000, 0, 0);
		}).then(result => {
			return contract.approve(accounts[1], '115792089237316195423570985008687907853269984665640564039457584007913129639935', {from: accounts[0]});
		}).then(result => {
			return contract.allowance(accounts[0], accounts[1]);
		}).then(result => {
			const match = result.equals('1.15792089237316195423570985008687907853269984665640564039457584007913129639935e+77');
			assert.isTrue(match);
		}).catch(err => {
			throw new Error(err);
		});
	});

	it('events: should fire Transfer event properly', () => {
		return EurekaToken.deployed().then(instance => {
			return utils.testMint(contract, accounts, 10000, 0, 0);
		}).then(result => {
			return contract.transfer(accounts[1], '2666', {from: accounts[0]});
		}).then(result => {
			const transferLog = result.logs.find(element => {
				if (element.event.match('Transfer')) {
					return true;
				}
				return false;
			});
			assert.strictEqual(transferLog.args.from, accounts[0]);
			assert.strictEqual(transferLog.args.to, accounts[1]);
			assert.strictEqual(transferLog.args.value.toString(), '2666');
		}).catch(err => {
			throw new Error(err);
		});
	});

	it('events: should fail on a zero transfer', () => {
		return EurekaToken.deployed().then(instance => {
			return utils.testMint(contract, accounts, 10000, 0, 0);
		}).then(result => {
			return contract.transfer(accounts[1], '0', {from: accounts[0]});
		}).then(result => {
			assert(false, 'The preceding call should have thrown an error.');
		}).catch(err => {
			assert(evmThrewRevertError(err), 'the EVM did not throw an error or did not ' +
        'throw the expected error:' + err);
		});
	});

	it('events: should fire Approval event properly', () => {
		return EurekaToken.deployed().then(instance => {
			return utils.testMint(contract, accounts, 10000, 0, 0);
		}).then(result => {
			return contract.approve(accounts[1], '2666', {from: accounts[0]});
		}).then(result => {
			const approvalLog = result.logs.find(element => {
				if (element.event.match('Approval')) {
					return true;
				}
				return false;
			});
			assert.strictEqual(approvalLog.args.owner, accounts[0]);
			assert.strictEqual(approvalLog.args.spender, accounts[1]);
			assert.strictEqual(approvalLog.args.value.toString(), '2666');
		}).catch(err => {
			throw new Error(err);
		});
	});
});

