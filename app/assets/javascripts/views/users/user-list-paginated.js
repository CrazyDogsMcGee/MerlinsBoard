MerlinsBoard.Views.UsersIndex = Backbone.View.extend({
  initialize: function () {
    this.CollectionView = options["collectionView"];
  },
  
  template: JST['users/index'],
  
  render: function () {
    var renderedContent = this.template({})
    this.$el.html();
    return this
  },
  
  events: {
    
  },
  
  //dont listen to anything on this view, just pass in the first page of
  //the collection and the events will do the other pages. Only the internal
  //view will render in response to a fetch event. But these external events should fetch upon the collection, causing another render 

});
