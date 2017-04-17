
Ext.define('App.controller.setup.Workshift', {
	extend: 'Ext.app.Controller',
	views:[
		'setup.workshift.Index',
		'setup.workshift.Form'

	],
	stores:[
	'setup.Workshift'
	],
	init: function() {

	    this.control({
	    	'workshiftIndex button[action=Add]':{
	    		click: this.add
	    	},
	    	'workshiftIndex button[action=Edit]':{
	    		click: this.edit
	    	},
	    	'workshiftForm button[action=Save]':{
	    		click: this.check_workshift
	    	},
	    	'workshiftForm button[action=Cancel]':{
	    		click: this.cancel
	    	},
	    	'workshiftIndex textfield[name=string]' : {
	    		change: this.advanceSearch
	    	}
	    

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
			var win = Ext.create("App.view.setup.workshift.Form");
			start_time = Ext.util.Format.dateRenderer('H:i')(rec.data.start_time);
			end_time = Ext.util.Format.dateRenderer('H:i')(rec.data.end_time);
			
			win.show();
			win.center();
			win.down('form').getForm().loadRecord(rec);
			win.down("timefield[name=start_time]").setValue(start_time);
			win.down("timefield[name=end_time]").setValue(end_time);
			win.down('textfield[name=abbr]').focus(true , 300 );
		};

	},
	add:function(btn){
		var win = Ext.create("App.view.setup.workshift.Form");
		win.show();
		win.center();
		win.down('textfield[name=abbr]').focus(true , 300 );

	},

	save :function(obj, params){
		
		if (obj.success == true){

			var store = params.me.getSetupWorkshiftStore();
			Util.save(params.btn,store,'setup.Workshift');

		}else{
			
		}


	},

	check_workshift:function(btn){

		var me = this ;
		var win = btn.up('window'),
			form = win.down('form'),
			values = form.getValues();

			Util.ajax("Workshifts/check_workshift",{abbr:values.abbr, workshift_name:values.name}, me.save , {me:me , btn:btn}  );
		
	
	},
	cancel:function(btn){
		btn.up('window').close();
	},



})
