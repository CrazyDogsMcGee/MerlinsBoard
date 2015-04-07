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
    "click button.add-instructor":"addInstructor",
    "click button.remove-instructor":"removeInstructor"
  },


  //the ajax for the below will also have to ssend up the course id to detect if the CU is an admin.
  //also give a space for errors in case the creation goes bad.
  addInstructor: function (event) {
    var new_professorship = new MerlinsBoard.Models.CoursesInstructor({user_id: this.model.id, course_id: this.course.id});
    var user_view = this;

    new_professorship.save({},{
      success: function () {
        user_view.instructors().add(this.model);
        user_view.professorships().add(new_professorship);
        user_view.render()
      },
      error: function (model, response) {
        var errorArray = response.responseJSON.errors
        user_view.showErrors(errorArray);
      }
    })
  },

  removeInstructor: function (event) {
    var old_professorship = this.course.professorships().findWhere({user_id: this.model.id});
    var user_view = this;
    //prevent user from unenrolling self.
    old_professorship.destroy({
      success: function () {
        user_view.render();
      }
    })
  },

  //need to clear error messages
  showErrors: function (errorArray) {
    var $errorList = $("<ul>").addClass('errors');
    _.each(errorArray, function (error) {
      var $error = $("<li>").text(error).addClass('error');
      $errorList.append($error);
    })

    $("section.instructors-search-errors").html($errorList);
  }
})
