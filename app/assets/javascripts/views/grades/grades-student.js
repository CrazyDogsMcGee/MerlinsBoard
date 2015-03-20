MerlinsBoard.Views.GradesStudent = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.collection, "add reset", this.render)
    _.bindAll(this, "gradeSaveCallback", "gradeSaveErrorCallback")
    //need to refactor with composite view
  },

  template: JST["grades/grades-student-list"],

  events: {
   
  },

  className: "grade-list",

  tagName: "section"
  
  //renderResults
  //Move these methods to a singular grade "form"
})
