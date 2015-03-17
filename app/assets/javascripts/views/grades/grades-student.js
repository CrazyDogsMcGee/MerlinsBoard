//Lists a students grade - an admin has access to this view to edit grades
MerlinsBoard.Views.GradesStudent = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.collection, "add change:grade remove", this.render)
    //for jbuidler - nest each of a student's grade under them along with basic information about the assignment
  },

  template: JST["grades/grades-student"],

  events: {
    "click .grade-number":"editGrade",
    "blur .grade-input": "saveGrade"
  },

  render: function () {
    var renderedContent = this.template({grades: this.collection});
  },

  editGrade: function (event) {
    var num = parseInt(event.currentTarget.text());
    var input = $("<input type='number'>").addClass('grade-input').val(num);
    $(".grade-number").html(input)
  },

  saveGrade: function (event) {
    $(".grade-number").html()
  }

})
