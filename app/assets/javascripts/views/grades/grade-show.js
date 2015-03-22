MerlinsBoard.Views.GradeShow = MerlinsBoard.Views.CompositeView.extend({
  initialize: function () {
    _.bindAll(this, "gradeSaveCallback", "gradeSaveErrorCallback");
    this.listenTo(this.model, "sync change:grade", this.render)
  },
  
  template: JST["grades/grades-show"]
  
  className: "grade-item",
  
  editGrade: function (event) {
    var gradeString = $(event.currentTarget).val();
    var num = parseInt(gradeString);
    var $input = $("<input type='number' min='0' step='1' max='100'>").addClass('grade-input').val(num);
    this.modelNumber = $(event.currentTarget).data('id');
    $(".grade-number[data-id=".concat(this.modelNumber,"]")).html($input)
  },

  saveGrade: function (event) {
    var editedGrade = this.collection.getOrFetch(this.modelNumber); //I already have the model number, I don't even need to do another fetch.
    var newGrade = parseInt($('input.grade-input').val());
    var courseID = this.collection.course_id;

    editedGrade.set({grade: newGrade});
    editedGrade.save({course_id: courseID},{success:          this.gradeSaveCallback(editedGrade),
    error: this.gradeSaveErrorCallback
    });
  },

  gradeSaveCallback: function (editedGrade) {
    var $grade = $('<strong>').text(editedGrade.get("grade"))
    this.$(".grade-number[data-id=".concat(this.modelNumber,"]")).html($grade)       //unideal - needs to be banished with composite view paradigm.

    //the save is happening - the collection stubbornly refuses to update...should just refactor to composite view.
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