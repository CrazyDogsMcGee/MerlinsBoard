MerlinsBoard.Collections.Announcements = Backbone.Collection.extend({
  initialize: function (models, options) {

    if (options["course"]) {
      this.course = options["course"];
    }
    
    if (options["user"]) {
      this.user = options["user"]
    }
    
  },
  
  url: "api/announcements",
  
  model: MerlinsBoard.Models.Announcement
})