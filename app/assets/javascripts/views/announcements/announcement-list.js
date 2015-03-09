MerlinsBoard.Views.announcementList = Backbone.View.extend({
  initialize: function (options) {
    this.renderHome = this.collection.allCourses
    
    if (!this.renderHome) {
      this.course = this.collection.course;
      this.listenTo(this.course, "sync", this.render);
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
    
    if (!this.renderHome) {
      showNew = this.course.isInstructor(MerlinsBoard.CurrentUser.id);
    } else {
      showNew = false;
    }
                                                           
    var renderedContent = this.template({announcements: this.collection, showNew: showNew});
    this.$el.html(renderedContent);
    return this
  },
    
  newAnnouncement: function (event) {
    Backbone.history.navigate("course/"+this.course.id+"/announcements/new", {trigger: true});
  }
    
  //may need some tweaking before I can use this as a homepage view, only thing I can do is to test and see
  // - Tweaking having to do with administrator privileges..?
})