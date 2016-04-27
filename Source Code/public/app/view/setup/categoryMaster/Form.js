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
                fieldLabel: 'Person Allowance'+redStar,
                // hideTrigger: true,
                allowNegative: false,
                name: 'no_persons'
            }, ]

        }
        return test
    },
    singleForm: function() {
        test = {
            xtype: 'fieldset',
            title: 'Define Rent Per Day',
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
                fieldLabel: 'Renter Per Day'+redStar,
                name: 'tariff',
                allowNegative: false,
                // hideTrigger: true,
                maxLength: 20,
                allowBlank: false,
            }, {
                xtype: 'numberfield',
                fieldLabel: 'Rent for Single Person',
                name: 'rent_for_single',
                allowNegative: false,
                // hideTrigger: true,
                maxLength: 20,
                allowBlank: false,
            }, {
                xtype: 'numberfield',
                fieldLabel: 'Tax Rate',
                name: 'tax',
                allowNegative: false,
                // hideTrigger: true,
                maxLength: 20,
            }, {
                xtype: 'numberfield',
                fieldLabel: 'Tax Rate for Single',
                name: 'tax_for_single',
                allowNegative: false,
                hideTrigger: true,
                maxLength: 20,
            }, {
                xtype: 'numberfield',
                fieldLabel: 'Extra Person Charge'+redStar,
                name: 'extra_person_charge',
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
                title: 'Define Rent Per Hour',
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
                        fieldLabel: 'Renter Per Hour'+redStar,
                        name: 'tariff_hour',
                        allowNegative: false,
                        // hideTrigger: true,
                        maxLength: 20,
                        allowBlank: false,
                    }, {
                        xtype: 'numberfield',
                        fieldLabel: 'Rent for Single Person',
                        name: 'rent_for_single_hour',
                        allowNegative: false,
                        // hideTrigger: true,
                        maxLength: 20,
                    }, {
                        xtype: 'numberfield',
                        fieldLabel: 'Tax Rate',
                        name: 'tax_hour',
                        allowNegative: false,
                        // hideTrigger: true,
                        maxLength: 20,
                    },
                    {
                        xtype: 'numberfield',
                        fieldLabel: 'Tax Rate For Single',
                        name: 'tax_for_single_hour',
                        allowNegative: false,
                        hideTrigger: true,
                        maxLength: 20,
                    },
                    {
                        xtype: 'numberfield',
                        fieldLabel: 'Extra Person Charge'+redStar,
                        name: '',
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
                title: 'Define Rent Per Month',
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
                        fieldLabel: 'Renter Per Month'+redStar,
                        name: 'tariff_month',
                        allowNegative: false,
                        // hideTrigger: true,
                        maxLength: 20,
                        allowBlank: false,
                    }, {
                        xtype: 'numberfield',
                        fieldLabel: 'Rent for Single Person',
                        name: 'rent_for_single_month',
                        allowNegative: false,
                        // hideTrigger: true,
                        maxLength: 20,
                        
                    }, {
                        xtype: 'numberfield',
                        fieldLabel: 'Tax Rate',
                        name:'tax_month',
                        allowNegative: false,
                        // hideTrigger: true,
                        maxLength: 20,
                        
                    },
                    {
                        xtype: 'numberfield',
                        fieldLabel: 'Tax Rate For Single',
                        name: 'tax_for_single_month',
                        allowNegative: false,
                        // hideTrigger: true,
                        maxLength: 20,
                        
                    },
                    {
                        xtype: 'numberfield',
                        fieldLabel: 'Extra Person Charge'+redStar,
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