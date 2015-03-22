MerlinsBoard.Views.SearchStudentGradesResults = Backbone.View.extend({
  initialize: function (options) {
    this.listenTo(this.collection, "add remove reset sync", this.render)
    this.course_id = options["course_id"];
  },
  
  template: JST["grades/grades-student-links"],

  className: "grades-student-links",

  render: function () {
    var urlRoot = "#course/".concat(this.course_id,"/grades/user/");
    var renderedContent = this.template({students: this.collection, gradeUrl: urlRoot});
    this.$el.html(renderedContent);
    return this
  }
})
