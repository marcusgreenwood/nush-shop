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
        posts = posts.sort(function (a, b) {
            return (a.priority || 10) > (b.priority || 10);
        });

        c.locals.posts = posts;
        c.locals.displayMode = self.widget.settings.displayMode || 'view';
        c.locals.cols = self.widget.settings.cols || 3;
        c.locals.allowDifferentSizes = self.widget.settings.allowDifferentSizes === 'yes';

        render();
    });
});
