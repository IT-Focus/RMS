Ext.define('App.model.reports.Auditrail', {
    extend: 'Ext.data.Model',
    fields: [    
    	{name : 'id', type:'int'},
		{name : 'module_name' , type:'string'},
		{name : 'description' , type:'string'},	
		{name : 'created_by' , type:'string'},
		{name : 'created_at' , type:'date'},
		{name : 'updated_at' , type:'date'},

		{name : 'user_name', type:'string'}


		
    ]
    
});