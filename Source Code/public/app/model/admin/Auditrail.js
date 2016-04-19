Ext.define('App.model.admin.Auditrail', {
    extend: 'Ext.data.Model',
    fields: [    
    	{name : 'id', type:'int'},
		{name : 'ad_type' , type:'string'},
		{name : 'module' , type:'string'},
		{name : 'description' , type:'string'},	
		{name : 'created_at' , type:'date'},
		{name : 'updated_at' , type:'date'}

		
    ]
    
});