
Ext.define('App.controller.reports.Auditrail', {
	extend: 'Ext.app.Controller',
	views:[
		'reports.auditrail.Index',

	],	
	stores:[
		'reports.Auditrail',
		'combo.User'
	],
	init: function() {
		
	    this.control({
	    	'auditrailIndex datefield[name=from_date]':{
	    		change: this.get_auditrail_from_date
	    	},
	    	'auditrailIndex datefield[name=to_date]':{
	    		change: this.get_auditrail_to_date
	    	},
	    	'auditrailIndex button[action=print]':{
	    		click: this.get_print_data
	    	},
	    });
	},

	get_auditrail_from_date: function(field){
		// debugger;
		grid = field.up('grid');
		to_date = Ext.Date.format(grid.down('datefield[name=to_date]').getValue(),'Y-m-d');
		user_id = grid.down('combo[name=user]').getValue();
		from_date = Ext.Date.format(field.getValue(),'Y-m-d');
		
		this.getReportsAuditrailStore().load({
				params: {
					from_date: from_date,
					to_date: to_date,
					user_id: user_id,
				}
		});
	}, 

	get_auditrail_to_date: function(field){
		grid = field.up('grid');
		to_date = Ext.Date.format(field.getValue(),'Y-m-d');
		from_date = Ext.Date.format(grid.down('datefield[name=from_date]').getValue(),'Y-m-d');
		user_id = grid.down('combo[name=user]').getValue();
		
		this.getReportsAuditrailStore().load({
				params: {
					from_date: from_date,
					to_date: to_date,
					user_id: user_id,
				}
		});
	},

	get_print_data: function(btn){
		grid = btn.up('grid');
		from_date = Ext.Date.format(grid.down('datefield[name=from_date]').getValue(),'Y-m-d');
		to_date = Ext.Date.format(grid.down('datefield[name=to_date]').getValue(),'Y-m-d');
		user_id = grid.down('combo[name=user]').getValue();

		window.open("Reports/auditTrail_Report.pdf?from_date=" + from_date +"&to_date=" + to_date+"&user_id=" + user_id);
	}




})