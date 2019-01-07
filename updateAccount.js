const dsteem = require('dsteem');
const client = new dsteem.Client('https://api.steemit.com');
require('dotenv').config();

// Update account authority by changing the threshold and adding public keys or accounts
// Note that we only changed the active authority here but you can do the same with posting
// or owner authorities.
// account json_metadata and memo_key are required

const update_account = {
    "account": "multisig",
    "active": {
        "weight_threshold": 40,
        "account_auths": [
            ["steemplus-bot", 10],
            ["timcliff", 10],
            ["transisto", 10]
        ],
        "key_auths": [
            [
                "STM69e6Sw7Q8BPiQYorDyp64AcM1unkxycbUEEoXFKWWzFptvUicP", //@multisig
                25
            ],
            [
                "STM6sPgqj6AWex5qs7tX4aQe3Gr1YUEULcTf2VUmxzhQFshe1Dh3a", //@stoodkev
                25
            ],
            [
                "STM6uHScqquNWC65WacRqgtrscmSkKxKMUPmRZhv45WjygTdR1X97", //@steem-plus
                10
            ],
            [
                "STM7cMqJ5iGxnXnr1rjUmYb42Y6SPys1qVnvraEwxrjJDp4ZRDRmf", //@steemplus-pay
                10
            ]
        ]
    },
    "json_metadata": "",
    "memo_key": "STM59PhUS2m4ipKF6Jesu3SxUmJhYgRDGWwQh4W6RTEHWDh9zC9xX"
};


// Broadcast the update. Don't forget to add a .env file and insert the active private key for the account to be updated
client.broadcast.updateAccount(update_account, dsteem.PrivateKey.from(process.env.ACTIVE_MULTISIG)).then(function(result) {
    console.log('Result: ' + result);
}, function(error) {
    console.error(error);
});
