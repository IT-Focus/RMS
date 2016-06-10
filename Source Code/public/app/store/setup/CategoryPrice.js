Ext.define('App.store.setup.CategoryPrice', {
    extend: 'Ext.data.Store',
//    queryMode: 'local',
    autoLoad:false,
    model: 'App.model.setup.CategoryPrice',
     proxy: {
        		type: 'rest',
        		url:'/category_price',
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
