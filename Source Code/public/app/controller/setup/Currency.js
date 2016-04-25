
Ext.define('App.controller.setup.Currency', {
	extend: 'Ext.app.Controller',
	views:[
		'setup.currency.Index',
		'setup.currency.Form'

	],
	stores:[
	'setup.Currency'
	],
	init: function() {

	    this.control({
	    	'currencyIndex button[action=Add]':{
	    		click: this.add
	    	},
	    	'currencyIndex button[action=Edit]':{
	    		click: this.edit
	    	},
	    	'currencyForm button[action=Save]':{
	    		click: this.save
	    	},
	    	'currencyForm button[action=Cancel]':{
	    		click: this.cancel
	    	},
	    	'currencyIndex textfield[name=string]' : {
	    		change: this.advanceSearch
	    	}
	    

	    });
	},
	advanceSearch: function(field){
		var me = this,
			form = field.up('gridpanel'),
			searchString = form.down('textfield[name=string]').getValue()
			store = me.getSetupCurrencyStore();

			Util.loadStore(store,{searchString:searchString});
	},
	
	cancel: function(btn) {
		btn.up('window').close();
	},
	edit:function(btn){
		var rec = Util.getRecord(btn,"Please select record for edit ");
		if (rec) {
			var win = Ext.create("App.view.setup.currency.Form");
			win.show();
			win.center();
			win.down('form').getForm().loadRecord(rec);
			win.down('textfield[name=currency_name]').focus(true , 300 );
		};

	},
	add:function(btn){
		var win = Ext.create("App.view.setup.currency.Form");
		win.show();
		win.center();
		win.down('textfield[name=currency]').focus(true , 300 );

	},

	save :function(btn){
		var store = this.getSetupCurrencyStore();
		var me = this ;
		Util.save(btn,store,'setup.Currency');


	},
	cancel:function(btn){
		btn.up('window').close();
	},



})
