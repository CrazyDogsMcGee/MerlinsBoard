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
    var renderedContent = this.template({renderCourse: boolean, courseID: id});
    this.$el.html(renderedContent);
    return this
  },
  
  events: {
    "click .nav-link": "followlink"
  },
  
  followlink: function (event) {
  //might not even need this
    event.preventDefault();
    var url = event.currentTarget.attr('href');
    Backbone.history.navigate(url,{trigger: true});
  }
})

//both views are similar, but the links are dissimilar enough...is it better just to have..
//To show off my knowledge of trigger and passing a parameter, I'll just do a conditional page.
//Something off - Even within the course detail, I'm going to maybe have a different set of links for admins.