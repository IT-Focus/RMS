Ext.define('App.view.setup.roomMaster.Index', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.roomMasterIndex',
    // bodyPadding: 10,
    // border: true,
    layout: 'card',
    initComponent: function() {
        Ext.apply(this, {
            items: [{
                xtype: 'grid',
                border: true,
                name: 'index',
                store: 'setup.RoomMaster',
                title: 'Room Master Management',
                tools: [
                    {
                        xtype: 'combo',
                        fieldLabel: '<b>Search By</b>',
                        store: ['Room No', 'Category', 'Floor','Status'],
                        value: 'Room No',
                        labelAlign: 'right',
                        name: 'searchBy',
                        editable: false,
                        style: 'padding-right:10px',
                        autoWidth:true,
                    }, {
                        xtype: 'textfield',
                        name: 'string',
                        autoWidth:true,
                    },

                    {
                        xtype: 'button',
                        action: 'Add',
                        iconCls: 'icon-add',
                        tooltip: 'Add New Room',
                        autoWidth:true,
                    }, {
                        xtype: 'button',
                        action: 'Edit',
                        style: 'margin-left:5px',
                        iconCls: 'icon-edit',
                        tooltip: 'Edit Room',
                        autoWidth:true,
                    }, 
                ],
                columns: [{
                    header: 'NO',
                    xtype: 'rownumberer',
                    width: 50,
                    align: 'center'
                }, {
                    header: 'Room No',
                    dataIndex: 'room_no',
                    locked: true,
                    autoWidth:true,
                }, {
                    header: 'Category',
                    dataIndex: 'category_name',
                    autoWidth:true,
                }, {
                    header: 'Floor',
                    dataIndex: 'floor_name',
                    autoWidth:true,
                    flex: 1
                },{
                    header: 'Status',
                    dataIndex: 'status_name',
                    autoWidth:true,
                    flex: 1
                },{
                    header: 'Extension No',
                    dataIndex: 'extn_no',
                    autoWidth:true,
                    flex: 1
                }],
                bbar: Ext.create('Ext.PagingToolbar', {
                    store: 'setup.RoomMaster',
                    displayInfo: true,
                    displayMsg: 'view {0} - {1} of {2}',
                    emptyMsg: "view 0"
                })

            }, ]
        });
        this.callParent(arguments);
    },



});