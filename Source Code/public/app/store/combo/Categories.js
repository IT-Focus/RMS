Ext.define('App.store.combo.Categories', {
    extend: 'Ext.data.Store',
//    queryMode: 'local',
    autoLoad:false,
    model: 'App.model.setup.CategoryMaster',
     proxy: {
        		type: 'rest',
        		url:'/CategoryMaster/get_category',
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
