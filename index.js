const express = require('express');
var proxy = require('http-proxy-middleware');
const fs = require('fs');
const https = require('https');

// proxy middleware options
var options = {
    target: 'https://www.{your domain here}.com', // target host
    changeOrigin: true, // needed for virtual hosted sites
    pathRewrite: {
        '^/proxy': '/proxy', // rewrite path
    }
};

// create the proxy (without context)
var adviceProxy = proxy(options);

const app = express();
app.get('/', (req, res) => res.send('We be proxyin!'));
app.use('/proxy', adviceProxy);

https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
}, app)
    .listen(3000, function () {
        console.log('Example app listening on port 3000! Go to https://localhost:3000/')
    });
