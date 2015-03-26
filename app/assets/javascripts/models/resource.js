MerlinsBoard.Models.Resource = Backbone.Model.extend({
  initialize: function () {},
  
  urlRoot: "api/resources",
  
  toJSON: function () { //called in Backbone.model.save
    var json = {resource: _.clone(this.attributes)}; //this refers to model
    
    if (this._document) {
      json.resource.document = this._document;
    }
    
    return json;
  }
});
