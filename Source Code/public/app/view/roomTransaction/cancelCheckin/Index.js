Ext.define('App.view.roomTransaction.cancelCheckin.Index', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.cancelCheckinIndex',
    // bodyPadding: 10,
    // border: true,
    layout: 'card',
    initComponent: function() {
        Ext.apply(this, {
            items: [{
                xtype: 'grid',
                border: true,
                name: 'index',
                store: 'roomTransaction.CancelCheckin',
                title: 'Cancel Check In',
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
                        iconCls: 'icon-cancel',
                        text: 'Cancel Check In',
                        tooltip: 'Cancel Check In'
                    }
                ],
                columns: [{
                    header: 'NO',
                    xtype: 'rownumberer',
                    width: 50,
                    align: 'center'
                }, {
                    header: 'Room No',
                    dataIndex: 'room_no',
                    autoWidth: true,
                    flex: 1
                }, {
                    header: 'Check In Code',
                    dataIndex: 'check_in_code',
                    autoWidth: true,
                    flex: 1,
                    
                }, {
                    header: 'Check In Date',
                    dataIndex: 'check_in_date',
                    autoWidth: true,
                    flex: 1,
                    // renderer: function(value) {
                    //     var date = Ext.Date.parse(value, 'U');

                    //     return Ext.Date.format(date, 'd/m/Y');
                    // }
                }, {
                    header: 'Reason',
                    dataIndex: 'reason',
                    autoWidth: true,
                    flex: 1
                }, {
                    header: 'Cancel Date',
                    dataIndex: 'cancel_date',
                    autoWidth: true,
                    flex: 1,
                    // renderer: function(value) {
                    //     var date = Ext.Date.parse(value, 'U');

                    //     return Ext.Date.format(date, 'd/m/Y');
                    // }
                }, {
                    header: 'Cancelled By',
                    dataIndex: 'username',
                    autoWidth: true,
                    flex: 1
                }],
                bbar: Ext.create('Ext.PagingToolbar', {
                    store: 'roomTransaction.CancelCheckin',
                    displayInfo: true,
                    displayMsg: 'view {0} - {1} of {2}',
                    emptyMsg: "view 0"
                })

            }, ]
        });
        this.callParent(arguments);
    },



});