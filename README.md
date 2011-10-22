#Backbone.Slet
Get and set attributes of [Backbone.js](http://documentcloud.github.com/backbone/) models that won't persist upon save()

##Use

	instead of set() use setLocal(), alias slet()
	
	instead of get() use getLocal(), alias glet()

	var demo = Slet.extend();
	var testVal = 'hello';
	demo.set({'testVal':testVal});
	var testValLocal = 'hiya';
	demo.setLocal({'testValLocal':testValLocal});
	demo.save();
	// saves a model like { 'testVal' : 'hello' }
	
	

##How come?
For all the convenience of persisting Backbone models, sometimes an attribute is useful to the client but not the server:

- A model knows the client has hidden it, but the server doesn't need to.
- Multiple clients are sharing the same model (say, [Node.js & &yet are helping out](http://andyet.net/blog/2011/feb/15/re-using-backbonejs-models-on-the-server-with-node/)) but need their own copy of certain attributes.