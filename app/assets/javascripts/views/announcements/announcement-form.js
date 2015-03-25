MerlinsBoard.Views.announcementForm = Backbone.View.extend({
  initialize: function (options) {
    this.listenTo(this.model, "sync", this.render);
    this.course_id = options["course_id"];
    _.bindAll(this,"announcementSuccessCallback","announcementErrorCallback");
  },
  
  template: JST["announcements/announcements-form"],
  
  render: function () {
    debugger
    var renderedContent = this.template({course_id: this.course_id, announcement: this.model});
    this.$el.html(renderedContent);
    return this
  },
  
  events: {
    "submit form.announcement-form": "submit"
  },
  
  submit: function (event) {
    event.preventDefault();
    var attrs = $(event.target).serializeJSON();
    this.model.save(attrs, {
      success: this.announcementSuccessCallback,
      error: this.announcementErroeCallback
    });
  },
  
  announcementSuccessCallback: function () {
    Backbone.history.navigate("course/" + this.course_id + "/announcements",{trigger: true});
  },
  
  announcementErrorCallback: function (model,response) {
    var errorArray = response.responseJSON;
    var $errorList = $("<ul>");
    
    _.each(errorArray, function (error) {
      var $error = $("<li>").text(error);
      $errorList.append($error);
    })
    
    this.$("section.form-errors").html($errorList)
  }
})