MerlinsBoard.Collections.Announcements = Backbone.Collection.extend({
  initialize: function (options) {
    if (options) {
      this.course = options["course"];
      this.on("sync", this.filter, this);
    }
    
  },
  
  filter: function () {
    this.models = this.models.filter(function (announcement) {
      return (announcement.get("course_id") == this.course.id);
    })
    this.trigger("filter");
  },
  
  url: "api/announcements",
  
  model: MerlinsBoard.Models.Announcement
  //may need to add to course jbuilder response
})