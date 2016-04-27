Ext.define('App.view.admin.CfgUtilities.NextCodeForm', {
    extend:'Ext.window.Window',
    alias:'widget.nextCodetForm' ,
    bodyPadding:20 ,
    border:true,
    title:'Next Code Form',
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

            defaults:{
                width:350,
                style:'margin-left:5px',
            },
            items:[
                {
                    xtype:'numberfield',
                    name:'module',
                    allowBlank:false,
                    fieldLabel:'Module'+redStar
                },{
                    xtype:'numberfield',
                    name:'cit',
                    allowBlank:false,
                    fieldLabel:'Code Include Tax'+redStar
                },{
                    xtype:'numberfield',
                    name:'cet',
                    allowBlank:false,
                    fieldLabel:'Code Exclude Tax'+redStar
                },{
                    xtype:'textfield',
                    name:'prefix',
                    allowBlank:false,
                    fieldLabel:'Prefix'+redStar
                },{
                    xtype:'textfield',
                    name:'suffix',
                    allowBlank:false,
                    fieldLabel:'Suffix'+redStar
                },{
                    xtype:'numberfield',
                    name:'length',
                    allowBlank:false,
                    fieldLabel:'Length'+redStar
                }

            ]
        }

    ]




});
