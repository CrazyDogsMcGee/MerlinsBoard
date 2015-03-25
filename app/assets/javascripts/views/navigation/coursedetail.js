MerlinsBoard.Views.CourseDetails = Backbone.View.extend({
  initialize: function () {
    this.listenTo(MerlinsBoard.Vent, "courseRender", this.renderDetail);
    this.listenTo(MerlinsBoard.Vent, "homeRender", this.renderHome);
  },

  events: {
    "click #course-grades-link": "gradeRedirection"
  },

  templateDetail: JST["navigation/coursedetail"],
  templateHome: JST["navigation/homedetail"],
  
  tagName: "nav",
  
  className: "nav-course",

  renderDetail: function (options) {
    this.course = options["courseModel"]; //unsure if this would bite me in the ass anytime..so long as I always pass the reference to the course itself. I plan to do this 
    
    var courseID = course.id
    var renderedContent = this.templateDetail({courseID: course.id});
    this.$el.html(renderedContent);
    return this
  },

  renderHome: function () {
    var renderedContent = this.templateHome();
    this.$el.html(renderedContent);
    return this
  },
  
  gradeRedirection: function (event) {
    var course_id = $()
    
    if (this.course.isInstructor(MerlinsBoard.current_user.id)) {
      console.log("admin")
//       Backbone.history.navigate("",{trigger: true});
    } else {
      console.log("joe schmoe")
//       Backbone.history.navigate("",{trigger: true});
    }
  }
  
})
