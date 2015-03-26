MerlinsBoard.Views.GradeShow = MerlinsBoard.Views.CompositeView.extend({
  initialize: function (options) {
    _.bindAll(this, "gradeSaveCallback", "gradeSaveErrorCallback");
    this.listenTo(this.model, "sync", this.render)
    this.adminView = options["adminView"];
  },
  
  template: JST["grades/grades-show"],
  
  className: "grade-item",
  
  events: function () {
    var events_hash = {};
    
    if (this.adminView) {
      
      _.extend(events_hash, {
      "click strong.grade-number":"editGrade",
      "blur input.grade-input":"saveGrade",
      "submit form.grade-submission":"submitSubmission"
      });
      
    } else {
      
      _.extend(events_hash, {
      "submit form.grade-submission":"submitSubmission"
      });
      
    }
    
    return events_hash
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
    var editedGrade = this.model
    var newGrade = parseInt($('input.grade-input').val());

    editedGrade.set({grade: newGrade});
    editedGrade.save({},{ //course_id is already on the model, it will be available from the params
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
  },
  
  submitFile: function (event) {
    event.preventDefault();
    
    var file = $(event.target).find("")
    var that = this
    var reader = new FileReader();
    
    reader.onloadend = function () {
      that.model._submission = reader.result;
      
      that.model.save({},{
        success: that.submitFileSuccess,
        error: that.submitFileError
      })
    };
    
    if (file) {
      reader.readAsDataURL(file)
    } else {
      delete that.model._submission;
    }
    
  },
  
  submitFileSuccess: function () {
    
  },
  
  submitFileError: function () {
    
  }
})