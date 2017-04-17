Ext.define('App.store.reports.Auditrail', {
    extend: 'Ext.data.Store',
    groupField: 'user_name',
//    queryMode: 'local', 
    autoLoad:true,
    model: 'App.model.reports.Auditrail',
     proxy: {    			
        		type: 'rest',
        		url:'/auditrail',        		       
		        reader: {
		            type: 'json',
		            root: 'data',
		            successProperty: 'success'
		        },
		        writer: {
		        	getRecordData: function(record) {		        		
        				return { data: record.data };
        			}
		        },
		        listeners : 
				{
					exception : function(proxy, response, operation) 
					{
						Ext.MessageBox.show(
						{
							title : 'REMOTE EXCEPTION', 
							msg : operation.getError(), 
							icon : Ext.MessageBox.ERROR, 
							buttons : Ext.Msg.OK
						});
					}
				} 
    	}      

});