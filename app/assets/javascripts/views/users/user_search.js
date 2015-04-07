MerlinsBoard.Views.UsersSearch = MerlinsBoard.Views.CompositeView.extend({
  initialize: function (options) {
    this.searchCollectionView = options["collectionView"];//pass in constructor function
    this.course = options["course"]; //maybe just pass a ref to the course itself
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

		this.collection.fetch({data: $.param({query: queryUser})});
		var searchList = new this.searchCollectionView({collection:this.collection, course: this.course});
    //refactor this to be just a rerender with a new collection..
		$('section.student-results').html(searchList.render().$el);
    debugger
  }

});
