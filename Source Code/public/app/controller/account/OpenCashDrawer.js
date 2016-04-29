
Ext.define('App.controller.account.OpenCashDrawer', {
	extend: 'Ext.app.Controller',
	views:[
		'account.openCashDrawer.Index',
		'account.openCashDrawer.Form'

	],
	stores:[
	'account.CashierBalance',
	'combo.Cashier'
	],
	init: function() {

	    this.control({
	    	'openCashDrawerIndex button[action=Open]':{
	    		click: this.open_cash_drawer
	    	},
	    	'cashierForm button[action=Save]':{
	    		click: this.save
	    	},
	    	'cashierForm button[action=Cancel]':{
	    		click: this.cancel
	    	},
	    	'openCashDrawerIndex textfield[name=string]' : {
	    		change: this.advanceSearch
	    	},
	    	'cashierForm combo[name=cashier_id]': {
	    		change: this.filterOpenAmount
	    	}
	    

	    });
	},

	filterOpenAmount: function(field) {
		
		
		value = field.getValue()
		Util.ajax('Cashiers/get_openAmount',{cashier_id:value},this.loadRecordToTextfield,field)
	},
	loadRecordToTextfield: function(obj, field){
		win = field.up('window')
		win.down("textfield[name=open_balance]").setValue(obj.open_balance);
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
	open_cash_drawer:function(btn){
		var me = this;
		Util.ajax("/CashierBalances/open_cash_drawer" , {} , me.checkOpenCashDrawer, me )

	},

	checkOpenCashDrawer: function(obj,me){
		if(obj.success == true){
			var win = Ext.create("App.view.account.openCashDrawer.Form");
			win.show();
			win.center();
		}else{
			alert("false")
		}	
	},

	save :function(btn){
		var store = this.getAccountCashierBalanceStore();
		var me = this ;
		Util.save(btn,store,'account.CashierBalance');


	},
	cancel:function(btn){
		btn.up('window').close();
	},



})
