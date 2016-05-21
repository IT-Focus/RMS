Ext.define('App.view.roomTransaction.checkIn.Form', {
    extend: 'Ext.form.Panel',
    alias: 'widget.CheckinForm',
    // bodyPadding:20 ,
    // border: true,
    layout: {
        type: 'table',
        columns: 2
    },
    buttons: [

        {
            text: 'Save',
            iconCls: 'icon-save',
            action: 'Save'
        }, {
            text: 'Cancel',
            action: 'Cancel',
            iconCls: 'icon-cancel'
        }
    ],

    initComponent: function() {
        Ext.apply(this, {
            items: [
                this.customerInfoForm(),
                this.rentDetailForm()
            ]
        });
        this.callParent(arguments);
    },


    customerInfoForm: function() {
        form = {
            xtype: 'fieldset',
            title: 'Customer Info',
            autoWidth: true,
            style: "margin-left:10px",
            defaults: {
                // style:'margin:10px',
                allowBlank: false,
                width: '98%',
                style: 'margin-left:10px'
            },
            items: [{

                xtype: 'fieldcontainer',
                fieldLabel: 'Check in Time',
                layout: 'hbox',
                items: [{
                    xtype: 'datefield',
                    name: 'check_in_date',
                    value: new Date(),
                    format: 'Y-m-d',
                    submitFormat: 'Y-m-d',
                }, {
                    xtype: 'timefield',
                    name: 'check_in_time',
                    minValue: '6:00 AM',
                    maxValue: '00:00 PM',
                    increment: 30,
                    anchor: '100%',
                    value: '',
                    format: "H:i",
                    value: new Date(),
                    itemId: 'start_time_formated',
                    renderer: Ext.util.Format.dateRenderer('H:i'),

                }]
            }, {
                xtype: 'fieldcontainer',
                fieldLabel: 'Es.Check Out',
                layout: 'hbox',
                items: [{
                    xtype: 'datefield',
                    name: 'check_in_date',
                    value: new Date(),
                    format: 'Y-m-d',
                    submitFormat: 'Y-m-d',
                }, {
                    xtype: 'timefield',
                    name: 'check_in_time',
                    minValue: '6:00 AM',
                    maxValue: '00:00 PM',
                    increment: 30,
                    anchor: '100%',
                    value: '',
                    format: "H:i",
                    value: new Date(),
                    itemId: 'start_time_formated',
                    renderer: Ext.util.Format.dateRenderer('H:i'),

                }]
            }, {
                xtype: 'textfield',
                fieldLabel: 'Customer',
                name: 'customer_name'
            }, {
                xtype: 'textarea',
                fieldLabel: 'Address',
                name: 'address',
                allowBlank: true

            }, {
                xtype: 'textfield',
                fieldLabel: 'City',
                name: 'city'
            }, {
                xtype: 'textfield',
                vtype: 'email',
                name: 'email',
                fieldLabel: 'Email',
                allowBlank: true

            }, {
                xtype: 'textfield',
                fieldLabel: 'Phone',
                name: 'phone'
            }, {
                xtype: 'datefield',
                fieldLabel: 'DOB',
                name: 'check_in_date',
                value: new Date(),
                format: 'Y-m-d',
                submitFormat: 'Y-m-d',
            }, {
                xtype: 'numberfield',
                fieldLabel: 'N.ID',
                name: 'national_id'
            }]
        }
        return form
    },

    rentDetailForm: function() {
        form = {
            xtype: 'fieldset',
            title: 'Retal Detail',
            autoWidth: true,
            style: "margin-left:10px; margin-right:10px",
            defaults: {
                // style:'margin:10px',
                allowBlank: false,
                width: '98%',
                style: 'margin-left:10px'
            },
            items: [{
                xtype: 'fieldcontainer',
                fieldLabel: 'Retal Type',
                defaultType: 'radiofield',
                defaults: {
                    flex: 1
                },
                layout: 'hbox',
                items: [{
                    boxLabel: 'Day',
                    name: 'sex',
                    inputValue: '',
                    checked: true
                }, {
                    boxLabel: 'Hour',
                    name: '',
                    inputValue: 'F',

                }]
            }, {
                xtype: 'fieldcontainer',
                fieldLabel: 'NO.of Persons',
                defaultType: 'radiofield',
                defaults: {
                    flex: 1
                },
                layout: {
                    type: 'table',
                    columns: 3
                },
                items: [{
                    xtype: 'numberfield',
                    name: 'last_name'
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Adult',
                    name: ''

                },{
                    xtype: 'numberfield',
                    fieldLabel: 'Child',
                    name: ''

                },{
                    xtype: 'numberfield',
                    fieldLabel: 'Male',
                    colSpan:2,
                    name: ''

                },{
                    xtype: 'numberfield',
                    fieldLabel: 'Female',
                    name: ''

                }]
            }, {
                xtype: 'textfield',
                fieldLabel: 'Last Name',
                name: 'last_name'
            }, {
                xtype: 'textfield',
                vtype: 'email',
                name: 'email',
                fieldLabel: 'Email',
                allowBlank: true

            }, {
                xtype: 'textfield',
                fieldLabel: 'Phone',
                name: 'phone'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Address',
                name: 'address',
                allowBlank: true

            }, {
                xtype: 'textfield',
                name: 'username',
                fieldLabel: 'User Name'
            }, {
                xtype: 'textfield',
                name: 'password',
                inputType: 'password',
                fieldLabel: 'Password'
            }, {
                xtype: 'fieldcontainer',
                fieldLabel: 'Status',
                defaultType: 'radiofield',
                defaults: {
                    flex: 1
                },
                layout: 'hbox',
                items: [{
                    boxLabel: 'Active',
                    style: 'color:blue',
                    name: 'is_active',
                    inputValue: 1,
                    checked: true
                }, {
                    boxLabel: 'Deactive',
                    style: 'color:red',

                    name: 'is_active',
                    inputValue: 0,

                }]
            }, ]
        }
        return form
    },

    itemGrid: function() {

    },
    totalForm: function() {

    },



});