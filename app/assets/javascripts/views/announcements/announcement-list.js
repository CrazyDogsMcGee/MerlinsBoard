MerlinsBoard.Views.announcementList = Backbone.View.extend({
  initialize: function (options) {
    this.course = this.collection.owner;
    this.listenTo(this.course, "sync", this.render); 
  },
  
  events: {
    "click button.announcement-new-button" : "newAnnouncement",
    "click button.announcement-edit" : "editAnnouncement",
    "click button.announcement-destroy" : "destroyAnnouncement"
  },
  
  tagName: "section",
  
  className: "announcement-list",
  
  template: JST["announcements/announcement-list"],
  
  render: function () {
    var isInstructor = this.course.isInstructor(MerlinsBoard.CurrentUser.id);
    var courseName = this.course.escape("name");
    var renderedContent = this.template({announcements: this.collection, isInstructor: isInstructor, courseName: courseName});
    this.$el.html(renderedContent);
    return this
  },
    
  newAnnouncement: function (event) {
    Backbone.history.navigate("course/"+this.course.id+"/announcements/new", {trigger: true});
  },
  
  editAnnouncement: function (event) {
    var announcementID = $(event.currentTarget).data('id');
    var announcement = this.collection.getOrFetch(announcementID);
    var editUrl = '#course/'+announcement.get('course_id')+'/announcements/' + announcement.id + '/edit';
    Backbone.history.navigate(editUrl,{trigger: true});
  },
  
  destroyAnnouncement: function (event) {
    var announcementID = $(event.currentTarget).data('id');
    var announcement = this.collection.getOrFetch(announcementID);
    
    announcement.destroy({success: function () {
      this.render();
    }.bind(this),
    data: $.param({course_id: this.course.id})
    })
  }
})