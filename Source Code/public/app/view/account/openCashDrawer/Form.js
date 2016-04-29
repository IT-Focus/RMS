Ext.define('App.view.account.openCashDrawer.Form', {
    extend: 'Ext.window.Window',
    alias: 'widget.cashierForm',
    bodyPadding: 20,
    border: true,
    title: 'Open Cash Drawer Form',
    modal: true,
    buttons: [

        {
            text: 'Open Cash Drawer',
            iconCls: 'icon-save',
            action: 'Save'
        }, {
            text: 'Cancel',
            action: 'Cancel',
            iconCls: 'icon-cancel'
        }
    ],

    items: [{
            xtype: 'form',
            layout: {
                type: 'table',
                columns: 1
            },
            defaults: {
                width: 350,
                style: 'margin-left:5px',
            },
            items: [{
                    xtype: 'combo',
                    name: 'cashier_id',
                    store: 'combo.Cashier',
                    valueField: 'id',
                    displayField: 'username',
                    triggerAction: 'all',
                    allowBlank: false,
                    // disabled:true,
                    editable: false,
                    fieldLabel: 'Cashier'+redStar
                    // labelAlign: 'right',
                }, {
                    xtype: 'timefield',
                    name: 'opened_date',
                    fieldLabel: 'Start Time'+redStar,
                    minValue: '6:00 AM',
                    maxValue: '00:00 PM',
                    increment: 30,
                    allowBlank:false,
                    editable:false,
                    disable:true,
                    anchor: '100%',
                    format: "H:i",
                    value: new Date(),
                    itemId: 'start_time_formated',
                    renderer: Ext.util.Format.dateRenderer('H:i'),
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Open Balance'+redStar,
                    name: 'open_balance',
                    allowBlank:false,
                    editable:false,
                },
            ]
        }

    ]



});