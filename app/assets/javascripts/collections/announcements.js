MerlinsBoard.Collections.Announcements = Backbone.Collection.extend({
  initialize: function (options) {
    this.allCourses = true //by default - get rid of "New" button
    
    if (options["course"]) { //error is happening because there is nothing at ALL to evaluate
      this.course = options["course"];
      this.allCourses = false;
    }
    
  },
  
  url: "api/announcements",
  
  model: MerlinsBoard.Models.Announcement
})