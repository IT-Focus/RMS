Ext.define('App.store.setup.RoomMaster', {
    extend: 'Ext.data.Store',
//    queryMode: 'local',
    autoLoad:false,
    model: 'App.model.setup.RoomMaster',
     proxy: {
        		type: 'rest',
        		url:'/room_master',
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
