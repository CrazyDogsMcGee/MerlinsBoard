MerlinsBoard.Views.SearchStudent = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.collection, "add remove reset", this.render)
  },

  // template: JST[],

  render: function () {

  }

  //should have search functionality later...
})
