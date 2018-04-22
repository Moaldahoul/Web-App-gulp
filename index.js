'use strict';

const http = require('http');
const express = require('express');
const fs = require('fs');

//const configJson = fs.readFileSync('./config.json') // since we have Sync at the end that mean the file should read Synchronous file reading call
// if the work Sync wasn't there the assumed pattern in node is going to be asynchronous.

fs.readFile('./config.json', 'utf8', function(err, data) {

    const config = JSON.parse(data);
    const app = express();
    
    app.use(express.static(config.webServer.folder));
    
    const httpServer = http.createServer(app);
    
    httpServer.listen(config.webServer.port, function (err) {
    
        if (err){
            console.log(err.message);
            return;
        }
        console.log(`web server listening on port ${config.webServer.port}`);
    }); 
});
console.log('reading config file');

