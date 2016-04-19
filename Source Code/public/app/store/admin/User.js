Ext.define('App.store.admin.User', {
    extend: 'Ext.data.Store',
//    queryMode: 'local', 
    autoLoad:false,
    model: 'App.model.admin.User',
     proxy: {    			
        		type: 'rest',
        		url:'/sys_users',        		       
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