MerlinsBoard.Views.CourseDetails = Backbone.View.extend({
  tagName: "nav",
  //should this views render follow a trigger on the content view? Yes
  className: "nav-course",
  
  links: function () {
    var dashlinks = ["assignments","grades","resources","roster","forum","home"] 
    var courselinks = ["calender","all announcements","profile","course search"]
    
    var links = {}
    //will probably need two functions with vent listener that each will trigger
    //http://lostechies.com/derickbailey/2011/07/19/references-routing-and-the-event-aggregator-coordinating-views-in-backbone-js/
    return links
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