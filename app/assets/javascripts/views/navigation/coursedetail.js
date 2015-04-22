MerlinsBoard.Views.CourseDetails = Backbone.View.extend({
  initialize: function () {
    this.listenTo(MerlinsBoard.Vent, "courseRender", this.renderDetail);
    this.listenTo(MerlinsBoard.Vent, "homeRender", this.renderHome);
  },

  events: {
    "click .course-grades-link": "gradeRedirection"
  },

  templateDetail: JST["navigation/coursedetail"],
  templateHome: JST["navigation/homedetail"],
  
  tagName: "nav",
  
  className: "nav-course",

  renderDetail: function (options) {
    if (options["courseModel"]) {
      this.course = options["courseModel"];
    }
    
    var courseID = course.id
    var renderedContent = this.templateDetail({course: course, current_user: MerlinsBoard.CurrentUser});
    this.$el.html(renderedContent);
    return this
  },

  renderHome: function () {
    var renderedContent = this.templateHome();
    this.$el.html(renderedContent);
    return this
  },
  
  gradeRedirection: function (event) {
    var courseID = this.course.id

    if (this.course.isInstructor(MerlinsBoard.CurrentUser.id)) {
       Backbone.history.navigate("course/"+courseID+"/grades/student-search",{trigger: true});
    } else {
       Backbone.history.navigate("course/"+courseID+"/grades/my-grades",{trigger: true});
    }
  }
  
})
