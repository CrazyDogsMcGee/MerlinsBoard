MerlinsBoard.Views.UserShow = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    _.bindAll(this, "userSuccessCallback", "userErrorCallback");
  },
  
  className: "user-show",
  
  tagName: "section",
  
  template: JST["users/user-show"],
  
  formTemplate: JST["users/forms/user-form"],
  
  passwordTemplate: JST["users/forms/user-password"],
  
  events: {
    "click .user-edit": "showForm",
    "click .user-password": "showPassword",
    "submit .user-form": "submitForm",
    "click .user-back": "render"
  },
                                                    
  render: function () {
    var renderedContent = this.template({user: this.model});
    this.$el.html(renderedContent);
    return this
  },
    
  showForm: function () {
    var renderedContent = this.formTemplate({user: this.model});
    this.$el.html(renderedContent);
  },

  showPassword: function () {
    var renderedContent = this.passwordTemplate({user: this.model});
    this.$el.html(renderedContent);
  },
    
  submitForm: function (event) {
    event.preventDefault();
    var attrs = $(event.target).serializeJSON();
    
    this.model.save(attrs,{
      success: this.userSuccessCallback,
      error: this.userErrorCallback
    })
  },

  userSuccessCallback: function (model, response) {
    this.render();
    console.log("success callback")
  },

  userErrorCallback: function (model, response) {
    console.log(response);
    var errorArray = response.responseJSON.errors;

    var $errorList = $("<ul>").addClass("errors");
    _.each(errorArray, function (error) {
      var $error = $("<li>").text(error).addClass("error");
      $errorList.append($error);
    })

    $("section.form-errors").html($errorList);
  }
})