MerlinsBoard.Routers.BoundRouter = Backbone.Router.extend({
  bindFilter: function (homeRoutes, detailRoutes) {
    this.on("route",function (event, args) {
      console.log("An event happened")
      console.log(event)
      console.log(args) //the first argument is always the courseid, or whatever comes first i nthe route
    })
  },


})

// Backbone.Router.extend({
// execute: function(callback, args) {
//     var actionName = this.getActionName(callback);
//     // super
//     Backbone.Router.prototype.execute.apply(this, arguments);
// },
// getActionName: function(callback) {
//     if (!this.routes) {
//         return;
//     }
//
//     var actionName;
//     var matched;
//     for (var routePattern in this.routes) {
//         actionName = this.routes[routePattern];
//         if (callback === this[actionName]) {
//             matched = actionName;
//             break;
//         }
//     }
//     return matched;
// }
