MerlinsBoard.Views.announcementHome = Backbone.View.extend({
  initialize: function () {
    this.listenTo(MerlinsBoard.CurrentUser, "sync", this.render); //this violates some congruency, but I'd rather not deal with the logic required to associate the object
  },
  
  tagName: "section",
  className: "announcement-list",
  template: JST["announcements/announcement-home"],
  
  render: function () {                                                  
    var renderedContent = this.template({announcements: this.collection});
    this.$el.html(renderedContent);
    return this
  }
})