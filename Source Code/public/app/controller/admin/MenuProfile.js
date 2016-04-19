
Ext.define('App.controller.admin.MenuProfile', {
	extend: 'Ext.app.Controller',
	views:[
		'admin.department.Index',
		'admin.department.Form'

	],
	stores:[
		'admin.MenuProfile',
		'combo.MenuProfile'
	],
	init: function() {

	    this.control({
	    	'menuProfileIndex button[action=Add]':{
	    		click: this.add
	    	},
	    	'menuProfileIndex button[action=Edit]':{
	    		click: this.edit
	    	},
	    	'menuProfileForm button[action=Save]':{
	    		click: this.save
	    	},
	    	'menuProfileForm button[action=Cancel]':{
	    		click: this.cancel
	    	},

	    });
	},

	edit:function(btn){
		var rec = Util.getRecord(btn,"Please select record for edit ");
		if (rec) {
			var win = Ext.create("App.view.admin.menuProfile.Form");
			win.show();
			win.center();
			win.down('form').getForm().loadRecord(rec);
			win.down('textfield[name=menu]').focus(true , 300 );
		};

	},
	add:function(btn){
		var win = Ext.create("App.view.admin.menuProfile.Form");
		win.show();
		win.center();
		win.down('textfield[name=menu]').focus(true , 300 );

	},

	save :function(btn){
		var store = this.getAdminMenuProfileStore();
		var me = this ;
		Util.save(btn,store,'admin.MenuProfile');


	},
	cancel:function(btn){
		btn.up('window').close();
	},
	delete: function(rec , grid ){
		var store = grid.getStore();
		 Ext.MessageBox.confirm('Confirm', 'Are you sure to Delete this record?',
		 	function(btn ){

		 		if (btn == 'yes') {
		 			store.remove(rec);
		 			store.sync();
		 		};
		 	});

	},




})
