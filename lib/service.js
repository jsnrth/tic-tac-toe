var app = require('./app');
var logger = require('morgan');

app.use(logger('dev'));
app.listen(3000);

console.log('Listening on port 3000');
