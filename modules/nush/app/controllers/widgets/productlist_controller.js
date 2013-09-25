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
        c.locals.posts = posts;
        c.locals.displayMode = self.widget.settings.displayMode || 'view';

        render();
    });
});
