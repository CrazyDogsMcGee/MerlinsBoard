MerlinsBoard.Views.SearchStudentInstructors = MerlinsBoard.Views.CompositeView.extend({
  initialize: function (options) {
    this.listenTo(this.collection, "add remove reset sync", this.render)
    this.course = options["current_course"]
  },
  
  
  //this is the view that will be rendered into the results pane.
  //this is the outer collection view, its only purpose is to contain the composite models
  //I don't want composite logic in the search itself because I want it to be reuseable.
  
//   template: JST[""], I think it default to div

  className: "instructor-search",

  render: function () {
    //var urlRoot = "#course/".concat(this.course_id,"/grades/user/");
    var renderedContent = this.template({users: this.collection, gradeUrl: urlRoot});
    this.$el.html(renderedContent);
    return this
  },
  
  render: function () {
    this.addUsers();
    
    //var renderedContent = this.template({course: this.course})
    //this.$el.html(renderedContent);

    this.attachSubviews();
    return this
  },
  
  addUsers: function () {
    this.clearSubviews(); //clears subviews attribute
    
    var gradesStudentView = this
    var adminView = this.adminView

    this.collection.each(function (user) {
      var gradeView = new MerlinsBoard.Views.StudentInstructor ({model: user, course: this.course});
      gradesStudentView.addSubview("div.instructor-search",gradeView.render())
    });
  }
})

//probably shold include an error section for the subviews to work with (an actual template)