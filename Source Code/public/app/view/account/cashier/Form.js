Ext.define('App.view.account.cashier.Form', {
    extend: 'Ext.window.Window',
    alias: 'widget.cashierForm',
    bodyPadding: 20,
    border: true,
    title: 'Cashier Form',
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
                columns: 1
            },
            defaults: {
                width: 350,
                style: 'margin-left:5px',
            },
            items: [{
                    xtype: 'combo',
                    name: 'user_id',
                    store: 'combo.User',
                    valueField: 'id',
                    displayField: 'custom_name',
                    triggerAction: 'all',
                    allowBlank: false,
                    editable: false,
                    fieldLabel: 'User'+redStar
                    // labelAlign: 'right',
                }, {
                    xtype: 'combo',
                    name: 'workshift_id',
                    store: 'combo.Workshift',
                    valueField: 'id',
                    displayField: 'name',
                    triggerAction: 'all',
                    allowBlank: false,
                    editable: false,
                    fieldLabel: 'Workshift'+redStar
                    // labelAlign: 'right',
                }, 
                // {
                //     xtype: 'timefield',
                //     name: 'start_time',
                //     fieldLabel: 'Start Time'+redStar,
                //     minValue: '6:00 AM',
                //     maxValue: '00:00 PM',
                //     increment: 30,
                //     allowBlank:false,
                //     anchor: '100%',
                //     value: '',
                //     format: "H:i",
                //     value: new Date(),
                //     itemId: 'start_time_formated',
                //     renderer: Ext.util.Format.dateRenderer('H:i'),
                // },
                {
                    xtype: 'numberfield',
                    fieldLabel: 'Open Balance',
                    name: 'obda',
                    allowBlank:false,
                },{
                            xtype: 'fieldcontainer',
                            fieldLabel: 'STATUS',
                            defaultType: 'radiofield',
                            defaults: {
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
                        },

            ]
        }

    ]



});