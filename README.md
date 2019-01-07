# Multisignature sample code

To better comprehend how to use Multisign on the Steem blockchain with DSteem, please use this code in par with [this tutorial](https://steemit.com/utopian-io/@stoodkev/how-to-set-up-and-use-multisignature-accounts-on-steem-blockchain).

# How to use this code?

- Clone this repository:

`git clone https://github.com/stoodkev/multisig`

- Install the project

`npm install`

- Create a .env file with the required private keys

- Change the account names and public keys , weights and thresholds in `updateAccounts.js` according to your specs.

- Run `npm run update` to update your account authorities

- Change the signing accounts and transfer information

- Run `npm run sign`

- Check the result on steemd.com
