
Ext.define('App.view.setup.discountConfig.Form', {
    extend:'Ext.window.Window',
    alias:'widget.discountConfigForm' ,
    bodyPadding:20 ,
    border:true,
    title:'Discount Configuration Form',
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
                    name:'code',
                    allowBlank:false,
                    fieldLabel:'Code'+redStar
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Remark'+redStar,
                    name: 'remark',
                    allowBlank:false
                },

            ]
        }

    ]




});
