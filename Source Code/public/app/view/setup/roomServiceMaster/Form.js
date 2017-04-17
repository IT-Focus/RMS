Ext.define('App.view.setup.roomServiceMaster.Form', {
    extend: 'Ext.window.Window',
    alias: 'widget.roomServiceMasterForm',
    bodyPadding: 20,
    border: true,
    title: 'Room Service Master Form',
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
                height: '100%',
                style: 'margin-left:5px',
            },
            items: [{
                    xtype: 'textfield',
                    name: 'service_name',
                    allowBlank: false,
                    fieldLabel: 'Service Name'+redStar
                }, {
                    xtype: 'textfield',
                    name: 'abbr',
                    allowBlank: false,
                    fieldLabel: "Abbr"+redStar
                },{
                    xtype: 'numberfield',
                    name: 'code',
                    allowBlank: false,
                    fieldLabel: 'Code'+redStar
                }, {
                    xtype: 'checkbox',
                    name: 'is_include_tax',
                    fieldLabel: 'Include tax?',
                }, 
                // {
                //     xtype: 'numberfield',
                //     name: 'tax',
                //     fieldLabel: 'Tax',
                //     visible:false,
                // },
                {
                    xtype: 'numberfield',
                    name: 'charge_amount',
                    fieldLabel: 'Charge Amount'+redStar
                }, ,

            ]
        }

    ]



});