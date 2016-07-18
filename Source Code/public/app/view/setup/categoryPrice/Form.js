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
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Include Tax'+ redStar,
                    defaultType: 'radiofield',
                    defaults: {
                        autoWidth:true,
                        flex: 1
                    },
                    layout: 'hbox',
                    items: [{
                        boxLabel: 'Yes',
                        style: 'color:blue; margin-left:80px',
                        labelStyle: 'font-weight:bold;',
                        name: 'is_include_tax',
                        inputValue: 1,
                        checked: true
                    }, {
                        boxLabel: 'No',
                        style: 'color:red',
                        labelStyle: 'font-weight:bold; margin-left:50px',
                        name: 'is_include_tax',
                        inputValue: 0,

                    }]
                }, {
                    xtype: 'numberfield',
                    name: 'charge_amount',
                    allowBlank: false,
                    labelWidth:'100%',
                    fieldLabel: 'Charge Amount' + redStar,
                    minValue:1
                }, 
                {
                    xtype: 'numberfield',
                    name: 'extra_charge',
                    labelWidth:'100%',
                    allowBlank: false,
                    fieldLabel: 'Extra Charge' + redStar,
                    minValue:1
                }, 
                {
                    xtype: 'numberfield',
                    name: 'duration_day',
                    labelWidth:'100%',
                    allowBlank: false,
                    fieldLabel: 'Duration Day' + redStar,
                    minValue:1
                }, 
                {
                    xtype: 'timefield',
                    name: 'duration_time',
                    labelWidth:'100%',
                    fieldLabel: 'Duration Time' + redStar,
                    minValue: '00:00 AM',
                    maxValue: '00:00 PM',
                    increment: 15,
                    anchor: '100%',
                    autoWidth: true,
                    value: '',
                    format: "H:i",
                    value: new Date(),
                    itemId: '1',
                    renderer: Ext.util.Format.dateRenderer('H:i'),
                }, 
                {
                    xtype: 'timefield',
                    name: 'allow_late',
                    labelWidth:'100%',
                    fieldLabel: 'Allow Late' + redStar,
                    minValue: '00:00 AM',
                    maxValue: '00:00 PM',
                    increment: 15,
                    anchor: '100%',
                    autoWidth: true,
                    value: '',
                    format: "H:i",
                    value: new Date(),
                    itemId: '2',
                    renderer: Ext.util.Format.dateRenderer('H:i'),
                }, 
                {
                    xtype: 'timefield',
                    name: 'exd',
                    labelWidth:'100%',
                    autoWidth: true,
                    fieldLabel: 'End Extra Duration' + redStar,
                    minValue: '00:00 AM',
                    maxValue: '00:00 PM',
                    increment: 15,
                    anchor: '100%',
                    value: '',
                    format: "H:i",
                    value: new Date(),
                    itemId: '3',
                    renderer: Ext.util.Format.dateRenderer('H:i'),
                }, 
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'STATUS' + redStar,
                    defaultType: 'radiofield',
                    defaults: {
                        autoWidth:true,
                        flex: 1
                    },
                    layout: 'hbox',
                    items: [{
                        boxLabel: 'Active',
                        style: 'color:blue; margin-left:80px',
                        labelStyle: 'font-weight:bold;',
                        name: 'is_active',
                        inputValue: 1,
                        checked: true
                    }, {
                        boxLabel: 'Deactive',
                        style: 'color:red',
                        labelStyle: 'font-weight:bold; margin-left:50px',
                        name: 'is_active',
                        inputValue: 0,

                    }]
                }, 
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Charge Method' + redStar,
                    defaultType: 'radiofield',
                    // labelWidth:'100%',
                    // autoWidth: true,
                    defaults: {
                        autoWidth:true,
                        flex: 1
                    },
                    layout: 'hbox',
                    items: [{
                        boxLabel: 'Day',
                        style: 'color:blue; margin-left:80px',
                        labelStyle: 'font-weight:bold;',
                        name: 'is_charge_rate',
                        inputValue: 1,
                        checked: true
                    }, {
                        boxLabel: 'Hour',
                        style: 'color:red',
                        labelStyle: 'font-weight:bold; margin-left:50px',
                        name: 'is_charge_rate',
                        inputValue: 0,

                    }]
                }, 
                {
                    xtype: 'numberfield',
                    name: 'seq_no',
                    labelWidth:'100%',
                    allowBlank: false,
                    fieldLabel: 'Sequence No' + redStar,
                    minValue:1
                }, 

                {
                    xtype: 'textarea',
                    name: 'remark',
                    labelWidth:'100%',
                    allowBlank: true,
                    autoWidth:true,
                    // width:100,
                    colspan:2,
                    fieldLabel: 'Remark'
                },

            ]
        }

    ]



});