MerlinsBoard.Models.UserPassword = Backbone.Model.extend({
  methodToURL: {
    'read': 'api/users',
    'update': 'api/users/:id/change_password'
  },

  sync: function(method, model, options) {
    options = options || {};
    options.url = model.methodToURL[method.toLowerCase()];

    return Backbone.sync.apply(this, arguments);
  }
})