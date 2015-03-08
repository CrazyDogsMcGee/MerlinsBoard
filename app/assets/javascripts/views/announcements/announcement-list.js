MerlinsBoard.Views.announcementList = Backbone.View.extend({
  initialize: function (options) {
    this.course = this.collection.course;
    this.listenTo(this.collection, "filter", this.render);
    this.listenTo(this.course, "sync", this.render);
  },
  
  events: {
  "click button.form" : "newAnnouncement"
  },
  
  tagName: "section",
  
  className: "announcement-list",
  
  template: JST["announcements/announcement-list"],
  
  render: function () {
    var isInstructor = !!(this.course.instructors().get(MerlinsBoard.CurrentUser.id)); //refactor into instance method...
    var renderedContent = this.template({announcements: this.collection, isInstructor: isInstructor});
    this.$el.html(renderedContent);
    return this
  },
    
  newAnnouncement: function (event) {
    Backbone.history.navigate("course/"+this.course.id+"/announcements/new", {trigger: true});
  }
    
  //may need some tweaking before I can use this as a homepage view, only thing I can do is to test and see
  // - Tweaking having to do with administrator privileges..?
})