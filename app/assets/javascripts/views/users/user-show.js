MerlinsBoard.Views.UserShow = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },
  
  className: "user-show",
  
  tagName: "section",
  
  template: JST["users/user-show"],
  
  events: {
    "click button.user-edit": "showForm",
    "click button.user-password": "showPassword",
  },
                                                    
  render: function () {
    var renderedContent = this.template({user: this.model});
    this.$el.html(renderedContent);
    return this
  },
    
  showForm: function () {
    Backbone.history.navigate("edit-user",{trigger: true});
  },

  showPassword: function () {
    Backbone.history.navigate("change-password",{trigger: true});
  }
})