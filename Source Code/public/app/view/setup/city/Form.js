
Ext.define('App.view.setup.city.Form', {
    extend:'Ext.window.Window',
    alias:'widget.cityForm' ,
    bodyPadding:20 ,
    border:true,
    title:'City Form',
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
                    name:'city',
                    allowBlank:false,
                    fieldLabel:'City'+redStar
                },

            ]
        }

    ]




});
