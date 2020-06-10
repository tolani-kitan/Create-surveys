if(process.env.NODE_ENV === 'production') {
    //require production keys
    module.exports = require('./prod');
} else {
   module.exports = require('./dev');
}