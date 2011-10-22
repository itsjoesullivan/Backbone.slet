// Wrap an optional error callback with a fallback error event.
var wrapError = function(onError, model, options) {
  return function(resp) {
    if (onError) {
      onError(model, resp, options);
    } else {
      model.trigger('error', model, resp, options);
    }
  };
};

var getLocal = function(query) {
	return this.get('local')[query];
};

var setLocal = function(localObject) {
	var local = this.get('local');
	if(typeof(local)==='undefined') {
		local = {};
	}
	_(local).extend(localObject);
	this.set({'local':local});
};

var Slet = Backbone.Model.extend({
	
	
	getLocal: getLocal,
	
	glet : getLocal,
	
	setLocal: setLocal,
	
	slet : setLocal,

    // From Backbone.js 0.5.3
    save : function(attrs, options) {
      options || (options = {});
      if (attrs && !this.set(attrs, options)) return false;
      var model = this;
      //INSERTION
      var noLocalThis = this.clone();
      if(typeof(noLocalThis.get('local'))!=='undefined') {
        noLocalThis.unset('local');
      }
      //END INSERTION
      var success = options.success;
      options.success = function(resp, status, xhr) {
        if (!model.set(model.parse(resp, xhr), options)) return false;
        if (success) success(model, resp, xhr);
      };
      options.error = wrapError(options.error, model, options);
      var method = this.isNew() ? 'create' : 'update';
      return (this.sync || Backbone.sync).call(this, method, noLocalThis, options);
    }
	
});