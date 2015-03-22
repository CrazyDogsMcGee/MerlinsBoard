MerlinsBoard.Collections.Resources = Backbone.Collection.extend({
  initialize: function (models, options) {
    this.owner = options["owner"];
  },
  
  model: MerlinsBoard.Models.Resource,
  
  url: "api/resources",
  
  getOrFetch: function (id) {
    var resource = this.get(id);
    
    if (!assignment) {
      resource = new MerlinsBoard.Models.Assignment({id:id});
      var collection = this
      
      resource.fetch({success: function () {
        collection.add(resource)
      }
      })
    } else {
      resource.fetch();
    }
    
    return resource
  }
})