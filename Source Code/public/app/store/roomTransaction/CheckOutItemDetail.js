Ext.define('App.store.roomTransaction.CheckOutItemDetail', {
    extend: 'Ext.data.Store',
//    queryMode: 'local',
    autoLoad:false,
    isControllerLoad:false , 
    model: 'App.model.roomTransaction.CheckOutItemDetail',
     proxy: {
        		type: 'rest',
        		url:'/check_in_detail',
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
