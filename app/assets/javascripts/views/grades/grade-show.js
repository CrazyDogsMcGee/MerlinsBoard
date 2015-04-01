MerlinsBoard.Views.GradeShow = MerlinsBoard.Views.CompositeView.extend({
  initialize: function (options) {
    _.bindAll(this, "gradeSaveErrorCallback");
    this.listenTo(this.model, "sync", this.render)
    
    this.adminView = options["adminView"];
    this.course_id = options["course_id"];
  },
  
  template: JST["grades/grades-show"],
  
  className: "grade-item",
  
  events: function () {
    var events_hash = {};

    if (this.adminView) {
      _.extend(events_hash, {
      "click strong.grade-number":"editGrade",
      "blur input.grade-input":"saveGrade",
      "submit form.grade-submission":"submitFile"
      });
      
    } else {
      
      _.extend(events_hash, {
      "submit form.grade-submission":"submitFile"
      });
      
    }
    return events_hash
  },
  
  render: function () {
    var renderedContent = this.template({grade: this.model, assignment: this.model.assignment()});
    this.$el.html(renderedContent);
    return this
  },
  
  editGrade: function (event) {
    var gradeString = $(event.currentTarget).text();
    var num = parseInt(gradeString);
    
    var $input = $("<input type='text'>").addClass('grade-input').val(num);
    this.modelNumber = $(event.currentTarget).data('id');
    $(".grade-number[data-id=".concat(this.modelNumber,"]")).html($input)
  },

  saveGrade: function (event) {
    var editedGrade = this.model
    var newGrade = parseInt($('input.grade-input').val());

    if (isNaN(newGrade)) {
      this.showErrors(["Grade must be a whole number"]) //refactor method, probably use backbone validator
      return
    }
    
    
    editedGrade.save(
      {score: newGrade},
      {error: this.gradeSaveErrorCallback}
    );
  },

  gradeSaveErrorCallback: function (model, resp) {
    var errorArray = resp.responseJSON
    this.showErrors(errorArray)
  },
  
  submitFile: function (event) { 
    event.preventDefault();
    
    var file = $(event.target).find("input.grade-submission-fileinput")[0].files[0];
    var that = this;
    var reader = new FileReader();
    
    reader.onloadend = function () {
      that.model._submission = reader.result;
      that.model.save({},{
        success: that.submitFileSuccess,
        error: that.gradeSaveErrorCallback,
      })
    };
    
    if (file) {
      reader.readAsDataURL(file);
      //jquery something here about uploading file...and disable submit button
    } else {
      delete that.model._submission;
    }
    
  },
  
  submitFileSuccess: function () {
    console.log('success')
  },
  
  showErrors: function (errorArray) {
    var $errorList = $("<ul>").addClass('errors');
    _.each(errorArray, function (error) {
      var $error = $("<li>").text(error).addClass('error');
      $errorList.append($error);
    })

    $("section.grade-errors").html($errorList);
  }
})