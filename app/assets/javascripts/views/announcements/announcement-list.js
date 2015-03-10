MerlinsBoard.Views.announcementList = Backbone.View.extend({
  initialize: function (options) {
    this.renderHome = this.collection.allCourses
    
    if (!this.renderHome) {
      this.course = this.collection.course;
      this.listenTo(this.course, "sync", this.render); //Unless there were some way to listen to all of those course lists in a resource-efficient way
    }
    
    this.listenTo(this.collection, "filter", this.render);
  },
  
  events: {
  "click button.form" : "newAnnouncement"
  },
  
  tagName: "section",
  
  className: "announcement-list",
  
  template: JST["announcements/announcement-list"],
  
  render: function () {
    var showNew
    var courseName
    
    if (!this.renderHome) {
      showNew = this.course.isInstructor(MerlinsBoard.CurrentUser.id);
      courseName = this.course.get("name");
    } else {
      showNew = false;
      courseName = "all (attended not taught) courses"
    }
                                                           
    var renderedContent = this.template({announcements: this.collection, showNew: showNew, courseName: courseName});
    this.$el.html(renderedContent);
    return this
  },
    
  newAnnouncement: function (event) {
    Backbone.history.navigate("course/"+this.course.id+"/announcements/new", {trigger: true});
  }
})