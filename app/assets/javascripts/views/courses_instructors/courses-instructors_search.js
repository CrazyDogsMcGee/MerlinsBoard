MerlinsBoard.Views.SearchStudentInstructors = MerlinsBoard.Views.CompositeView.extend({
  initialize: function (options) {
    this.listenTo(this.collection, "sync", this.render)
    this.course = options["course"]
  },


  //this is the view that will be rendered into the results pane.
  //this is the outer collection view, its only purpose is to contain the composite models
  //I don't want composite logic in the search itself because I want it to be reuseable.

  template: JST["courses_instructors/instructors-composite"],

  className: "instructor-search",

  render: function () {
    this.addUsers();
    this.$el.html(this.template());
    this.attachSubviews();
    
    return this
  },

  addUsers: function () {
    this.clearSubviews(); //clears subviews attribute

    var user_search_view = this
    
    if (this.collection.length == 0) {
      var none_found = new MerlinsBoard.Views.NoUsers();
      user_search_view.addSubview("section.instructors-search-results", none_found.render());
    } else {
      this.collection.each(function (user) {
        var user_view = new MerlinsBoard.Views.StudentInstructor({model: user, course: this.course});
        user_search_view.addSubview("section.instructors-search-results",user_view.render());
      });
    }
  }
})

//probably shold include an error section for the subviews to work with (an actual template)
