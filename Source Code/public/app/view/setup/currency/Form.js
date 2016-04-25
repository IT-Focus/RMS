
Ext.define('App.view.setup.currency.Form', {
    extend:'Ext.window.Window',
    alias:'widget.currencyForm' ,
    bodyPadding:20 ,
    border:true,
    title:'Currency Form',
    modal:true ,
    buttons:[

        {
            text:'Save',
            iconCls:'icon-save',
            action:'Save'
        },{
            text:'Cancel',
            action:'Cancel',
            iconCls:'icon-cancel'
        }
    ],

    items:[
        {
            xtype:'form',
            layout:{
                type:'table',
                columns:1
            },
            defaults:{
                width:350,
                style:'margin-left:5px',
            },
            items:[
                {
                    xtype:'textfield',
                    name:'currency_name',
                    allowBlank:false,
                    fieldLabel:'Currency'+redStar
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Symbol'+redStar,
                    name: 'currencysyb',
                    allowBlank:false
                },{
                    xtype: 'numberfield',
                    fieldLabel: 'Rate'+redStar,
                    name: 'rate',
                    allowBlank:false
                },{
                    xtype: 'numberfield',
                    fieldLabel: 'Exchange Rate'+redStar,
                    name: 'exchange_rate',
                    allowBlank:false
                }

            ]
        }

    ]




});
