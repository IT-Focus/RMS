Ext.define('App.store.combo.User', {
    extend: 'Ext.data.Store',
//    queryMode: 'local',
    autoLoad:true,
    model: 'App.model.admin.User',
     proxy: {
        		type: 'rest',
        		url:'/SysUsers/get_user',
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
