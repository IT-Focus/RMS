
Ext.define('App.controller.setup.RoomServiceMaster', {
	extend: 'Ext.app.Controller',
	views:[
		'setup.roomServiceMaster.Index',
		'setup.roomServiceMaster.Form'

	],
	stores:[
		'setup.RoomServiceMaster'
	],
	init: function() {

	    this.control({
	    	'roomServiceMasterIndex button[action=Add]':{
	    		click: this.add
	    	},
	    	'roomServiceMasterIndex button[action=Edit]':{
	    		click: this.edit
	    	},
	    	'roomServiceMasterForm button[action=Save]':{
	    		click: this.save
	    	},
	    	'roomServiceMasterForm button[action=Cancel]':{
	    		click: this.cancel
	    	},
	    	'roomServiceMasterIndex combo[name=searchBy]' : {
	    		change: this.advanceSearch
	    	},
	    	'roomServiceMasterIndex textfield[name=string]' : {
	    		change: this.advanceSearch
	    	}, 
	    	'roomServiceMasterForm checkbox[name=is_include_tax]': {
	    		change: this.showTax
	    	}

	    });
	},
	showTax: function(field, value){
		debugger;
		if (value){

			field.up("form").down("textfield[name=tax]").show();
		}else{
			field.up("form").down("textfield[name=tax]").hide();
		}
	},
	advanceSearch: function(field){
		var me = this,
			form = field.up('gridpanel'),
			searchBy = form.down('combo[name=searchBy]').getValue(),
			searchString = form.down('textfield[name=string]').getValue()
			store = me.getSetupRoomServiceMasterStore();

			Util.loadStore(store,{searchString:searchString,searchBy:searchBy});
	},
	
	cancel: function(btn) {
		btn.up('window').close();
	},
	edit:function(btn){
		var rec = Util.getRecord(btn,"Please select record for edit ");
		if (rec) {
			var win = Ext.create("App.view.setup.roomServiceMaster.Form");
			win.show();
			win.center();
			win.down('form').getForm().loadRecord(rec);
			win.down('textfield[name=service_name]').focus(true , 300 );
		};

	},
	add:function(btn){
		var win = Ext.create("App.view.setup.roomServiceMaster.Form");
		win.show();
		win.center();
		win.down('textfield[name=service_name]').focus(true , 300 );

	},

	save :function(btn){
		var store = this.getSetupRoomServiceMasterStore();
		var me = this ;
		Util.save(btn,store,'setup.RoomServiceMaster');


	},
	cancel:function(btn){
		btn.up('window').close();
	},



})
