var _ = require('../../../../node_modules/underscore');

layout('widgets');
load('widgets/common');

action(function show(c) {
    var self = this;

    var cond = {
        groupId: c.req.group.id
    };

    if (self.widget.settings.tags && self.widget.settings.tags.length > 0) {
        cond.tags = self.widget.settings.tags;
    }

    c.Content.all({ where: cond }, function (err, posts) {
        // sort the posts
        posts = _.sortBy(posts, function (post) { return post.priority || 10; });

        c.locals.posts = posts;
        c.locals.displayMode = self.widget.settings.displayMode || 'view';
        c.locals.cols = self.widget.settings.cols || 3;

        render();
    });
});
