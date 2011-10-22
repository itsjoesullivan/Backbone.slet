#Backbone.Slet
Get and set attributes of [Backbone.js](http://documentcloud.github.com/backbone/) models that won't persist upon save()

##Use

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
	
	

##How come?
For all the convenience of persisting Backbone models, sometimes an attribute is useful to the client but not the server:

- A model knows the client has hidden it, but the server doesn't need to.
- Multiple clients are sharing the same model (say, [Node.js & &yet are helping out](http://andyet.net/blog/2011/feb/15/re-using-backbonejs-models-on-the-server-with-node/)) but need their own copy of certain attributes. This might even be a security concern.