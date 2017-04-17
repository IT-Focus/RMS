Ext.define('App.view.roomTransaction.customer.Form', {
    extend: 'Ext.form.Panel',
    alias: 'widget.CustomerForm',
    // bodyPadding:20 ,
    // border: true,
    autoScroll: true,
    layout: {
        type: 'table',
        columns: 2
    },
    buttons: [{
        text: 'Save',
        iconCls: 'icon-save',
        action: 'Save'
    }, {
        text: 'Cancel',
        action: 'cancel',
        iconCls: 'icon-cancel'
    }],

    initComponent: function() {

        var me = this;
        Ext.apply(me, {
            items: [

                me.customerInfoForm(),
                // me.rentDetailForm(),
                me.AttachmentForm(),
                // me.getGrid(),
                // me.totalForm(),
            ]
        });
        me.callParent(arguments);
    },


    customerInfoForm: function() {
        form = {
            xtype: 'fieldset',
            title: 'Customer Info',
            autoWidth: true,
            // height:'100%',
            colspan: 2,
            style: "margin-left:10px",
            defaults: {
                // style:'margin:10px',
                allowBlank: false,
                width: '98%',
                style: 'margin-left:10px'
            },
            items: [{
                xtype: 'textfield',
                fieldLabel: 'Customer',
                name: 'customer_name',
                allowBlank: false
            }, {
                xtype: 'combo',
                name: 'national_id',
                store: 'combo.Nationality',
                valueField: 'id',
                displayField: 'name',
                triggerAction: 'all',
                editable: true,
                typeAhead: true,
                minChars: 2,
                allowBlank: true,
                queryMode: 'remote',
                fieldLabel: 'Nationality',
                autoWidth: false
            }, {
                xtype: 'textfield',
                fieldLabel: 'City',
                name: 'city',
                allowBlank: true
            }, {
                xtype: 'textfield',
                vtype: 'email',
                name: 'email',
                fieldLabel: 'Email',
                allowBlank: true

            }, {
                xtype: 'textfield',
                fieldLabel: 'Phone',
                name: 'phone',
                allowBlank: true
            }, {
                xtype: 'datefield',
                fieldLabel: 'DOB',
                name: 'dob',
                value: new Date(),
                format: 'Y-m-d',
                submitFormat: 'Y-m-d',
            }, {
                xtype: 'numberfield',
                fieldLabel: 'N.ID',
                name: 'national_no',
                allowBlank: true,
                // labelWidth: '100%',
                // autoWidth: true,
            }, {
                xtype: 'textfield',
                fieldLabel: 'Passport',
                name: 'passport',
                allowBlank: true,
                // autoWidth: true,
            }, {
                xtype: 'textarea',
                fieldLabel: 'Address',
                name: 'address',
                allowBlank: true

            }]
        }
        return form
    },
    AttachmentForm: function() {
        form = {
            xtype: 'fieldset',
            collapsible: true,
            collapsed: true,
            title: 'Attachment',
            colspan: 2,
            layout: {
                type: 'table',
                columns: 2
            },
            style: '  margin-top:2%; border-radius:5px;',
            items: [

                {

                    xtype: 'form',
                    name: 'companyImage',
                    title: 'National ID',
                    style: 'margin-left:50%;',
                    height: '100%',
                    width: '100%',
                    items: [{
                        xtype: 'image',
                        name: 'nID_Image',
                        width: 300,
                        height: 200,
                        style: 'border: 1px solid gray; border-radius:10px',
                    }, {
                        xtype: 'hiddenfield',
                        name: 'national_id_url'
                    }],
                    bbar: [{
                        xtype: 'filefield',
                        name: 'image',
                        width: 50,
                        buttonOnly: true,
                    }, {
                        style: 'margin-left:130px',
                        text: 'Remove',
                        action: 'Remove_nid',
                    }],
                }, {
                    xtype: 'form',
                    height: '100%',
                    width: '100%',
                    name: 'background',
                    title: 'Passport',
                    style: 'margin-left:70%',

                    items: [{
                        xtype: 'image',
                        name: 'BackgroundImage',
                        width: 300,
                        height: 200,
                        style: 'border: 1px solid gray; border-radius:10px',
                    }, {
                        xtype: 'hiddenfield',
                        name: 'passport_url'
                    }],
                    // rowspan: 8,
                    bbar: [{
                        xtype: 'filefield',
                        name: 'image',
                        width: 50,
                        buttonOnly: true,
                    }, '->', {
                        text: 'Remove',
                        action: 'Remove_background',
                    }],
                },

            ],

        }
        return form
    },



});