MerlinsBoard.Views.SearchStudentGradesResults = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.collection, "add remove reset", this.render)
  },
  
  template: JST["grades/grades-student-links"],

  className: "grades-student-search",

  render: function () {
    var renderedContent = this.template({students: this.collection});
    this.$el.html(renderedContent);
    return this.$el
  }
})
