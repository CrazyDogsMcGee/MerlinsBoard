MerlinsBoard.Views.assignmentForm = Backbone.View.extend({
  initialize: function (options) {
    this.listenTo(this.model, "sync", this.render)
    this.course_id = options["course_id"]
  },
  
  tagName: "section",
  
  className: "assignments-form",
  
  template: JST["assignments/assignment-form"],
  
  events: {
    "submit form.assignment-form": "submit"
  },
  
  render: function () {
    var renderedContent = this.template({assignment: this.model, course_id: this.course_id});
    this.$el.html(renderedContent);
    return this
  },
  
  submit: function (event) {
    event.preventDefault();
    var attrs = $(event.target).serializeJSON();
    this.model.save(attrs, {
      success: function () {
        Backbone.history.navigate("course/" + this.course_id + "/assignments",{trigger: true});
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