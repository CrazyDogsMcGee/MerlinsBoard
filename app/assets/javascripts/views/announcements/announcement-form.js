MerlinsBoard.Views.announcementForm = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, "sync", this.render)
    this.course_id = options["course_id"]
  },
  
  template: JST["announcements/announcement-form"],
  
  render: function () {
    this.template({course_id: this.course_id});
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
        Backbone.history.navigate("course/" + this.course_id + "/announcements",{trigger: true})
      }.bind(this),
      error: function (model,response) {
        var errorArray = response.responseJSON
        var $errorList = $("<ul>")
        _.each(errorArray, function (error) {
          var $error = $("<li>").text(error)
          $errorList.append($error)
        })
        $("section.form-errors").html($errorList)
      }
    })
  }
  
})