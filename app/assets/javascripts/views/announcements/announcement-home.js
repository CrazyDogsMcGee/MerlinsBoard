MerlinsBoard.Views.announcementHome = Backbone.View.extend({
  initialize: function (options) {
    this.course = this.collection.course;
    this.listenTo(this.course, "sync", this.render); 
  },
  
  tagName: "section",
  className: "announcement-list",
  template: JST["announcements/announcement-home"],
  
  render: function () {                                                  
    var renderedContent = this.template({announcements: this.collection, showNew: showNew, courseName: courseName});
    this.$el.html(renderedContent);
    return this
  },
    
  newAnnouncement: function (event) {
    Backbone.history.navigate("course/"+this.course.id+"/announcements/new", {trigger: true});
  }
})