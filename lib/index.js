var path = require('path');
var express = require('express');
var fs = require('fs');
var _ = require('underscore');

exports.init = function (compound) {
    // set the upload path
    compound.app.set('upload path', __dirname + '/../public/upload');
    compound._ = _;

    // load the Entrago modules and grids
    compound.on('ready', function () {
        if (process.env.NODE_ENV !== 'test') {
            compound.hatch.loadModules(path.join(__dirname, '../modules'));
        }

        // change the grids
        var gridsDir = __dirname + '/grids';
        fs.readdirSync(gridsDir).forEach(function (file) {
            compound.hatch.grids[file.replace(/\.ejs$/, '')] = fs.readFileSync(
                __dirname + '/grids/' + file
            ).toString().split('\n\n');
        });

        compound.models.Page.grids = compound.hatch.grids;

        // update the schema
        var db = compound.models.Content.schema;

        db.defineProperty('Content', 'priority', { type: Number });
        db.defineProperty('Content', 'height', { type: Number });

        compound.injectMiddlewareAfter('compound', '/assets', express.static(__dirname + '/../public/assets/'));
        compound.injectMiddlewareAfter('compound', '/UPLOAD', express.static(__dirname + '/../public/upload/'));
    });
};
