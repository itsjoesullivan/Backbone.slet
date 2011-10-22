describe('getLocal', function() {
	
	it("returns 'query' property from 'local' attribute of model", function() {
		var test = new Slet();
		var local = {};
		local.testProperty = 'testProperty';
		test.set({'local':local});
		expect(test.getLocal('testProperty')).toEqual('testProperty');
	});
	
});

describe('glet', function() {
	
	it("same as getLocal", function() {
		var test = new Slet();
		var local = {};
		local.testProperty = 'testProperty';
		test.set({'local':local});
		expect(test.glet('testProperty')).toEqual('testProperty');
	});
	
});

describe('setLocal', function() {
	
	it("sets 'localObject' as a property of 'local' attribute of model", function() {
		var test = new Slet();
		var testProperty = 'testProperty';
		test.setLocal({'testProperty':testProperty});
		var local = test.get('local');
		expect(local.testProperty).toEqual('testProperty');
	});
	
	it("No problem with previous local attributes", function() {
		var local = {};
		local.testProperty = 'testProperty';
		var test = new Slet({'local':local});
		var oldLocal = test.get('local');
		expect(oldLocal.testProperty).toEqual('testProperty');
		test.slet({'anotherProperty':'anotherProperty'});
		expect(test.glet('testProperty')).toEqual('testProperty');	
	});
	
	it("Overrides previous local attributes", function() {
		var local = {};
		local.testProperty = 'testProperty';
		var test = new Slet({'local':local});
		var oldLocal = test.get('local');
		expect(oldLocal.testProperty).toEqual('testProperty');
		test.slet({'testProperty':'newProperty'});
		expect(test.glet('testProperty')).toEqual('newProperty');	
	});
	
});

describe('slet', function() {
	
	it("same as setLocal", function() {
		var test = new Slet();
		var testProperty = 'testProperty';
		test.slet({'testProperty':testProperty});
		var local = test.get('local');
		expect(local.testProperty).toEqual('testProperty');
	});
	
});

//test sync function

var testSync = function(method,model,options) {
	if(typeof(model.get('local'))!=='undefined') {
		options.error(false);
	} else if(options){
		var result = {result:true};
	    options.success(result);
    }
};

describe('testSync (defined in test.js)', function() {
	it('returns false when a model is saved with a local object', function() {
		var TestModel = Backbone.Model.extend({
			sync : testSync
		});
		var local = {};
		local.testProperty = 'testProperty';
		testModelFail = new TestModel({'local':local});
		testModelFail.save({},{success: function() {
			expect(1).toEqual(0);
			},error: function(model,noLocal){
				expect(noLocal).toBeFalsy();
			}
		});		
	});
	
	it('returns true when a model is saved without a local object', function() {
		var TestModel = Backbone.Model.extend({
			sync : testSync	
		});
		testModelFail = new TestModel();
		testModelFail.save({}, {success: function(model, noLocal) {
			expect(noLocal.result).toBeTruthy();
		}, error: function() {
			expect(0).toEqual(1);
		}});
	});
});

describe('save()', function() {

	it('will not pass a "local" variable to sync', function() {
		var TestSlet = Slet.extend({
			sync: testSync
		});
		var local = {};
		local.testProperty = 'testProperty';
		var test = new TestSlet({'local':local});
		test.save({}, {success: function(model,noLocal) {
			expect(noLocal).toBeTruthy();
		},error: function(model,noLocal) {
			expect(0).toEqual(1);
		}});
	});
	
	it('model returned retains local', function() {
		var TestSlet = Slet.extend({
			sync: testSync
		});
		var local = {};
		local.testProperty = 'testProperty';
		var test = new TestSlet({'local':local});
		test.save({}, {success: function(model,noLocal) {
			var local = model.get('local');
			expect(local.testProperty).toEqual('testProperty');
		},error: function(model,noLocal) {
			expect(0).toEqual(1);
		}});	
	});
});