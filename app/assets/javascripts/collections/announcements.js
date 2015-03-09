MerlinsBoard.Collections.Announcements = Backbone.Collection.extend({
  initialize: function (options) {
    if (options["course"]) {
      this.course = options["course"];
      this.courseIDs = [this.course.id];
      this.allCourses = false;
    } else if (options["courseIDs"]) {
      this.allCourses = true;
      this.courseIDs = options["courseIDs"];
    }
    
    this.on("sync", this.filter, this);
  },
  
  filter: function () {
    this.models = this.models.filter(function (announcement) {
      return _.contains(this.courseIDs, announcement.get("course_id"));
    },this)
    this.trigger("filter");
  },
  
  url: "api/announcements",
  
  model: MerlinsBoard.Models.Announcement
  
//   comparator: function(announcement) {
//     return announcement.get("created_at")
//   }
})

// NOTE: For this particular collection - the only reference it will have to its parent "course" will be the course ID in an array. I am unsure yet whether I will choose to do the same for the other nested resources.
// For now, I'll keep the original reference if I need it but have a separate attribute for arrays