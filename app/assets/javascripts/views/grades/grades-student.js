//Lists a students grade - an admin has access to this view to edit grades
MerlinsBoard.Views.GradesStudent = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.collection, "add change remove", this.render)
    //for jbuidler - nest each of a student's grade under them along with basic information about the assignment
  },

  template: JST["grades/grades-student"],

  events: {

  },

  render: function () {
    var renderedContent = this.template({grades: this.collection})
  },

  editGrade: function (event) {

   //For these actions - the course_id must always be passed as a data parameter
  }

  //will need collection of grade objects
  //will need user objects to reference owner of grades
  //will need assignment objects to reference from connecting grades
})
