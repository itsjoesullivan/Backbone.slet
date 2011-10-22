#Backbone.Slet
Get and set attributes of [Backbone.js](http://documentcloud.github.com/backbone/) models that won't persist upon save()

##Usage

instead of set():
		
		setLocal(), alias slet()
	
instead of get():

		getLocal(), alias glet()

###Example:

``` javascript
var demo = Slet.extend(); //extended Backbone model
demo.setLocal({'testVal':'hiya'});
demo.save({}, {success: function(model,resp) {
	var fromServer = Slet.extend(resp);
	var stillClient = model;
	fromServer.getLocal('testVal'); //error
	stillClient.getLocal('tesetVal'); //'hiya'
}});
```

##The *local* attribute
Slet just creates a *local* attribute (i.e., model.get('local') ), stores your local properties there, and slips the property out during save(). *local* doesn't reach sync(), but if sync returns its own 'local' property it will be overwritten. Parse that out if you want:

``` javascript
parse: function(resp) {
	if(typeof(resp.local) !== 'undefined') {
		delete resp.local;
	}
	return resp;
}
```

##How come?
For all the convenience of persisting Backbone models, sometimes an attribute is useful to the client but not the server:

- A model knows the client has hidden it, but the server doesn't need to.
- Multiple clients are sharing the same model (say, [Node.js & &yet are helping out](http://andyet.net/blog/2011/feb/15/re-using-backbonejs-models-on-the-server-with-node/)) but need their own copy of certain attributes. This might even be a security concern.

##Test
![backbone.slet test](https://github.com/jrs2ea/backbone.slet/raw/master/test.png)
