MerlinsBoard.Routers.BoundRouter = Backbone.Router.extend({
  execute: function(callback, args, name) {
      var actionName = this.getActionName(callback);
      console.log(actionName);
      console.log(args);

      //concat fetched course with arguments and pass to function
      // super
      Backbone.Router.prototype.execute.apply(this, arguments);
  }
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
