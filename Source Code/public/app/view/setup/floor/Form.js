
Ext.define('App.view.setup.floor.Form', {
    extend:'Ext.window.Window',
    alias:'widget.floorForm' ,
    bodyPadding:20 ,
    border:true,
    title:'Floor Form',
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
                    fieldLabel:'Code'
                }, {
                    xtype:'textfield',
                    name:'name',
                    allowBlank:false,
                    fieldLabel:'Name'
                },{
                    xtype:'textarea',
                    name:'description',
                    colspan:2 ,
                    // width: 500,
                    fieldLabel:'Description'
                }

            ]
        }

    ]




});
