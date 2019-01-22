const http = require('http');
const url = require('url');

let router = [{
  path: "*",
  method: "*",
  handler(req, res) {
    res.end(`Cannot ${req.method}_${req.url}`)
  }
}];

function Application() {

}

Application.prototype.get = function (path, handler) {
  router.push({
    path,
    method: 'get',
    handler
  })
}

Application.prototype.listen = function () {
  let self = this;
  const server = http.createServer(function (req, res) {
    let {
      pathname
    } = url.parse(req.url, true);
    for (let i = 0; i < router.length; i++) {
      let {
        path,
        method,
        handler
      } = router[i];
      if (pathname == path && req.method.toLocaleLowerCase() == method) {
        return handler(req, res)
      }
    }
    router[0].handler(req, res)
  })
  server.listen(...arguments)
}

module.exports = Application;