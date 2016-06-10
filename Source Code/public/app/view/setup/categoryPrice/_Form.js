Ext.define('App.view.setup.categoryPrice.Form', {
    extend: 'Ext.window.Window',
    alias: 'widget.categoryPriceForm',
    bodyPadding: 20,
    border: true,
    title: 'Category Price Form',
    modal: true,
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

    items: [{
            xtype: 'form',
            layout: {
                type: 'table',
                columns: 2
            },
            defaults: {
                width: 350,
                autoWidth:true,
                style: 'margin-left:5px',
            },
            items: [{
                    xtype: 'textfield',
                    name: 'name',
                    allowBlank: false,
                    labelWidth:'100%',
                    fieldLabel: 'Name' + redStar
                }, {
                    xtype: 'combo',
                    name: 'category_id',
                    store: 'combo.Categories',
                    valueField: 'id',
                    displayField: 'name',
                    triggerAction: 'all',
                    allowBlank: false,
                    editable: false,
                    labelWidth:'100%',
                    fieldLabel: 'Category' + redStar
                        // labelAlign: 'right',
                }, {
                    xtype: 'numberfield',
                    name: 'charge_amount',
                    allowBlank: false,
                    labelWidth:'100%',
                    fieldLabel: 'Charge Amount' + redStar,
                    minValue:1
                }, {
                    xtype: 'timefield',
                    name: 'duration_time',
                    labelWidth:'100%',
                    fieldLabel: 'Duration Time' + redStar,
                    minValue: '6:00 AM',
                    maxValue: '00:00 PM',
                    increment: 30,
                    anchor: '100%',
                    autoWidth: true,
                    value: '',
                    format: "H:i",
                    value: new Date(),
                    itemId: '1',
                    renderer: Ext.util.Format.dateRenderer('H:i'),
                }, {
                    xtype: 'timefield',
                    name: 'allow_late',
                    labelWidth:'100%',
                    fieldLabel: 'Allow Late' + redStar,
                    minValue: '6:00 AM',
                    maxValue: '00:00 PM',
                    increment: 30,
                    anchor: '100%',
                    autoWidth: true,
                    value: '',
                    format: "H:i",
                    value: new Date(),
                    itemId: '2',
                    renderer: Ext.util.Format.dateRenderer('H:i'),
                }, {
                    xtype: 'timefield',
                    name: 'exd',
                    labelWidth:'100%',
                    fieldLabel: 'End Extra Duration' + redStar,
                    minValue: '6:00 AM',
                    maxValue: '00:00 PM',
                    increment: 30,
                    anchor: '100%',
                    autoWidth: true,
                    value: '',
                    format: "H:i",
                    value: new Date(),
                    itemId: '3',
                    renderer: Ext.util.Format.dateRenderer('H:i'),
                }, {
                    xtype: 'numberfield',
                    name: 'duration_day',
                    labelWidth:'100%',
                    allowBlank: false,
                    fieldLabel: 'Duration Day' + redStar,
                    minValue:1
                }, {
                    xtype: 'numberfield',
                    name: 'extra_charge',
                    labelWidth:'100%',
                    allowBlank: false,
                    fieldLabel: 'Extra Charge' + redStar,
                    minValue:1
                }, {
                    xtype: 'numberfield',
                    name: 'seq_no',
                    labelWidth:'100%',
                    allowBlank: false,
                    fieldLabel: 'Seq No' + redStar,
                    minValue:1
                }, {
                    xtype: 'textarea',
                    name: 'remark',
                    labelWidth:'100%',
                    allowBlank: true,
                    fieldLabel: 'Remark'
                },{
                    xtype: 'fieldcontainer',
                    fieldLabel: 'STATUS',
                    defaultType: 'radiofield',
                    defaults: {
                        autoWidth:true,
                        flex: 1
                    },
                    layout: 'hbox',
                    items: [{
                        boxLabel: 'Active',
                        style: 'color:blue',
                        labelStyle: 'font-weight:bold;',
                        name: 'is_active',
                        inputValue: 1,
                        checked: true
                    }, {
                        boxLabel: 'Deactive',
                        style: 'color:red',
                        labelStyle: 'font-weight:bold;',
                        name: 'is_active',
                        inputValue: 0,

                    }]
                }, {
                    xtype: 'checkbox',
                    fieldLabel: 'Inclue VAT?',
                    name: 'is_include_tax',
                    labelWidth:'100%',
                    checkedValue: 1
                },

            ]
        }

    ]



});