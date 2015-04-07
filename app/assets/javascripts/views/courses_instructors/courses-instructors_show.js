MerlinsBoard.Views.StudentInstructor = Backbone.View.extend({
  initialize: function (options) {
    this.course = options["course"];
  },
  
  className: "instructor-users-search",
  
  tagName: "section",
  
  render: function () {
    var rendered_content = this.template({user: this.model, course: this.course});
    this.$el.html
  },
  
  template: JST["courses_instructors/add-instructors"],
  
  events: {
    "click button.add-instructor":"",
    "click button.remove-instructor":""
  },
  
  
  //the ajax for the below will also have to ssend up the course id to detect if the CU is an admin.
  //also give a space for errors in case the creation goes bad.
  addInstructor: function (event) {
    this.model
    this.course.professorships()
  },
  
  removeInstructor: function (event) {
    this.model
    this.course.professorships()
  }
})