Ext.define('App.view.setup.roomServiceMaster.Index', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.roomServiceMasterIndex',
    // bodyPadding: 10,
    // border: true,
    layout: 'card',
    initComponent: function() {
        Ext.apply(this, {
            items: [{
                xtype: 'grid',
                border: true,
                name: 'index',
                store: 'setup.RoomServiceMaster',
                title: 'Room Service Master Management',
                tools: [{
                        xtype: 'combo',
                        fieldLabel: '<b>Search By</b>',
                        store: ['Code', 'Service Name', 'Abbr'],
                        value: 'Code',
                        labelAlign: 'right',
                        name: 'searchBy',
                        editable: false,
                        style: 'padding-right:10px',
                        autoWidth: true,
                    }, {
                        xtype: 'textfield',
                        name: 'string',
                        autoWidth: true,
                    },

                    {
                        xtype: 'button',
                        action: 'Add',
                        iconCls: 'icon-add',
                        tooltip: 'Add New Room'
                    }, {
                        xtype: 'button',
                        action: 'Edit',
                        style: 'margin-left:5px',
                        iconCls: 'icon-edit',
                        tooltip: 'Edit Room'
                    },
                ],
                columns: [{
                    header: 'NO',
                    xtype: 'rownumberer',
                    width: 50,
                    align: 'center'
                }, {
                    header: 'Code',
                    dataIndex: 'code',
                    locked: true,
                }, {
                    header: 'Service Name',
                    dataIndex: 'service_name',
                    width: 200,
                    flex: 1

                }, {
                    header: 'Abbr',
                    dataIndex: 'abbr',
                    autoWidth: true,
                    flex: 1

                }, {
                    header: 'Charge Amount',
                    dataIndex: 'charge_amount',
                    autoWidth: true,
                    flex: 1
                }],
                bbar: Ext.create('Ext.PagingToolbar', {
                    store: 'setup.RoomServiceMaster',
                    displayInfo: true,
                    displayMsg: 'view {0} - {1} of {2}',
                    emptyMsg: "view 0"
                })

            }, ]
        });
        this.callParent(arguments);
    },



});