exports.defaultPath = 'product/:id';

exports.defaultPage = {
    title: 'View product',
    grid: '01-one-column',
    columns: [{size: 12, widgets: [1, 2]}, {size: 12, widgets: [3]}],
    widgets: [
        {id: 1, type: 'core-widgets/group-header'},
        {id: 2, type: 'core-widgets/mainmenu'},
        {id: 3, type: 'core-content/permalink-content'}
    ]
};

exports.handler = function (c, callback) {
    if (parseInt(c.specialPageParams && c.specialPageParams.id)) {
        c.Content.find(this.specialPageParams.id, function (err, post) {
            c.req.post = post;
            callback();
        });
    } else {
        callback();
    }
};

exports.contentType = 'product';

