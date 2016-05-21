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
                // store: 'roomTransaction.CancelCheckin',
                title: 'Check In',
                tools: [

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
                    header: 'Room No',
                    dataIndex: 'room_no',
                    autoWidth: true,
                    flex: 1
                },{
                    header: 'Check In Date',
                    dataIndex: 'check_in_date',
                    autoWidth: true,
                    flex: 1,
                },],
                bbar: Ext.create('Ext.PagingToolbar', {
                    // store: 'roomTransaction.CancelCheckin',
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