MerlinsBoard.Views.Help = Backbone.View.extend({
  template: JST["users/help"],
  
  className: "user-help",
  
  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    return this
  }
})