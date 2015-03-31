MerlinsBoard.Views.UserForm = Backbone.View.extend({  
  initialize: function (options) {
    if (options["profile"] == true)) {
      this.template = return JST["users/forms/user-form"]
      this.listenTo(this.model,"sync",this.render)
    } else {
      this.template = return JST["users/forms/user-password"]
    }
  },
  
  render: function () {},
  
  events: {
    "submit .user-form":"submitForm",
    "click .user-back": "render",
    "change input.user-form-fileinput": "previewAvatar"
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
    console.log("User attrs saved");
    console.log(response);
    Backbone.history.navigate("student-profile/"+this.model.id,{trigger: true});
  },

  userErrorCallback: function (model, response) {
    console.log(response);
    var error_array = response.responseJSON.errors;
    var $error_list = $("<ul>").addClass("errors");
    
    _.each(error_array, function (error) {
      var $error = $("<li>").text(error).addClass("error");
      $error_list.append($error);
    })

    $("section.form-errors").html($errorList);
  },
  
  previewAvatar: function (event) {
    var file = event.currentTarget.files[0];
    var reader = new FileReader();
    var formView = this
    
    reader.onloadend = function () {
      formView.model._avatar = reader.result;
      formView.$(".user-imgpreview").src = reader.result;
    };
    
    if (file) {
      reader.readAsDataURL(file);
    } else {
      delete formView.model._avatar;
      formView.$(".user-imgpreview").src = "";
    }
  }
  })
  
  