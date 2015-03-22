MerlinsBoard.Views.UsersSearch = MerlinsBoard.Views.CompositeView.extend({
  initialize: function (options) {
    this.searchCollectionView = options["collectionView"]; //pass in constructor function
  },
  
  searchCollection: function () {
    if (!this._searchCollection) {
      this._searchCollection = new MerlinsBoard.Collections.UsersSearch();
    }
    
    return this._searchCollection
  },
  
  template: JST["users/user-search"],
  
  events: {
    "submit form.student-find":"userSearch"
  },
  
  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    return this
  },
                                                      
  userSearch: function (event) {
    event.preventDefault();
	  var queryUser = $("input.user-find-input").val();
		this.searchCollection().fetch({data: $.param({query: queryUser})});

		var searchList = new this.searchCollectionView({collection: this.searchCollection()});
		//want to call remove on search results
		$('section.course-results').html(searchList.render().$el);
  }                                      

});
