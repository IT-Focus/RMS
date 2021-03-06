Ext.define('App.view.roomTransaction.checkin.GetRoomForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.getRoomForm',
    id:'loginwindow',
    bodyPadding: 20,
    border: true,
    title: 'Select Rooms',
    modal: true,
    buttons: [

        {
            text: 'Continues Checkin',
            iconCls: 'icon-add',
            action: 'go_check_in'
        }, {
            text: 'Close',
            action: 'Cancel',
            iconCls: 'icon-close'
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
                    name: 'room_no',
                    store: 'combo.AvailableRooms',
                    valueField: 'id',
                    displayField: 'room_no',
                    triggerAction: 'all',
                    allowBlank: false,
                    editable: true,
                    typeAhead: true,
                    minChars: 2,
                    queryMode: 'remote',
                    emptyText: '-- Search Available Rooms --',
                    fieldLabel: 'Room No' + redStar,
                    validateOnBlur: false,
                    enableKeyEvents: true,
                },

            ]
        }

    ]



});