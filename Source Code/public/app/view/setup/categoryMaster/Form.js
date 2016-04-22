Ext.define('App.view.setup.categoryMaster.Form', {
    extend: 'Ext.form.Panel',
    alias: 'widget.categoryMasterForm',
    bodyPadding: 20,
    border: true,
    title: 'Category Master Form',
    modal: true,
    autoScroll: true,
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
                this.getDetailForm(),
                this.singleForm(),
                this.hourForm(),
                this.monthlyForm()

                

            ]
        });
        this.callParent(arguments);
    },
    getDetailForm: function() {
        test = {
            xtype: 'container',
            style: 'margin:0px auto;text-align:left;',
            width: '100%',
            defaults: {
               width: '98%',
               style: 'margin-left:10px'
            },
            layout: {
                type: 'table',
                columns: 2
            },
            items: [{
                xtype: 'textfield',
                fieldLabel: 'Name'+redStar,
                name: 'name'
            }, {
                xtype: 'checkbox',
                fieldLabel: 'Inclue VAT?',
                name: 'is_include_tax',
                checkedValue: 1
            }, {
                xtype: 'numberfield',
                fieldLabel: 'Code'+redStar,
                hideTrigger: true,
                allowNegative: false,
                name: 'code'
            }, ]

        }
        return test
    },
    singleForm: function() {
        test = {
            xtype: 'fieldset',
            title: 'Sigle Charge',
            padding: 10,
            width: '100%',
            layout: {
                type: 'table',

                columns: 2
            },
            defaults: {
                // style:'margin:10px',
                allowBlank: false,
                width: '98%',
                style: 'margin-left:10px'
            },
            items: [{
                xtype: 'numberfield',
                fieldLabel: 'Tariff'+redStar,
                name: 'tariff',
                allowNegative: false,
                hideTrigger: true,
                maxLength: 20,
                allowBlank: false,
            }, {
                xtype: 'numberfield',
                fieldLabel: 'Rent for Single',
                name: 'rent_for_single',
                allowNegative: false,
                hideTrigger: true,
                maxLength: 20,
                allowBlank: false,
            }, {
                xtype: 'numberfield',
                fieldLabel: 'Tax',
                name: 'tax',
                allowNegative: false,
                hideTrigger: true,
                maxLength: 20,
            }, {
                xtype: 'numberfield',
                fieldLabel: 'Tax for Single',
                name: 'tax_for_single',
                allowNegative: false,
                hideTrigger: true,
                maxLength: 20,
            }, {
                xtype: 'numberfield',
                fieldLabel: 'Number of Person'+redStar,
                name: 'no_persons',
                allowNegative: false,
                hideTrigger: true,
                maxLength: 20,
                allowBlank: false,
            }, ]



        }
        return test
    },
    hourForm: function() {
        hourForm = {
            style: 'margin:0px auto;text-align:left;',
            width: '100%',
            items: [{
                xtype: 'fieldset',
                title: 'Hour Charge',
                padding: 10,
                height: '100%',
                layout: {
                    type: 'table',
                    columns: 2
                },

                defaults: {
                    // style:'margin:10px',
                    width: '98%',
                    style: 'margin-left:10px'
                },
                items: [{
                        xtype: 'numberfield',
                        fieldLabel: 'Tariff Hour'+redStar,
                        name: 'tariff_hour',
                        allowNegative: false,
                        hideTrigger: true,
                        maxLength: 20,
                        allowBlank: false,
                    }, {
                        xtype: 'numberfield',
                        fieldLabel: 'Rent for Single Hour',
                        name: 'rent_for_single_hour',
                        allowNegative: false,
                        hideTrigger: true,
                        maxLength: 20,
                    }, {
                        xtype: 'numberfield',
                        fieldLabel: 'Tax Hour',
                        name: 'tax_hour',
                        allowNegative: false,
                        hideTrigger: true,
                        maxLength: 20,
                    },
                    {
                        xtype: 'numberfield',
                        fieldLabel: 'Tax for Single Hour',
                        name: 'tax_for_single_hour',
                        allowNegative: false,
                        hideTrigger: true,
                        maxLength: 20,
                    },
                    {
                        xtype: 'numberfield',
                        fieldLabel: 'Extra Person Charge Hour'+redStar,
                        name: 'extra_person_charge',
                        allowNegative: false,
                        hideTrigger: true,
                        maxLength: 20,
                        allowBlank: false,
                    },

                ]
            }],
        }
        return hourForm
    },

    monthlyForm: function() {
        hourForm = {

            style: 'margin:0px auto;text-align:left;',
            width: '100%',
            items: [{
                xtype: 'fieldset',
                title: 'Monthly Charge',
                padding: 10,
                height: '100%',
                layout: {
                    type: 'table',
                    columns: 2
                },

                defaults: {
                    // style:'margin:10px',
                    width: '98%',
                    style: 'margin-left:10px'
                },
                items: [{
                        xtype: 'numberfield',
                        fieldLabel: 'Tariff Monthly'+redStar,
                        name: 'tariff_month',
                        allowNegative: false,
                        hideTrigger: true,
                        maxLength: 20,
                        allowBlank: false,
                    }, {
                        xtype: 'numberfield',
                        fieldLabel: 'Rent for Single Month',
                        name: 'rent_for_single_month',
                        allowNegative: false,
                        hideTrigger: true,
                        maxLength: 20,
                        
                    }, {
                        xtype: 'numberfield',
                        fieldLabel: 'Tax Month',
                        name:'tax_month',
                        allowNegative: false,
                        hideTrigger: true,
                        maxLength: 20,
                        
                    },
                    {
                        xtype: 'numberfield',
                        fieldLabel: 'Tax for Single Month',
                        name: 'tax_for_single_month',
                        allowNegative: false,
                        hideTrigger: true,
                        maxLength: 20,
                        
                    },
                    {
                        xtype: 'numberfield',
                        fieldLabel: 'Extra Person Charge Month'+redStar,
                        name: 'extra_person_charge_month',
                        allowNegative: false,
                        hideTrigger: true,
                        maxLength: 20,
                        allowBlank: false,
                    },

                ]
            }],
        }
        return hourForm
    },


});