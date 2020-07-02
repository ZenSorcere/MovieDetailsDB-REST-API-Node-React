/* Hello, World! program in node.js 
console.log("Hello, World!") */

const http = require("http");
//const path = require('path');
const movies = require("./data");
//const movies = require("movies");

http.createServer(function (req, res) {
    const path = req.url.toLowerCase();
    switch(path) {
        case '/':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Home page\n'+ 'Array length: '+ movies.length);
            break;
        case '/about':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('About page');
            break;
        default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Error - Page Not found');
            break;
    }
}).listen(process.env.PORT || 3000);