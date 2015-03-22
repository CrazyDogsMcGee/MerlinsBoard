MerlinsBoard.Views.GradesStudent = MerlinsBoard.Views.CompositeView.extend({
  initialize: function () {
    this.listenTo(this.collection, "sync", this.render)
  },

  template: JST["grades/grades-student"],

  className: "grade-student",

  tagName: "section",

  render: function () {
    this.clearSubviews();
    this.addGrades();
    //this.attachSubviews(); needs to happen after the regular template is rendered
    var renderedContent = this.template({student: this.model})
    this.$el.html(renderedContent);

    this.attachSubviews();
    return this
  },
  
  addGrades: function () {
    this.clearSubviews(); //clears subviews
    
    var gradesStudentView = this

    this.collection.each(function (grade) {
      var gradeView = new MerlinsBoard.Views.GradeShow({model: grade});
      gradesStudentView.addSubview("section.grade-student-list",gradeView.render())
    });
  }
})
