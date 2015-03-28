MerlinsBoard.Routers.BoundRouter = Backbone.Router.extend({
  routeRegex: function (routeName) {
    var courseFlag = new Regexp("-course");
    var homeFlag = new Regexp("-home");
    
    if (courseFlag.test(routeName)) {
      return "course" 
    } else if (homeFlag.test(routeName)) {
      return "home"
    } else {
      return false
    }
  },

  execute: function (callback, args) {
    var actionName = this.getActionName(callback);
    var noNullArgs = this.cleanArgs(args);
    
    if (this.routeRegex(actionName) == "course") {
      MerlinsBoard.Models._currentCourse = MerlinsBoard.Courses.getOrFetch(noNull[0]);
      MerlinsBoard.Models._currentCourse.fetch();
      
      MerlinsBoard.Vent.trigger("courseRender",{courseModel: this._currentCourse});
    } else {
      MerlinsBoard.Vent.trigger("homeRender");
    }
    
    if (callback) callback.apply(this, noNullArgs);
  },
  
  getActionName: function(callback) {
    if (!this.routes) {
        return;
    }

    var actionName;
    var matched;
    for (var routePattern in this.routes) {
        actionName = this.routes[routePattern];
        if (callback === this[actionName]) {
            matched = actionName;
            break;
        }
    }
    return matched;
  },
  
  cleanArgs: function (args) {
    _.filter(args, function (arg) {
      return !(arg === null)
    })
    
    return args
  }
})
