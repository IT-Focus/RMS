
Ext.define('App.controller.setup.DiscountConfig', {
	extend: 'Ext.app.Controller',
	views:[
		'setup.discountConfig.Index',
		'setup.discountConfig.Form'

	],
	stores:[
	'setup.DiscountConfig'
	],
	init: function() {

	    this.control({
	    	'discountConfigIndex button[action=Add]':{
	    		click: this.add
	    	},
	    	'discountConfigIndex button[action=Edit]':{
	    		click: this.edit
	    	},
	    	'discountConfigIndex button[action=Delete]':{
	    		click: this.delete_recore
	    	},
	    	'discountConfigForm button[action=Save]':{
	    		click: this.save
	    	},
	    	'discountConfigForm button[action=Cancel]':{
	    		click: this.cancel
	    	},
	    	'discountConfigIndex textfield[name=string]' : {
	    		change: this.advanceSearch
	    	}
	    

	    });
	},
	advanceSearch: function(field){
		var me = this,
			form = field.up('gridpanel'),
			searchString = form.down('textfield[name=string]').getValue()
			store = me.getSetupDiscountConfigStore();

			Util.loadStore(store,{searchString:searchString});
	},
	
	cancel: function(btn) {
		btn.up('window').close();
	},
	edit:function(btn){
		var rec = Util.getRecord(btn,"Please select record for edit ");
		if (rec) {
			var win = Ext.create("App.view.setup.discountConfig.Form");
			win.show();
			win.center();
			win.down('form').getForm().loadRecord(rec);
			win.down('textfield[name=code]').focus(true , 300 );
		};

	},
	delete_recore:function(btn){
		var rec = Util.getRecord(btn,"Please select record for edit ");
		if (rec) {
			var store = this.getSetupDiscountConfigStore();
			var grid = btn.up("grid");
			var row = grid.getSelectionModel().getSelection();
			if (row.length) {
				var record = row[0];
				Ext.MessageBox.confirm('Confirm', 'Are you sure you want to Delete ?', function(btn) {
					if (btn == 'yes') {
						store.remove(record);
						Ext.Msg.alert("Deleted", 'Record Has Been Deleted.');
						store.sync();
					}
				});

			} else {
				this.msg("Please Select Record To Delete.");
			}
		};
	},
	add:function(btn){
		var win = Ext.create("App.view.setup.discountConfig.Form");
		win.show();
		win.center();
		win.down('textfield[name=code]').focus(true , 300 );

	},

	save :function(btn){
		var store = this.getSetupDiscountConfigStore();
		var me = this ;
		Util.save(btn,store,'setup.DiscountConfig');


	},
	cancel:function(btn){
		btn.up('window').close();
	},



})
