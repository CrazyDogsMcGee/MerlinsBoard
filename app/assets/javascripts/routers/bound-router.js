MerlinsBoard.Routers.BoundRouter = Backbone.Router.extend({
  bindFilter: function (homeRoutes, detailRoutes) {


    this.on("route",function (event, args) {
      console.log("An event happened")
      console.log(event)
      console.log(args) //the first argument is always the courseid, or whatever comes first i nthe route
    })
  }
})
