(function() {
  var restify = require("restify"),
      fs = require("fs"),
      request = require("request");

  var _server;
      
  function _init() {

    _start();
    _registerRestCalls();

  }

  function _start() {
    
    var port, 
        clientDir;
    
    if(process.env.PORT) {
      port = process.env.PORT;
      clientDir = "client";
    } else {
      port = 3000;
      clientDir = "../client";
    }
    
    //start server
    _server = restify.createServer({
      name: "Search Server",
      version: "0.0.0"
    });

    _server.use(restify.acceptParser(_server.acceptable));
    _server.use(restify.gzipResponse());
    _server.use(restify.jsonBodyParser());
    _server.use(restify.queryParser());
    _server.use(restify.fullResponse());

    //start listening on specified port
    _server.listen(port);

    _registerRestCalls();

    _server.get(/\/?.*/, restify.serveStatic({
      directory: clientDir,
      default: "index.html"
    }));

  }

  function _registerRestCalls() {

    // _server.get("/restapi/BlahBlahBlah", __getWhatIWant);

  }

  return _init();

}());