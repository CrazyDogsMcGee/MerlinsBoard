MerlinsBoard.Views.announcementForm = Backbone.View.extend({
  initialize: function (options) {
    this.listenTo(this.model, "sync", this.render)
    this.course_id = options["course_id"]
  },
  
  template: JST["announcements/announcements-form"],
  
  render: function () {
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
      success: function () {
        Backbone.history.navigate("course/" + this.course_id + "/announcements",{trigger: true});
      }.bind(this),
      error: function (model,response) {
        var errorArray = response.responseJSON;
        var $errorList = $("<ul>");
        _.each(errorArray, function (error) {
          var $error = $("<li>").text(error);
          $errorList.append($error);
        })
        $("section.form-errors").html($errorList)
      }
    })
  }
  
})