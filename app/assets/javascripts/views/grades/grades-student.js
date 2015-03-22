MerlinsBoard.Views.GradesStudent = MerlinsBoard.Views.CompositeView.extend({
  initialize: function () {
  },

  template: JST["grades/grades-student-list"],

  className: "grade-list",

  tagName: "section",

  render: function () {
    this.clearSubviews();
    this.addGrades().bind(this);
    //this.attachSubviews(); needs to happen after the regular template is rendered
    var renderedContent = this.template({student: this.model})
    this.$el.html(renderedContent);

    this.attachSubviews();
    return this
  },
  
  addGrades: function () {
    this.subviews() = {}; //clears subviews

    this.collection.each(function (grade) {
      var gradeView = new MerlinsBoard.Views.GradeShow({model: grade});
      this.addSubview("section.grade-list",gradeView.render())
    });
  }
})
