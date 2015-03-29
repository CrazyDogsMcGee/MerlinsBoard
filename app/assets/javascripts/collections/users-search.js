MerlinsBoard.Collections.UsersSearch = Backbone.Collection.extend({
  initialize: function (options) {
    if (options) {
      this.course_id = options["course_id"];
    }
  },

  url: function () {
    if (this.course_id) {
      return "api/courses/".concat(this.course_id,"/student_search");
    }
    
    return "api/users/users_search"
  }
})
