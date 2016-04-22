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
                this.getForm(),
                this.singleForm(),
                this.hourForm(),
                this.monthlyForm()

            ]
        });
        this.callParent(arguments);
    },

    getForm: function() {

        searchreturn = {
            xtype: 'form',
            style: 'margin:0px auto;text-align:left;',
            width: '100%',
            items: [{
              
                layout: {
                    type: 'table',
                    columns: 2
                },
                defaults: {
                    width: '98%',
                    style: 'margin-left:10px'
                },
                items: [
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Name',
                        name: 'name'
                    }, {
                        xtype: 'checkbox',
                        fieldLabel: 'Inclue VAT?',
                        name: 'is_include_tax',
                        checkValue:1
                    }, {
                        xtype: 'numberfield',
                        fieldLabel: 'Code',
                        name:'code'
                    },

                ]
            }],
        }
        return searchreturn

    },
    singleForm: function() {
        singleForm = {
            xtype: 'form',
            style: 'margin:0px auto;text-align:left;',
            width: '100%',
            items: [{
                xtype: 'fieldset',
                title: 'Single Charge',
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
                        fieldLabel: 'Tariff',
                        name: 'tariff',
                        allowNegative: false,
                        hideTrigger: true,
                        maxLength: 20,
                        allowBlank: false,
                    }, {
                        xtype: 'numberfield',
                        fieldLabel: 'Rent for Single',
                        name:'rent_for_single',
                        allowNegative: false,
                        hideTrigger: true,
                        maxLength: 20,
                        allowBlank: false,
                    }, {
                        xtype: 'numberfield',
                        fieldLabel: 'Tax',
                        name:'tax',
                        allowNegative: false,
                        hideTrigger: true,
                        maxLength: 20,
                        allowBlank: false,
                    },
                    {
                        xtype: 'numberfield',
                        fieldLabel: 'Tax for Single',
                        name: 'tax_for_single',
                        allowNegative: false,
                        hideTrigger: true,
                        maxLength: 20,
                        allowBlank: false,
                    },
                    {
                        xtype: 'numberfield',
                        fieldLabel: 'Number of Person',
                        name: 'number_of_person',
                        allowNegative: false,
                        hideTrigger: true,
                        maxLength: 20,
                        allowBlank: false,
                    },

                ]
            }],
        }
        return singleForm
    },
    hourForm: function() {
        hourForm = {
            xtype: 'form',
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
                        fieldLabel: 'Tariff Hour',
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
                        allowBlank: false,
                    }, {
                        xtype: 'numberfield',
                        fieldLabel: 'Tax Hour',
                        name: 'tax_hour',
                        allowNegative: false,
                        hideTrigger: true,
                        maxLength: 20,
                        allowBlank: false,
                    },
                    {
                        xtype: 'numberfield',
                        fieldLabel: 'Tax for Single Hour',
                        name: 'tax_for_single_hour',
                        allowNegative: false,
                        hideTrigger: true,
                        maxLength: 20,
                        allowBlank: false,
                    },
                    {
                        xtype: 'numberfield',
                        fieldLabel: 'Extra Person Charge Hour',
                        name: 'extra_person_charge_hour',
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
            xtype: 'form',
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
                        fieldLabel: 'Tariff Monthly',
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
                        allowBlank: false,
                    }, {
                        xtype: 'numberfield',
                        fieldLabel: 'Tax Month',
                        name:'tax_month',
                        allowNegative: false,
                        hideTrigger: true,
                        maxLength: 20,
                        allowBlank: false,
                    },
                    {
                        xtype: 'numberfield',
                        fieldLabel: 'Tax for Single Month',
                        name: 'tax_for_single_month',
                        allowNegative: false,
                        hideTrigger: true,
                        maxLength: 20,
                        allowBlank: false,
                    },
                    {
                        xtype: 'numberfield',
                        fieldLabel: 'Extra Person Charge Month',
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