
Ext.define('App.view.admin.menuProfile.Form', {
    extend:'Ext.window.Window',
    alias:'widget.menuProfileForm' ,
    bodyPadding:20 ,
    border:true,
    title:'Menu Profile',
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
                    xtype:'textfield',
                    name:'menu',
                    allowBlank:false,
                    fieldLabel:'Menu Profile'+redStar
                },{
                    xtype:'textfield',
                    name:'icon_cls',
                    allowBlank:true,
                    fieldLabel:'Icon Name'+redStar
                },{
                    xtype:"combo", 
                    name:"parent_id", 
                    fieldLabel:"Sub of Menu",
                    store:'combo.MenuProfile',
                    valueField:'id',
                    displayField:"menu"
                },{
                    xtype:'combo',
                    name:'expand', 
                    editable:false,
                    allowBlank:false,
                    fieldLabel:"Expand"+redStar , 
                    store:Ext.create('Ext.data.Store',{
                        fields:[ 'id' , 'name'],
                        data:[
                            { id:1 , name:"YES"},
                            { id:0 , name:"NO"},
                        ]
                    }), 
                    valueField:'id',
                    displayField:'name'
                },{
                    xtype:'combo',
                    name:'is_leaf', 
                    editable:false,
                    allowBlank:false,
                    fieldLabel:"Leaf"+redStar , 
                    store:Ext.create('Ext.data.Store',{
                        fields:[ 'id' , 'name'],
                        data:[
                            { id:1 , name:"YES"},
                            { id:0 , name:"NO"},
                        ]
                    }), 
                    valueField:'id',
                    displayField:'name'
                },{
                    xtype:'combo',
                    name:'is_active', 
                    editable:false,
                    allowBlank:false,
                    fieldLabel:"Status"+redStar , 
                    store:Ext.create('Ext.data.Store',{
                        fields:[ 'id' , 'name'],
                        data:[
                            { id:1 , name:"Active"},
                            { id:0 , name:"Deactive"},
                        ]
                    }), 
                    valueField:'id',
                    displayField:'name'
                },{
                    xtype:'textfield',
                    name:"view_index",
                    fieldLabel:'View Index'+redStar,
                    allowBlank:true ,
                    tooltip:'Name space folder to index file (admin.user)'
                },{
                    xtype:'textfield',
                    name:"controller",
                    fieldLabel:'Controller'+redStar,
                    allowBlank:true ,
                    tooltip:'Name space folder and file (admin.User)'
                },{
                    xtype:'textarea',
                    name:'description',
                    fieldLabel:'Description'
                }

            ]
        }

    ]




});
