Ext.define('App.store.combo.Customer', {
    extend: 'Ext.data.Store',
//    queryMode: 'local',
    autoLoad:true,
    model: 'App.model.roomTransaction.Customer',
     proxy: {
        		type: 'rest',
        		url:'/Customer/get_customer',
		        reader: {
		            type: 'json',
		            root: 'data',
		            successProperty: 'success',
		            messageProperty: 'message'
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
