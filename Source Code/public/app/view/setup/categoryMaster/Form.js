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
                this.monthlyForm(),
                this.getGrid()



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
                fieldLabel: 'Name' + redStar,
                name: 'name'
            }, {
                xtype: 'checkbox',
                fieldLabel: 'Inclue VAT?',
                name: 'is_include_tax',
                checkedValue: 1
            }, {
                xtype: 'numberfield',
                fieldLabel: 'Person Allowance' + redStar,
                // hideTrigger: true,
                allowNegative: false,
                name: 'no_persons'
            }],

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
                fieldLabel: 'Renter Per Day' + redStar,
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
                fieldLabel: 'Extra Person Charge' + redStar,
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
                        fieldLabel: 'Renter Per Hour' + redStar,
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
                    }, {
                        xtype: 'numberfield',
                        fieldLabel: 'Tax Rate For Single',
                        name: 'tax_for_single_hour',
                        allowNegative: false,
                        hideTrigger: true,
                        maxLength: 20,
                    }, {
                        xtype: 'numberfield',
                        fieldLabel: 'Extra Person Charge' + redStar,
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
                        fieldLabel: 'Renter Per Month' + redStar,
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
                        name: 'tax_month',
                        allowNegative: false,
                        // hideTrigger: true,
                        maxLength: 20,

                    }, {
                        xtype: 'numberfield',
                        fieldLabel: 'Tax Rate For Single',
                        name: 'tax_for_single_month',
                        allowNegative: false,
                        // hideTrigger: true,
                        maxLength: 20,

                    }, {
                        xtype: 'numberfield',
                        fieldLabel: 'Extra Person Charge' + redStar,
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
    getGrid: function() {
        grid = {
            xtype: 'grid',
            border: true,
            name: 'category_grid',
            store: 'setup.CategoryPrice',
            title: 'Category Price Management',

            tools: [

                {
                    xtype: 'button',
                    action: 'Add_category_price',
                    iconCls: 'icon-add',
                    tooltip: 'Add New Category Price'
                }, {
                    xtype: 'button',
                    action: 'Edit_Category_Price',
                    style: 'margin-left:5px',
                    iconCls: 'icon-edit',
                    tooltip: 'Edit Category Price'
                }
            ],
            columns: [{
                header: 'NO',
                xtype: 'rownumberer',
                width: 50,
                align: 'center'
            }, {
                header: 'Name',
                dataIndex: 'name',
                autoWidth: true,
            }, {
                header: 'Charge Amount',
                dataIndex: 'charge_amount',
                flex: 1,
                autoWidth: true,
                renderer: function(value) {
                    amount = Number(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + " $";
                    return "<span style='color:black'><b>" + amount + "</b></span>"
                }
            }, {
                header: 'Duration Time',
                dataIndex: 'duration_time',
                autoWidth: true,
                renderer: Ext.util.Format.dateRenderer('H:i'),
                flex: 1,
            }, {
                header: 'Duration Day',
                dataIndex: 'duration_day',
                autoWidth: true,
                flex: 1,
            }, {
                header: 'Allow Late',
                dataIndex: 'allow_late',
                renderer: Ext.util.Format.dateRenderer('H:i'),
                autoWidth: true,
                flex: 1,
            }, {
                header: 'End Extra Duration',
                dataIndex: 'exd',
                renderer: Ext.util.Format.dateRenderer('H:i'),
                autoWidth: true,
                flex: 1,
            }, {
                header: 'Seq No',
                dataIndex: 'Seq_no',
                autoWidth: true,
                flex: 1,
            }, {
                header: 'Status',
                dataIndex: 'is_active',
                autoWidth: true,
                flex: 1,
                renderer: function(val, meta, record) {

                    if (record.data.is_active == 1) {
                        return "<span style='color:green'> " + 'Active' + " </span>"
                    } else {
                        return "<span style='color:red'>" + 'Deactive' + "</span>"

                    };
                }
            }],
            bbar: Ext.create('Ext.PagingToolbar', {
                store: 'setup.CategoryPrice',
                displayInfo: true,
                displayMsg: 'view {0} - {1} of {2}',
                emptyMsg: "view 0"
            })
        }
        return grid
    },


});