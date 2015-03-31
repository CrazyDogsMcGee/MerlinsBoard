MerlinsBoard.Views.UserShow = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    _.bindAll(this, "userSuccessCallback", "userErrorCallback");
  },
  
  className: "user-show",
  
  tagName: "section",
  
  template: JST["users/user-show"],
  
  events: {
    "click .user-edit": "showForm",
    "click .user-password": "showPassword",
  },
                                                    
  render: function () {
    var renderedContent = this.template({user: this.model});
    this.$el.html(renderedContent);
    return this
  },
    
  showForm: function () {
    Backbone.history.navigate("",{trigger: true})
  },

  showPassword: function () {
    Backbone.history.navigate("",{trigger: true})
  }
})