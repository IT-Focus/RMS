
Ext.define('App.controller.account.Cashier', {
	extend: 'Ext.app.Controller',
	views:[
		'account.cashier.Index',
		'account.cashier.Form'

	],
	stores:[
	'account.Cashier',
	'combo.User',
	'combo.Workshift'
	],
	init: function() {

	    this.control({
	    	'cashierIndex button[action=Add]':{
	    		click: this.add
	    	},
	    	'cashierIndex button[action=Edit]':{
	    		click: this.edit
	    	},
	    	'cashierForm button[action=Save]':{
	    		click: this.save
	    	},
	    	'cashierForm button[action=Cancel]':{
	    		click: this.cancel
	    	},
	    	'cashierIndex textfield[name=string]' : {
	    		change: this.advanceSearch
	    	}
	    

	    });
	},
	advanceSearch: function(field){
		var me = this,
			form = field.up('gridpanel'),
			searchString = form.down('textfield[name=string]').getValue()
			store = me.getAccountCashierStore();

			Util.loadStore(store,{searchString:searchString});
	},
	
	cancel: function(btn) {
		btn.up('window').close();
	},
	edit:function(btn){
		var rec = Util.getRecord(btn,"Please select record for edit ");
		if (rec) {
			if(rec.get('is_active')==false){
				rec.set('is_active',0);
			}
			else{
				rec.set('is_active',1);	
			}
			var win = Ext.create("App.view.account.cashier.Form");
			start_time = Ext.util.Format.dateRenderer('H:i')(rec.data.start_time);
			win.show();
			win.center();
			win.down('form').getForm().loadRecord(rec);
			win.down("timefield[name=start_time]").setValue(start_time);
			win.down('textfield[name=user_id]').focus(true , 300 );
		};

	},
	add:function(btn){
		var win = Ext.create("App.view.account.cashier.Form");
		win.show();
		win.center();
		// win.down('textfield[name=user_id]').focus(true , 300 );

	},

	save :function(btn){
		var store = this.getAccountCashierStore();
		var me = this ;
		Util.save(btn,store,'account.Cashier');


	},
	cancel:function(btn){
		btn.up('window').close();
	},



})
