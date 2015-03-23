MerlinsBoard.Views.GradeShow = MerlinsBoard.Views.CompositeView.extend({
  initialize: function () {
    _.bindAll(this, "gradeSaveCallback", "gradeSaveErrorCallback");
    this.listenTo(this.model, "sync", this.render)
  },
  
  template: JST["grades/grades-show"],
  
  className: "grade-item",
  
  events:{
    "click strong.grade-number":"editGrade",
    "blur input.grade-input":"saveGrade"
  },
  
  render: function () {
    var renderedContent = this.template({grade: this.model});
    this.$el.html(renderedContent);
    return this
  },
  
  editGrade: function (event) {
    var gradeString = $(event.currentTarget).val();
    var num = parseInt(gradeString);
    var $input = $("<input type='number' min='0' step='1' max='100'>").addClass('grade-input').val(num);
    //Need to turn the input into a text input, and then have an error callback that checks if the input is valid, and lists errors if it is not.
    this.modelNumber = $(event.currentTarget).data('id');
    $(".grade-number[data-id=".concat(this.modelNumber,"]")).html($input)
  },

  saveGrade: function (event) {
    var editedGrade = this.model //I already have the model number, I don't even need to do another fetch.
    var newGrade = parseInt($('input.grade-input').val());

    editedGrade.set({grade: newGrade});
    editedGrade.save({},{
    success: this.gradeSaveCallback(editedGrade),
    error: this.gradeSaveErrorCallback
    });
  },

  gradeSaveCallback: function (editedGrade) {
    console.log("The render should handle it fine")
  },

  gradeSaveErrorCallback: function (model, resp) {

    var errorArray = resp.responseJSON
    var $errorList = $("<ul>").addClass('errors');
    _.each(errorArray, function (error) {
      var $error = $("<li>").text(error).addClass('error');
      $errorList.append($error);
    })

    $("section.grade-errors").html($errorList);
  }
})