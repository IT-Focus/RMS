Ext.define('App.view.setup.roomMaster.Form', {
    extend: 'Ext.window.Window',
    alias: 'widget.roomMasterForm',
    bodyPadding: 20,
    border: true,
    title: 'Room Master Form',
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
                    xtype: 'textfield',
                    name: 'room_no',
                    allowBlank: false,
                    fieldLabel: 'Room No'
                }, {
                    xtype: 'combo',
                    name: 'name',
                    store: 'combo.Category',
                    valueField: 'id',
                    displayField: 'name',
                    triggerAction: 'all',
                    allowBlank: false,
                    editable: false,
                    fieldLabel: 'Category',
                    // labelAlign: 'right',
                }, {
                    xtype: 'combo',
                    name: 'floor_id',
                    store: 'combo.Floor',
                    valueField: 'id',
                    displayField: 'name',
                    triggerAction: 'all',
                    allowBlank: false,
                    editable: false,
                    fieldLabel: 'Floor',
                    // labelAlign: 'right',
                }, {
                    xtype: 'combo',
                    name: 'status',
                    // store: 'combo.Categories',
                    valueField: 'id',
                    displayField: 'name',
                    triggerAction: 'all',
                    allowBlank: false,
                    editable: false,
                    fieldLabel: 'Status',
                    // labelAlign: 'right',
                }, {
                    xtype: 'textfield',
                    name: 'extn_no',
                    allowBlank: false,
                    fieldLabel: 'Extenstion No'
                }

            ]
        }

    ]



});