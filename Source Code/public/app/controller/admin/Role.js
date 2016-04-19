
Ext.define('App.controller.admin.Role', {
	extend: 'Ext.app.Controller',
	views:[
		'admin.role.Index',
		'admin.role.Form',
		'admin.role.WinApplyPermission'

	],
	stores:[
		'admin.Role',
		'combo.Role',
		'combo.Department',
		'admin.RelMenu'
	],
	init: function() {

	    this.control({
	    	'roleIndex button[action=Add]':{
	    		click: this.add
	    	},
	    	'roleIndex button[action=Edit]':{
	    		click: this.edit
	    	},
	    	'roleForm button[action=Save]':{
	    		click: this.save
	    	},
	    	'roleForm button[action=Cancel]':{
	    		click: this.cancel
	    	},
	    	'roleIndex button[action=ApplyPermission]':{
	    		click: this.showFormApplyPermission
	    	},

	    	// == even on apply permission
			'roleWinApplyPermission button[action=Cancel]': {
				click: this.cancel
			},
			"roleWinApplyPermission button[action=Save]": {
				click: this.savePermission
			}

	    });
	},
	getForm: function(dv, record, item, index, e) {
		var win = Ext.create("App.view.admin.role.Form");
			win.show();
			win.center();
			win.down('form').getForm().loadRecord(record);
			win.down('textfield[name=name]').focus(true, 300);
	},

	showFormApplyPermission: function(btn) {
		var rec = Util.getRecord(btn, "Please select role for apply permission")
		if (rec) {

			var win = Ext.create("App.view.admin.role.WinApplyPermission");
			win.show();
			win.center();
			win.down("#role_id").setValue(rec.get("id"));
			var s = this.getAdminRelMenuStore();

			s.load({
				params: {
					role_id: rec.get("id")
				}
			});
		};
	},
	updatePermission: function(column, recordIndex, checked) {
		var s = this.getAdminRelMenuStore();
		var r = s.getAt(recordIndex);
		if (checked) {
			r.set("_destroy" , false )
		} else {
			r.set("_destroy" , true )
		};
	},
	savePermission: function(btn) {
		var win = btn.up("window");
		var roleId = win.down("#role_id").getValue();

		var mainStore = this.getAdminRoleStore();
		var mainRec = mainStore.getById(roleId);

		var relStore = this.getAdminRelMenuStore();
		// filgter store modify and submit to sever
		var newStore = Ext.create("App.store.admin.RelMenu");
		var recModify = relStore.getModifiedRecords();
		for(i in recModify ){
			newStore.add(recModify[i]);
		}
		mainRec.set("rel_menu_role_attributes" , Util.getItemStore(newStore))

		Util.storeSync(mainStore , win)



	},
	cancel: function(btn) {
		btn.up('window').close();
	},
	edit:function(btn){
		var rec = Util.getRecord(btn,"Please select record for edit ");
		if (rec) {
			var win = Ext.create("App.view.admin.role.Form");
			win.show();
			win.center();
			win.down('form').getForm().loadRecord(rec);
			win.down('textfield[name=name]').focus(true , 300 );
		};

	},
	add:function(btn){
		var win = Ext.create("App.view.admin.role.Form");
		win.show();
		win.center();
		win.down('textfield[name=name]').focus(true , 300 );

	},

	save :function(btn){
		var store = this.getAdminRoleStore();
		var me = this ;
		Util.save(btn,store,'admin.Role');


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
