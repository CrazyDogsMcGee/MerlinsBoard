MerlinsBoard.Collections.Announcements = Backbone.Collection.extend({
  initialize: function (models, options) {
    this.owner = options["owner"];
  },
  
  url: "api/announcements",
  
  model: MerlinsBoard.Models.Announcement
})