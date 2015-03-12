MerlinsBoard.Views.announcementList = Backbone.View.extend({
  initialize: function (options) {
    this.course = this.collection.owner;
    this.listenTo(this.course, "sync", this.render); 
  },
  
  events: {
    "click button.form" : "newAnnouncement"
  },
  
  tagName: "section",
  
  className: "announcement-list",
  
  template: JST["announcements/announcement-list"],
  
  render: function () {
    var showNew = this.course.isInstructor(MerlinsBoard.CurrentUser.id);
    var courseName = this.course.escape("name");
    var renderedContent = this.template({announcements: this.collection, showNew: showNew, courseName: courseName});
    this.$el.html(renderedContent);
    return this
  },
    
  newAnnouncement: function (event) {
    Backbone.history.navigate("course/"+this.course.id+"/announcements/new", {trigger: true});
  }
})