MerlinsBoard.Views.NoUsers = Backbone.View.extend({
  
  template: $('<p>').text("No users found"),
  
  className: "user-none",
  
  render: function () {
    var renderedContent = this.template;
    this.$el.html(renderedContent);
    return this
  }
})