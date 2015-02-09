MerlinsBoard.Views.announcementList = Backbone.View.extend({
  initialize: function (options) {
    this.course = this.collection.course
    this.listenTo(this.collection, "filter", this.render);
    this.listenTo(this.course, "sync", this.render)
  },
  
  events: {
  "click button.form" : "newAnnouncement"
  },
  
  tagName: "section",
  
  className: "announcement-list",
  
  template: JST["announcements/announcement-list"],
  
  render: function () {
    var isInstructor = !!(this.course.instructors().get(MerlinsBoard.CurrentUser.id));
    var renderedContent = this.template({announcements: this.collection, isInstructor: isInstructor});
    this.$el.html(renderedContent);
    return this
  },
    
  newAnnouncement: function (event) {
    Backbone.history.navigate("course/"+this.course.id+"/announcements/new", {trigger: true});
  }
    
  
})