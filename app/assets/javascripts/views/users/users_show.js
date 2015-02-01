MerlinsBoard.Views.UsersShow = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },
  
  template: JST["users/show"],
  
  render: function () {
    var renderedContent = this.template({user: this.model})
    this.$el.html(renderedContent);
    return this
  }
  
})