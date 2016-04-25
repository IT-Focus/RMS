
Ext.define('App.controller.setup.City', {
	extend: 'Ext.app.Controller',
	views:[
		'setup.city.Index',
		'setup.city.Form'

	],
	stores:[
	'setup.City'
	],
	init: function() {

	    this.control({
	    	'cityIndex button[action=Add]':{
	    		click: this.add
	    	},
	    	'cityIndex button[action=Edit]':{
	    		click: this.edit
	    	},
	    	'cityForm button[action=Save]':{
	    		click: this.save
	    	},
	    	'cityForm button[action=Cancel]':{
	    		click: this.cancel
	    	},
	    	'cityIndex textfield[name=string]' : {
	    		change: this.advanceSearch
	    	}
	    

	    });
	},
	advanceSearch: function(field){
		var me = this,
			form = field.up('gridpanel'),
			searchString = form.down('textfield[name=string]').getValue()
			store = me.getSetupCityStore();

			Util.loadStore(store,{searchString:searchString});
	},
	
	cancel: function(btn) {
		btn.up('window').close();
	},
	edit:function(btn){
		var rec = Util.getRecord(btn,"Please select record for edit ");
		if (rec) {
			var win = Ext.create("App.view.setup.city.Form");
			win.show();
			win.center();
			win.down('form').getForm().loadRecord(rec);
			win.down('textfield[name=city]').focus(true , 300 );
		};

	},
	add:function(btn){
		var win = Ext.create("App.view.setup.city.Form");
		win.show();
		win.center();
		win.down('textfield[name=city]').focus(true , 300 );

	},

	save :function(btn){
		var store = this.getSetupCityStore();
		var me = this ;
		Util.save(btn,store,'setup.City');


	},
	cancel:function(btn){
		btn.up('window').close();
	},



})
