const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const { createProxyMiddleware, fixRequestBody, responseInterceptor } = require('http-proxy-middleware');

require('dotenv').config();

const app = express();

app.use(cors({
    origin: 'https://api.asian888.club'
}));
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
    // headers: {
    //     "Connection": "keep-alive",
    //     "Content-Type": "text/xml;charset=UTF-8",
    //     "Accept": "*/*"
    // },
    target: 'https://api.asian888.club/',
    changeOrigin: true,
    
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


