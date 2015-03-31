MerlinsBoard.Routers.BoundRouter = Backbone.Router.extend({
   routeRegex: function (routeName) {
    var courseFlag = new RegExp("_course");
    var homeFlag = new RegExp("_home");
    
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
    
    var noNull = _.filter(args, function (arg) {
      return !(arg === null)
    })
    
    if (this.routeRegex(actionName) == "course") { //should probably extract this somewhere else
      this._currentCourse = MerlinsBoard.Courses.getOrFetch(noNull[0]);
      MerlinsBoard.Vent.trigger("courseRender",{courseModel: this._currentCourse});
      this._currentCourse.fetch({success: function () {console.log(this._currentCourse)}.bind(this)});
    } else {
      MerlinsBoard.Vent.trigger("homeRender");
    }
    
    if (callback) callback.apply(this, noNull);
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
  }
})
