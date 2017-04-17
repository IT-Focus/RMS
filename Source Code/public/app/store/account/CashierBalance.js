Ext.define('App.store.account.CashierBalance', {
    extend: 'Ext.data.Store',
//    queryMode: 'local',
    autoLoad:false,
    model: 'App.model.account.CashierBalance',
     proxy: {
        		type: 'rest',
        		url:'/cashier_balances',
		        reader: {
		            type: 'json',
		            root: 'data',
		            successProperty: 'success', 
		            messageProperty:'message'
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
