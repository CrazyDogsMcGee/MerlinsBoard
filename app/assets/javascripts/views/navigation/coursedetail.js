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
    var id = options["courseID"];
    var renderedContent = this.templateDetail({courseID: id});
    this.$el.html(renderedContent);
    return this
  },

  renderHome: function () {
    var renderedContent = this.templateHome();
    this.$el.html(renderedContent);
    return this
  },

  gradeRedirection: function () {
    //I don't want to be makign constant fetches to the database - I should make a "currentCourse" variable I can pull out of if I need stuff.
    //the danger is having an incorrect reference for that global object, should consider what happens with direct navigation to the grades page. - for now I'll make the query I don't have anything else I can do
    //There's only one of these objects too... a less query-intensive solution would be to have the vent pass more data
  }
})
