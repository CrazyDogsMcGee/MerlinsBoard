MerlinsBoard.Views.CompositeView = Backbone.View.extend({
  subviews: function (selector) {
    this._subviews = this._subviews || {};
    
    if (!selector) {
      return this._subviews //return entire object
    } else {
      return this._subviews[selector];
    }
  },
  
  attachSubview: function (selector, subview) {
    this.$(selector).append(subview.$el); //looks or selector in view's native $el
    
    if (subview.attachSubviews) {
      subview.attachSubviews(); //for subviews that are composite views
    }
  },
  
  addSubview: function (selector, subview) {
    this.subviews(selector).push(subview);
    
    this.attachSubview(selector, subview.render());
  },
  
  attachSubviews: function () {
    var view = this;
    _(this.subviews()).each(function (subviews, selector) { //javascript does (value, key) instead of (key,value) like in ruby
      view.$(selector).empty(); 
      _(subviews).each(function (subview) { //subviews array value
        view.attachSubview(selector, subview);
      });
    });
  },
  
  remove: function () {
    Backbone.View.prototype.remove.call(this); //remove events/DOM on parent subview
    _(this.subviews()).each(function (subviews, selector) { //iterate over that views subview arrays for each selector
      _(subviews).each(function (subview) { 
        subview.remove() //for each view in the array, remove it from the DOM and remove events
      })
    });
  },
  
  removeSubview: function (selector, subview) {
    subview.remove(); //removes subview and children
    
    var subviews = this.subviews(selector); //finds ref to subview objects in parent composite view
    subviews.splice(subviews.indexOf(selector), 1)//cuts out selector-view array key-value pair from object
  },
  
  clearSubviews: function () {
    this._subviews = {}
  }
})