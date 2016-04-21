
Ext.define('App.controller.setup.Floor', {
	extend: 'Ext.app.Controller',
	views:[
		'setup.floor.Index',
		'setup.floor.Form'

	],
	stores:[
	'setup.Floor'
	],
	init: function() {

	    this.control({
	    	'floorIndex button[action=Add]':{
	    		click: this.add
	    	},
	    	'floorIndex button[action=Edit]':{
	    		click: this.edit
	    	},
	    	'floorForm button[action=Save]':{
	    		click: this.save
	    	},
	    	'floorForm button[action=Cancel]':{
	    		click: this.cancel
	    	},
	    	'floorIndex combo[name=searchBy]' : {
	    		change: this.advanceSearch
	    	},
	    	'floorIndex textfield[name=string]' : {
	    		change: this.advanceSearch
	    	}
	    

	    });
	},
	advanceSearch: function(field){
		var me = this,
			form = field.up('gridpanel'),
			searchBy = form.down('combo[name=searchBy]').getValue(),
			searchString = form.down('textfield[name=string]').getValue()
			store = me.getSetupFloorStore();

			Util.loadStore(store,{searchString:searchString,searchBy:searchBy});
	},
	
	cancel: function(btn) {
		btn.up('window').close();
	},
	edit:function(btn){
		var rec = Util.getRecord(btn,"Please select record for edit ");
		if (rec) {
			var win = Ext.create("App.view.setup.floor.Form");
			win.show();
			win.center();
			win.down('form').getForm().loadRecord(rec);
			win.down('textfield[name=name]').focus(true , 300 );
		};

	},
	add:function(btn){
		var win = Ext.create("App.view.setup.floor.Form");
		win.show();
		win.center();
		win.down('textfield[name=code]').focus(true , 300 );

	},

	save :function(btn){
		var store = this.getSetupFloorStore();
		var me = this ;
		Util.save(btn,store,'setup.Floor');


	},
	cancel:function(btn){
		btn.up('window').close();
	},



})
