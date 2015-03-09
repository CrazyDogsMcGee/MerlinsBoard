MerlinsBoard.Views.CourseDetails = Backbone.View.extend({
  initialize: function () {
    this.listenTo(MerlinsBoard.Vent, "courseRender", this.render);
  },
  
  template: JST["navigation/coursedetail"],
  
  tagName: "nav",
  //should this views render follow a trigger on the content view? Yes
  className: "nav-course",
  
  render: function (options) {
    var boolean = options["renderCourse"];
    var id = options["courseID"];
    var renderedContent = this.template({renderCourse: boolean, courseID: id}); //danger here: I will not want to use courseID, this may warrant having a different view
    this.$el.html(renderedContent);
    return this
  },
  
  events: {
    "click .nav-link": "followlink"
  },
  
  followlink: function (event) {
    event.preventDefault();
    var url = event.currentTarget.attr('href');
    Backbone.history.navigate(url,{trigger: true});
  }
})

//should have logic to redirect admins to different pages in router - Grades for example should redirect to a search page for admins and a normal page for students, but is this good practice?
//I've never heard of it, but it may benefit me to have two templates and render methods on this that will listen for different events on the global vent