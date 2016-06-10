
Ext.define('App.controller.setup.CategoryPrice', {
	extend: 'Ext.app.Controller',
	views:[
		'setup.categoryPrice.Index',
		'setup.categoryPrice.Form'

	],
	stores:[
		'combo.Categories',
		'setup.CategoryPrice'
	],
	init: function() {

	    this.control({
	    	'categoryPriceIndex button[action=Add]':{
	    		click: this.add
	    	},
	    	'categoryPriceIndex button[action=Edit]':{
	    		click: this.edit
	    	},
	    	'categoryPriceForm button[action=Save]':{
	    		click: this.save
	    	},
	    	'categoryPriceForm button[action=Cancel]':{
	    		click: this.cancel
	    	},
	    	'categoryPriceIndex combo[name=searchBy]' : {
	    		change: this.advanceSearch
	    	},
	    	'categoryPriceIndex textfield[name=string]' : {
	    		change: this.advanceSearch
	    	}
	    	
	    

	    });
	},
	advanceSearch: function(field){
		var me = this,
			form = field.up('gridpanel'),
			searchBy = form.down('combo[name=searchBy]').getValue(),
			searchString = form.down('textfield[name=string]').getValue()
			store = me.getSetupCategoryMasterStore();

			Util.loadStore(store,{searchString:searchString,searchBy:searchBy});
	},
	
	cancel: function(btn) {
		// btn.up('window').close();
		var conatiner = btn.up('categoryPriceIndex');
		var grid = conatiner.down('grid[name=index]');
		conatiner.setActiveItem(grid);
	},
	edit:function(btn){
		var rec = Util.getRecord(btn,"Please select record for edit ");
		if (rec) {
			var conatiner = btn.up('categoryPriceIndex');
			var form = conatiner.down('categoryPriceForm');

			allow_late = Ext.util.Format.dateRenderer('H:i')(rec.data.allow_late);
			duration_time = Ext.util.Format.dateRenderer('H:i')(rec.data.duration_time);
			exd = Ext.util.Format.dateRenderer('H:i')(rec.data.exd);
			
			form.getForm().loadRecord(rec);
			form.down("timefield[name=allow_late]").setValue(allow_late);
			form.down("timefield[name=duration_time]").setValue(duration_time);
			form.down("timefield[name=exd]").setValue(exd);
			conatiner.setActiveItem(form);
		};

	},
	add:function(btn){
		// var win = Ext.create("App.view.setup.categoryPrice.Form");
		// win.show();
		// win.center();
		// win.down('textfield[name=name]').focus(true , 300 );

		var conatiner = btn.up('categoryPriceIndex');
		var form = conatiner.down('categoryPriceForm');
		form.getForm().reset();
		conatiner.setActiveItem(form);
	},

	save :function(btn){
		var store = this.getSetupCategoryPriceStore();
		var me = this ;
		// Util.save(btn,store,'setup.CategoryPrice');
		Util.saveForm(btn,store,'setup.CategoryPrice', me);
		cancel(btn);


	},



})
