
Ext.define('App.view.admin.user.Form', {
    extend:'Ext.form.Panel',
    alias:'widget.userForm' ,	       
    bodyPadding:20 ,
    border:true,
    tbar:[
        '->',
        '<font style="font-weight: bold;color: gray;font-size: 25px;" > User Form </font>'
        ,'->',
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

   layout:{
        type:'table',
        columns:2
   },
    defaults:{
        style:'margin:10px',
        allowBlank:false,
        width:400, 
    },
    items:[
        {
            xtype:'textfield',
            fieldLabel:'Fist Name',
            name:'first_name'
        },{
            xtype:'textfield',
            fieldLabel:'Last Name',
            name:'last_name'
        },{
            xtype      : 'fieldcontainer',
            fieldLabel : 'Sex',
            defaultType: 'radiofield',
            defaults: {
                flex: 1
            },
            layout: 'hbox',
            items: [
                {
                    boxLabel  : 'Male',
                    name      : 'sex',
                    inputValue: 'M',
                    checked    : true
                }, {
                    boxLabel  : 'Female',
                    name      : 'sex',
                    inputValue: 'F',
                
                }
            ]
        },{
            xtype: 'textfield',
            vtype:'email',
            name:'email',
            fieldLabel:'email',            
        },{
            xtype:'textfield',
            fieldLabel:'Phone',
            name:'phone'
        },{
            xtype:'textfield',
            fieldLabel:'Address',
            name:'address',

        },{
            xtype:'textfield',
            name:'username',
            fieldLabel:'User Name'
        },{
            xtype:'textfield',
            name:'password',
            inputType:'password',
            fieldLabel:'password'
        },{
            xtype      : 'fieldcontainer',
            fieldLabel : 'Status',
            defaultType: 'radiofield',
            defaults: {
                flex: 1
            },
            layout: 'hbox',
            items: [
                {
                    boxLabel  : 'Active',
                    style:'color:blue',
                    name      : 'is_active',
                    inputValue: 1,
                    checked    : true
                }, {
                    boxLabel  : 'Deactive',
                    style:'color:red',

                    name      : 'is_active',
                    inputValue: 0,
                
                }
            ]
        },
    ]



});