const api = require('./server/server.js');
const koapp = require('./worker/worker.js');

api.listen(9001);
koapp.listen(9002);