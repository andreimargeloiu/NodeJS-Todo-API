const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!';

// bcrypt.getSalt(10, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//         console.log(hash);
//     })
// });


// jwt.sign
// jwt.verify

// var data = {
//     id: 10
// };
//
// // String <- jwt.sign(object, 'someRandomSecret');
// var token = jwt.sign(data, '123abs'); // face un token (String), care are informatia
//                                       // despre data cat si hash-ul ei
//
// // Object <- jwt.verify(String, 'someRandomSecret');
// var decode = jwt.verify(token, '123abs'); // retruneaza obiectul intial care a fost codat
// console.log(decode);


// const {SHA256} = require('crypto-js');
//
// var message = 'I am user number 3';
// var hash = SHA256(message).toString();
//
// var data = {
//     id: 4
// }
//
// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'someRandomSecret').toString()
// }
//
// var newhash = SHA256(JSON.stringify(token.data) + 'someRandomSecret').toString();
//
// if (newHash === token.hash) {
//     console.log("YES, they are the same");
// } else {
//     console.log('NO, they are not the same');
// }
