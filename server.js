const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const { createProxyMiddleware, fixRequestBody, responseInterceptor } = require('http-proxy-middleware');

require('dotenv').config();

const app = express();
const corsOption ={
    origin:function(origin, callback){
        console.log(origin, callback);
        callback(null, true);
    }
}
app.use(cors(corsOption));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(bodyParser.raw());

// apis

// routers

// static folders
const assetFolder = path.resolve(__dirname, './dist/');
app.use(express.static(assetFolder));
app.use("*", express.static(assetFolder));

// config proxy

const proxyMiddleware = createProxyMiddleware({
    // target: 'https://api.asian888.club',
    // onProxyReq: fixRequestBody,
    // logLevel: 'debug',
    // changeOrigin: true,
    // // secure: false,
    // xfwd: true,
    // ws: true,
    // hostRewrite: true,
    // cookieDomainRewrite: true,
    // pathRewrite: {
    //     [`^/api`]: '',
    // },
    
    target: 'https://api.asian888.club',
    changeOrigin: true,
    headers: {
        "Connection": "keep-alive",
        "Content-Type": "application/json;charset=UTF-8",
        "Accept": "*/*"
    },
    pathRewrite: {
        "^/api": "",
    },
});

app.use('/api/*', proxyMiddleware);

// run server



const port = process.env.PORT || 5600;
const server = app.listen(port, () => {
    console.log(`server up and running on port ${port}!`);
});


