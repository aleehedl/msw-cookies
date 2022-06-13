import { ClientRequest, ServerResponse } from "http";
import { createServer } from 'http';

createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain', 'Set-Cookie': ['foo=bar', 'bar=baz']});
  res.write('See network tab for set cookies');
  res.end();
}).listen(8080);
console.log('Listening at 8080')
