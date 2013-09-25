module.exports = function (c) {
    if (c) {
        c.hatch.themes.registerTheme({
            title: 'Nush',
            name: 'nush',
            variables: 'http://localhost:3000/assets/theme/variables.less',
            bootswatch: 'http://localhost:3000/assets/theme/bootswatch.less'
        });
    }

    var contentTypes = {
        product: { icon: 'picture' }
    };

    c.hatch.contentType.contentTypes = [];

    Object.keys(contentTypes).forEach(function (key) {
        var type = contentTypes[key];

        // register the content type templates
        c.hatch.contentType.registerContentType(key, {
            name: key,
            title: key,
            icon: type.icon,
            view: __dirname + (type.view || '/content/' + key + '/view.ejs'),
            featured: __dirname + (type.view || '/content/' + key + '/featured.ejs'),
            permalink: __dirname + (type.view || '/content/' + key + '/permalink.ejs'),
            editForm: __dirname + (type.view || '/content/' + key + '/editform.ejs')
        });

        // register the landing page
        c.hatch.page.register(key, require('./specials/' + key));
    });

    // TODO: remove hack when compound i18n supports injecting from other modules
    // HACK: temporarily change the compound.root and inject i18n into admin module
    var admin = c.hatch.modules.admin;
    var root = c.root;
    c.root = __dirname;
    admin.compound.i18n(c);
    c.root = root;
    // ENDHACK

    return require('compound').createServer({root: __dirname});
}
