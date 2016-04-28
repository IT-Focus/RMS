Ext.define('App.controller.setup.DefaultColor', {
	extend: 'Ext.app.Controller',
	views:[
		'setup.defaultColor.Index',
		'setup.defaultColor.Form',
		'setup.defaultColor.ColorPickerCombo'

	],
	stores:[
	'setup.DefaultColor'
	],
	init: function() {

	    this.control({
	    	'defaultColorIndex button[action=Add]':{
	    		click: this.add
	    	},
	    	'defaultColorIndex button[action=update]':{
	    		click: this.save
	    	},
	    	'defaultColorForm button[action=update]':{
	    		click: this.update
	    	},
	    	'defaultColorForm button[action=Cancel]':{
	    		click: this.cancel
	    	},
	    

	    });
	},


	advanceSearch: function(field){
		var me = this,
			form = field.up('gridpanel'),
			searchString = form.down('textfield[name=string]').getValue()
			store = me.getSetupWorkshiftStore();

			Util.loadStore(store,{searchString:searchString});
	},
	
	cancel: function(btn) {
		btn.up('window').close();
	},
	edit:function(btn){
		var rec = Util.getRecord(btn,"Please select record for edit ");
		if (rec) {
			var win = Ext.create("App.view.setup.defaultColor.Form");
			
			win.down('form').getForm().loadRecord(rec);
			win.down("#reserved").setValue(rec.get("reserved"))
			win.down("#occupied").setValue(rec.get("occupied"))
			win.down("#late_checkout").setValue(rec.get("late_checkout"))
			win.down("#free").setValue(rec.get("free"))
			win.show();
			win.center();
		};

	},
	add:function(btn){
		var win = Ext.create("App.view.setup.defaultColor.Form");
		win.show();
		win.center();
		// win.down('textfield[name=abbr]').focus(true , 300 );

	},

	save :function(btn){
		var store = this.getSetupDefaultColorStore();
		var me = this ;
		// Util.save(btn,store,'setup.DefaultColor');
		Util.saveForm(btn,store,'setup.DefaultColor', me)


	},

	update:function(btn){
		var store = this.getSetupDefaultColorStore();
		var me = this ;
		Util.save(btn,store,'setup.DefaultColor');
	},
	cancel:function(btn){
		btn.up('window').close();
	},



})
