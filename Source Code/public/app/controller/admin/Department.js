
Ext.define('App.controller.admin.Department', {
	extend: 'Ext.app.Controller',
	views:[
		'admin.department.Index',
		'admin.department.Form'

	],
	stores:[
		'admin.Department'
	],
	init: function() {

	    this.control({
	    	'departmentIndex button[action=Add]':{
	    		click: this.add
	    	},
	    	'departmentIndex button[action=Edit]':{
	    		click: this.edit
	    	},
	    	'departmentForm button[action=Save]':{
	    		click: this.save
	    	},
	    	'departmentForm button[action=Cancel]':{
	    		click: this.cancel
	    	},

	    });
	},

	edit:function(btn){
		var rec = Util.getRecord(btn,"Please select record for edit ");
		if (rec) {
			var win = Ext.create("App.view.admin.department.Form");
			win.show();
			win.center();
			win.down('form').getForm().loadRecord(rec);
			win.down('textfield[name=name]').focus(true , 300 );
		};

	},
	add:function(btn){
		var win = Ext.create("App.view.admin.department.Form");
		win.show();
		win.center();
		win.down('textfield[name=name]').focus(true , 300 );

	},

	save :function(btn){
		var store = this.getAdminDepartmentStore();
		var me = this ;
		Util.save(btn,store,'admin.Department');


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
