Ext.define('App.view.roomTransaction.roomMonitor.CheckOutForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.checkOutForm',
    bodyPadding: 20,
    border: true,
    autoScroll: true,
    title: 'Check Out',
    layout: {
        type: 'table',
        columns: 2
    },
    defaultType: 'textfield',
    defaults: {
        width: '99%',
        readOnly: true
    },
    items: [{
            xtype: 'hiddenfield',
            name: 'id'
        }, {
            fieldLabel: "Paid Amount",
            name: 'paid_booking'
        }, {
            fieldLabel: 'Balance',
            name: 'balance'
        },
         {
            xtype: 'textarea',
            name: 'remark',
            fieldLabel: 'Remark',
            colspan: 2,
            style: 'margin-top:10px',
            readOnly: false
        }, {
            xtype: 'numberfield',
            name: 'total_paid',
            readOnly: false,
            colspan: 2,
            width: '49%',
            style: 'margin-left:50%; ',
            fieldLabel: 'Amount'
        }

    ],
    buttons: [{
        xtype: "button",
        iconCls: 'icon-cancel',
        action: 'Cancel',
        text: 'Cancel'
    }, {
        xtype: "button",
        action: 'CheckOut',
        iconCls: 'icon-save',
        text: 'Check Out'
    }, ]



});