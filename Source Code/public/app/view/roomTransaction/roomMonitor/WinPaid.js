Ext.define('App.view.roomTransaction.roomMonitor.WinPaid', {
    extend: 'Ext.window.Window',
    alias: 'widget.winPaid',
    bodyPadding: 20,
    border: true,
    autoScroll: true,
    width:800,
    modal:true ,
    title: 'Paid Booking',
    items:{
        xtype:'form', 
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
            },/*{
                xtype:'combo',
                name:'payment_method_id', 
                fieldLabel:'Payment Method',  
                emptyText:'Select Payment Method'
            },*/
            {
                xtype: 'numberfield',
                name: 'total_paid',
                readOnly: false,
                allowBlank:false , 
                // minValue: 0 , 
                colspan: 2,
                // maxValue: 1000000 , 
                fieldLabel: 'Amount'
            },
             {
                xtype: 'textarea',
                name: 'remark',
                fieldLabel: 'Remark',
                colspan: 2,
                style: 'margin-top:10px',
                readOnly: false
            }, 

        ],
    },
    buttons: [{
        xtype: "button",
        iconCls: 'icon-cancel',
        action: 'Cancel',
        text: 'Cancel'
    }, {
        xtype: "button",
        action: 'Save',
        iconCls: 'icon-save',
        text: 'Paid'
    }, ]



});