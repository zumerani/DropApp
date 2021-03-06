init = false;

var _server;
var dataManager;
var objectId;

var multer = require('multer');
// var upload = multer( { dest: '../imageUploads'} );

exports.init = function( server , dataManagers ) {
    _server = server;
    dataManager = dataManagers;
    init = true;
}

exports.userSetup = function userSetup() {
    console.log("Setting up users.");
    _server.post('/api/v1/users/addUser' , dataManager.users.addUser );
    _server.post('/api/v1/users/loginUser' , dataManager.users.loginUser );
    _server.post('/api/v1/users/getUser' , dataManager.users.getUser );
}

exports.transactionsSetup = function() {
    console.log("Setting up transactions.");
    _server.post('/api/v1/transactions/addItem' , dataManager.transactions.addItem );
    _server.post('/api/v1/transactions/getItems' , dataManager.transactions.getItems );
}
