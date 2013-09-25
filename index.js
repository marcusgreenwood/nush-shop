var time = Date.now();
var hc = require('hatch');
var cms = require('./lib');
var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

/**
 * CMS app builder
 *
 * @return {ExpressApp} app.
 */
module.exports = function instantiateApp() {
    var app = hc();

    app.set('session-store', {ttl: 86400 * 365});
    app.set('database', require(process.env.DB_CONFIG || './config/database')[app.get('env')]);
    
    app.compound.on('after extensions', function () {
        instantiateApp.init(app.compound);
    });
    app.compound.on('ready', function () {
        app.compound.utils.debug('Application loading time ' +
            (Date.now() - time) + 'ms');
    });
    
    return app;
};

/**
 * Entry point for using cms as compound extension
 *
 * @param {Compound} compound.
 */
module.exports.init = function init(compound) {
    cms.init(compound);
};

if (!module.parent) {
    var app = module.exports();

    if (app.get('env') === 'production' || process.env.CLUSTER) {
        console.log('Starting cluster');

        if (cluster.isMaster) {
            // Fork workers.
            for (var i = 0; i < (numCPUs); i++) {
                cluster.fork();
            }

            cluster.on('exit', function (worker, code, signal) {
                console.log('worker ' + worker.process.pid + ' died with ' + signal + ' code:', code);

                // restart the pro
                cluster.fork();
            });
            return;
        }
    }

    app.listen(3000, '0.0.0.0', function () {
        app.compound.utils.debug('Server started in ' + (Date.now() - time) + 'ms');
    });
}
