
Ext.define('App.view.admin.user.Form', {
    extend:'Ext.form.Panel',
    alias:'widget.userForm' ,
    bodyPadding:20 ,
    border:true,
    buttons:[

        {
            text:'Save',
            iconCls:'icon-save',
            handler:function(btn){
                var ctrl = App.app.getController("admin.User");
                ctrl.saveUserForm(btn);
            }, 
            action:'Save'
        },{
            text:'Cancel',
            action:'Cancel',
            iconCls:'icon-cancel'
        }
    ],

    items:[
         {
            xtype: 'container',
            layout: 'hbox',
            items: [{
                xtype: 'container',
                flex: 1,
                html: '<u>User Form</u>',
                cls: 'title_form'

            }, {
                xtype: 'container',
                width: 350,
                defaults: {
                    labelAlign: 'right',
                    width: 350
                },
                items: [
                // {
                //     xtype: 'textfield',
                //     name: 'code',
                //     emptyText: 'Employee Code',
                //     allowBlank: false,
                //     fieldLabel: 'User Code.<span style="color:red">*</span>',
                // }, 
                {
                    xtype: 'datefield',
                    fieldLabel: 'Join Date<span style="color:red">*</span>',
                    allowBlank: false,
                    emptyText: 'DD-MM-YYYY',
                    name: 'date_join',
                    value: new Date(),
                    format: 'd-m-Y',
                    submitFormat: 'Y-m-d'
                }]
            }]
        },
        {
            xtype:'fieldset',
            title:'User Information',
            padding: 10 ,
            width:'100%',
            layout:{
                type:'table',

                columns:2
           },
            defaults:{
                // style:'margin:10px',
                allowBlank:false,
                width:'98%',
                style:'margin-left:10px'
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
                    fieldLabel:'Email',
                    allowBlank:true

                },{
                    xtype:'textfield',
                    fieldLabel:'Phone',
                    name:'phone',
                    allowBlank:true
                },{
                    xtype:'textfield',
                    fieldLabel:'Address',
                    name:'address',
                    allowBlank:true

                },{
                    xtype:'textfield',
                    name:'username',
                    fieldLabel:'User Name'
                },{
                    xtype:'textfield',
                    name:'password',
                    inputType:'password',
                    fieldLabel:'Password'
                },{
                    xtype:'combo',
                    name:'role_id',
                    valueField:'id',
                    displayField:'name',
                    store:'combo.Role',
                    editable:false,
                    fieldLabel:'Role'
                },{
                    xtype:'combo',
                    name:'department_id',
                    editable:false,
                    store:'combo.Department',
                    valueField:'id',
                    displayField:'name',
                    fieldLabel:'Department'
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

        }

    ]




});
