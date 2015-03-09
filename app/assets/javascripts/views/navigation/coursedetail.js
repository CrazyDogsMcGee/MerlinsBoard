MerlinsBoard.Views.CourseDetails = Backbone.View.extend({
  initialize: function () {
    this.listenTo(MerlinsBoard.Vent, "courseRender", this.renderDetail);
    this.listenTo(MerlinsBoard.Vent, "homeRender", this.renderHome);
  },
  
  templateDetail: JST["navigation/coursedetail"],
  
  templateHome: JST["navigation/homedetail"],
  
  tagName: "nav",
  //should this views render follow a trigger on the content view? Yes
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
  
  //both these "return this" statements are superfluous consider i dont pass them into swapView
  
//   events: {
//     "click .nav-link": "followlink"
//   },
  
//   followlink: function (event) {
//     event.preventDefault();
//     var url = event.currentTarget.attr('href');
//     Backbone.history.navigate(url,{trigger: true});
//   }
})