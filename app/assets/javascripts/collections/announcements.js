MerlinsBoard.Collections.Announcements = Backbone.Collection.extend({
  initialize: function (models, options) {
    this.owner = options["owner"];
  },
  
  url: "api/announcements",
  
  model: MerlinsBoard.Models.Announcement,
  
  getOrFetch: function (id) {    
    announcement = this.get(id);
    var collection = this
    
    if (!announcement) {
    announcement = new MerlinsBoard.Models.Announcement({id: id})
    announcement.fetch({success: function () {
      collection.add(announcement)
      }
      })
    } else {
      announcement.fetch
    }
    
    return announcement
  }
})