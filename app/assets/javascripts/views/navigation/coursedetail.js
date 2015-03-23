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
    var courseID = course.id
    var renderedContent = this.templateDetail({courseID: course.id}); //include boolean for if current user is an instructor..
    this.$el.html(renderedContent);
    return this
  },

  renderHome: function () {
    var renderedContent = this.templateHome();
    this.$el.html(renderedContent);
    return this
  }
})
