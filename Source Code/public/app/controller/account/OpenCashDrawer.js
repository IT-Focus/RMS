
Ext.define('App.controller.account.OpenCashDrawer', {
	extend: 'Ext.app.Controller',
	views:[
		'account.openCashDrawer.Index',
		'account.openCashDrawer.Form',
		'account.openCashDrawer.FormCloseBalance'

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
	    	'openCashDrawerIndex button[action=CloseBalance]':{
	    		click: this.showFormCloseBalance
	    	},
	    	'cashierForm button[action=Save]':{
	    		click: this.save
	    	},
	    	'cashierForm button[action=Cancel]':{
	    		click: this.cancel
	    	},
	    	'FormCloseBalance button[action=Cancel]':{
	    		click: this.cancel
	    	},
	    	'FormCloseBalance button[action=CloseBalance]':{
	    		click: this.CloseBalance
	    	},
	    	'openCashDrawerIndex textfield[name=string]' : {
	    		change: this.advanceSearch
	    	},
	    	'cashierForm combo[name=cashier_id]': {
	    		change: this.filterOpenAmount
	    	}
	    

	    });
	},
	CloseBalance:function(btn){
		var win = btn.up('window');
		var form = win.down('form');
		var id  = form.down('hiddenfield[name=id]').getValue();
		var me = this ;
		
		Util.ajax('cashier_balances/save_close_balance' , {id:id } , me.afterSaveCloseBalance , { win: win , me : me, id: id });
		
	},
	afterSaveCloseBalance:function(obj , params ){
		
		params.me.getAccountCashierBalanceStore().load();
		window.open('cashier_balances/print_close_cash_drawer?id=' + params.id);
		params.win.close();
		
	},
	showFormCloseBalance:function(btn){
		var rec = Util.getRecord(btn, "Please select record for close balance ");
		var me = this ; 
		if (rec) {
			var win = Ext.create('App.view.account.openCashDrawer.FormCloseBalance');
			// load record to form 
			Util.ajax("cashier_balances/get_close_balance_info", { id :rec.getId() } , me.loadValueToFormCloseBalance  ,{ win:win});
			win.show();
			win.center();
		}
		
	},
	loadValueToFormCloseBalance:function(data , params){
		console.log(data);
		var win = params.win ;
		// debugger;
		openned_date = Ext.util.Format.dateRenderer('j-M-Y g:i:s A')(data.cashier_opened_date);
		closed_date = Ext.util.Format.dateRenderer('j-M-Y g:i:s A')(data.closed_date); 
		
		win.down('form').getForm().setValues(data);
		win.down('textfield[name=cashier_opened_date]').setValue(openned_date);
		win.down('textfield[name=closed_date]').setValue(closed_date)
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
			if(obj.is_admin!=true){
				win.down("combo[name=cashier_id]").setValue(obj.data.id)
			}
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
