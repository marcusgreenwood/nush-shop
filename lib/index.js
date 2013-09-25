var path = require('path');
var express = require('express');

exports.init = function (compound) {
    // load the Entrago modules and grids
    compound.on('ready', function () {
        if (process.env.NODE_ENV !== 'test') {
            compound.hatch.loadModules(path.join(__dirname, '../modules'));
        }

        compound.injectMiddlewareAfter('compound', '/assets', express.static(__dirname + '/../public/assets/'));
    });
};