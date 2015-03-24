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
    var course = options["courseModel"];
    
    var isInstructor = course.isInstructor(MerlinsBoard.CurrentUser);
    
    var courseID = course.id
    var renderedContent = this.templateDetail({courseID: course.id, isInstructor: isInstructor});
    this.$el.html(renderedContent);
    return this
  },

  renderHome: function () {
    var renderedContent = this.templateHome();
    this.$el.html(renderedContent);
    return this
  },
  
  
})
