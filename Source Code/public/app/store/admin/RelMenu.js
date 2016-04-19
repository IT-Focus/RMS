Ext.define('App.store.admin.RelMenu', {
    extend: 'Ext.data.Store',
//    queryMode: 'local',
    autoLoad:false,
    controllerLoad:false,
    groupField: 'parent_name',
    model: 'App.model.admin.SysMenu',
     proxy: {
        		type: 'rest',
        		url:'/Role/get_menu_list',
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
