
Ext.define('App.controller.setup.CategoryMaster', {
	extend: 'Ext.app.Controller',
	views:[
		'setup.categoryMaster.Index',
		'setup.categoryMaster.Form'

	],
	stores:[
		'setup.CategoryMaster'
	],
	init: function() {

	    this.control({
	    	'categoryMasterIndex button[action=Add]':{
	    		click: this.add
	    	},
	    	'categoryMasterIndex button[action=Edit]':{
	    		click: this.edit
	    	},
	    	'categoryMasterForm button[action=Save]':{
	    		click: this.save
	    	},
	    	'categoryMasterForm button[action=Cancel]':{
	    		click: this.cancel
	    	},
	    	'categoryMasterIndex combo[name=searchBy]' : {
	    		change: this.advanceSearch
	    	},
	    	'categoryMasterIndex textfield[name=string]' : {
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
		var conatiner = btn.up('categoryMasterIndex');
		var grid = conatiner.down('grid[name=index]');
		conatiner.setActiveItem(grid);
	},
	edit:function(btn){
		var rec = Util.getRecord(btn,"Please select record for edit ");
		if (rec) {
			var conatiner = btn.up('categoryMasterIndex');
			var form = conatiner.down('categoryMasterForm');
			form.getForm().loadRecord(rec);
			conatiner.setActiveItem(form);
		};

	},
	add:function(btn){
		var conatiner = btn.up('categoryMasterIndex');
		var form = conatiner.down('categoryMasterForm');
		form.getForm().reset();
		conatiner.setActiveItem(form);

	},

	save :function(btn){
		var store = this.getSetupCategoryMasterStore();
		var me = this ;
		Util.saveForm(btn,store,'setup.CategoryMaster', me);



	},



})
