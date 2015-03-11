MerlinsBoard.Views.CourseDetails = Backbone.View.extend({
  initialize: function () {
    this.listenTo(MerlinsBoard.Vent, "courseRender", this.renderDetail);
    this.listenTo(MerlinsBoard.Vent, "homeRender", this.renderHome);
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
  }
})