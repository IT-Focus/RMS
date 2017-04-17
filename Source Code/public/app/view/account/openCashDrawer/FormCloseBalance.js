Ext.define('App.view.account.openCashDrawer.FormCloseBalance', {
    extend: 'Ext.window.Window',
    alias: 'widget.FormCloseBalance',
    bodyPadding: 20,
    border: true,
    title: 'Close Balance',
    modal: true,
    buttons: [
        {
            text: 'Cancel',
            action: 'Cancel',
            iconCls: 'icon-cancel'
        },

        {
            text: 'Close Balance',
            iconCls: 'icon-save',
            action: 'CloseBalance'
        },
    ],

    items: [{
            xtype: 'form',            
            defaults: {
                // width: 350,
                style: 'margin-left:5px',
            },
            items: [
            {
                xtype:'fieldset',
                defaultType:'numberfield',
                title:'Cashier Information',
                defaults:{
                    readOnly:true , 
                    labelAlign:'right',
                    labelWidth:140
                },
                layout:{
                    type:'table',
                    columns : 2 ,

                } ,
                items:[
                    {
                        xtype:'hiddenfield',
                        name:'id'
                    },
                    {
                        fieldLabel:'Shift',
                        xtype:'textfield',
                        name:'shift'
                    },{
                        fieldLabel:'Opening Date',
                        xtype:'textfield',
                        
                        name:'cashier_opened_date'
                    },{
                        xtype:'textfield',
                        fieldLabel:'Cashier',
                        name:'cashier_name'
                    },{
                        fieldLabel:'Close Date',
                        xtype:'textfield',                            
                        name:'closed_date'
                    }
                ]

            } ,{
                xtype:'fieldset',
                defaultType:'numberfield',
                title:'Cashier Balance',
                defaults:{
                    readOnly:true ,
                    labelAlign:'right',
                    labelWidth:140

                },
                layout:{
                    type:'table',
                    columns : 2 , 
                } ,
                items:[
                    {
                        fieldLabel:'Sale Amount',
                        name:'sale_amount'
                    },{
                        fieldLabel:'Opening Amount',
                        name:'opening_amount'
                    },{
                        fieldLabel:'Total Amount',
                        name:'total_amount',
                        // style:'margin-left:275px',
                        colspan: 2
                    },{
                        fieldLabel:'Discount Amount',
                        name:'discount_amount'
                    },{
                        fieldLabel:'VAT Amount',
                        name:'vat_amount'
                    },{
                        fieldLabel:'Grand Total Amount',
                        name:'grand_total_amount',
                        labelStyle:'font-wieght:bold',
                        // style:'margin-left:275px',
                        colspan:2
                    },{
                        fieldLabel:'Net Recieve Amount',
                        name:'net_receive_amount'
                    },{
                        fieldLabel:'Total Paid',
                        name:'total_paid'
                    }
                ]

            }

            ]
        }

    ]



});