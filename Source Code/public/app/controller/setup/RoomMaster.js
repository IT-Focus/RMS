
Ext.define('App.controller.setup.RoomMaster', {
	extend: 'Ext.app.Controller',
	views:[
		'setup.roomMaster.Index',
		'setup.roomMaster.Form'

	],
	stores:[
	 	'setup.RoomMaster',
		'combo.Categories',
		'combo.Floor',
		'combo.Status'
	],
	init: function() {

	    this.control({
	    	'roomMasterIndex button[action=Add]':{
	    		click: this.add
	    	},
	    	'roomMasterIndex button[action=Edit]':{
	    		click: this.edit
	    	},
	    	'roomMasterForm button[action=Save]':{
	    		click: this.save
	    	},
	    	'roomMasterForm button[action=Cancel]':{
	    		click: this.cancel
	    	},
	    	'roomMasterIndex combo[name=searchBy]' : {
	    		change: this.advanceSearch
	    	},
	    	'roomMasterIndex textfield[name=string]' : {
	    		change: this.advanceSearch
	    	}

	    });
	},
	advanceSearch: function(field){
		var me = this,
			form = field.up('gridpanel'),
			searchBy = form.down('combo[name=searchBy]').getValue(),
			searchString = form.down('textfield[name=string]').getValue()
			store = me.getSetupRoomMasterStore();

			Util.loadStore(store,{searchString:searchString,searchBy:searchBy});
	},
	
	cancel: function(btn) {
		btn.up('window').close();
	},
	edit:function(btn){
		var rec = Util.getRecord(btn,"Please select record for edit ");
		if (rec) {
			var win = Ext.create("App.view.setup.roomMaster.Form");
			win.show();
			win.center();
			win.down('form').getForm().loadRecord(rec);
			win.down('textfield[name=name]').focus(true , 300 );
		};

	},
	add:function(btn){
		var win = Ext.create("App.view.setup.roomMaster.Form");
		win.show();
		win.center();
		win.down('textfield[name=room_no]').focus(true , 300 );

	},

	save :function(btn){
		var store = this.getSetupRoomMasterStore();
		var me = this ;
		Util.save(btn,store,'setup.RoomMaster');


	},
	cancel:function(btn){
		btn.up('window').close();
	},



})