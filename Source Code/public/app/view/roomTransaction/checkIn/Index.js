Ext.define('App.view.roomTransaction.checkIn.Index', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.CheckinIndex',
    // bodyPadding: 10,
    border: true,
    layout: 'card',
    initComponent: function() {
        Ext.apply(this, {
            items: [{
                xtype: 'grid',
                border: true,
                name: 'index',
                store: 'roomTransaction.CheckIn',
                title: 'Check In',
                
                tools: [{
                        xtype: 'combo',
                        fieldLabel: '<b>Search By</b>',
                        store: ['Check In Code', 'Room No'],
                        value: 'Check In Code',
                        labelAlign: 'right',
                        name: 'searchBy',
                        editable: false,
                        autoWidth: true,
                        style: 'padding-right:10px'
                    }, {
                        xtype: 'textfield',
                        name: 'string',
                        autoWidth: true,
                    },
                    {
                        xtype: 'button',
                        action: 'Add',
                        iconCls: 'icon-ok',
                        text: 'Check In',
                        tooltip: 'Check In'
                    }
                ],
                columns: [{
                    header: 'NO',
                    xtype: 'rownumberer',
                    width: 50,
                    align: 'center'
                }, {
                    header: 'Check In Code',
                    dataIndex: 'code',
                    autoWidth: true,
                    flex: 1
                },{
                    header: 'Room No',
                    dataIndex: 'room_no',
                    autoWidth: true,
                    flex: 1
                },{
                    header: 'Check In Date',
                    dataIndex: 'check_in_date',
                    autoWidth: true,
                    flex: 1,
                },{
                    header: 'Price Plan',
                    dataIndex: 'price_plan',
                    autoWidth: true,
                    flex: 1
                },{
                    header: 'Status',
                    dataIndex: 'status_name',
                    autoWidth: true,
                    flex: 1
                },{
                    header: 'Created By',
                    dataIndex: 'username',
                    autoWidth: true,
                    flex: 1
                }],
                bbar: Ext.create('Ext.PagingToolbar', {
                    store: 'roomTransaction.CheckIn',
                    displayInfo: true,
                    displayMsg: 'view {0} - {1} of {2}',
                    emptyMsg: "view 0"
                })

            },{
                xtype:"CheckinForm"
            }


         ]
        });
        this.callParent(arguments);
    },



});