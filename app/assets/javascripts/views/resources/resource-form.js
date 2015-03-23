MerlinsBoard.Views.resourceForm = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model,"sync",this.render);
    _.bindAll(this, 'successCallback','errorCallback');
  },
  
  className:"resource-form",
  
  template: JST["resources/resource-form"],
  
  events: {
    "submit form.resource-form":"saveResource",
    "change input.resource-form-fileinput":"processFile"
  },
  
  render: function () {
    var renderedContent = this.template({resource: this.model});
    this.$el.html(renderedContent);
    return this
  },
                                                   
  saveResource: function (event) {
    event.preventDefault();
    var attrs = $(event.target).serializeJSON();
    
    this.model.save(attrs,{
      success: successCallback,
      error: errorCallback
    })
  },
    
  processFile: function (event) {
    var that = this
    var file = event.currentTarget.files[0];
    var reader = new FileReader();
    
    reader.onloadend = function () {
      that.model._document = reader.result;
    };
    
    if (file) {
      reader.readAsDataURL(file)
    } else {
      delete that.model._document;
    }     
  },
                    
  successCallback: function () {
    
    console.log("resource saved")
  },
      
  errorCallback: function (model,response) {
        var errorArray = response.responseJSON;
        var $errorList = $("<ul>");
        _.each(errorArray, function (error) {
          var $error = $("<li>").text(error);
          $errorList.append($error);
        })
        this.$("section.form-errors").html($errorList)
  }
})