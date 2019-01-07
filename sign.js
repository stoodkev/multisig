const dsteem = require('dsteem');
const client = new dsteem.Client('https://api.steemit.com');
require('dotenv').config();
createTx();

async function createTx(){

// max expiration time is 1h but it sometimes fails at exactly one hour.
const expireTime=1000*3590;
const props = await client.database.getDynamicGlobalProperties();
const ref_block_num = props.head_block_number & 0xFFFF;
const ref_block_prefix = Buffer.from(props.head_block_id, 'hex').readUInt32LE(4);
const expiration = new Date(Date.now() + expireTime).toISOString().slice(0, -5);
const extensions = [];
// Example operation for sending 5 STEEM to @stoodkev
const operations= [['transfer',
                 {'amount': '5.000 STEEM',
                  'from': 'multisig',
                  'memo': '',
                  'to': 'stoodkev'}]];
const tx = {
            expiration,
            extensions,
            operations,
            ref_block_num,
            ref_block_prefix,
        }

// Sign via @multisig @steem-plus and @steemplus-pay (combined weight of 45% > 40% threshold)

const signMultisig = client.broadcast.sign(tx, dsteem.PrivateKey.from(process.env.ACTIVE_MULTISIG));
//const sendMultisig= await client.broadcast.send(signMultisig);
//console.log(sendMultisig);
// Failing due to "Missing Active Authority" (weight inferior to the threshold)
const signSteemPlus = client.broadcast.sign(signMultisig, dsteem.PrivateKey.from(process.env.ACTIVE_SP));
const signSteemPlusPay = client.broadcast.sign(signSteemPlus, dsteem.PrivateKey.from(process.env.ACTIVE_SPP));
console.log(signSteemPlusPay);
// Send the broadcast
const send= await client.broadcast.send(signSteemPlusPay);
console.log(send); // Success
}
