
Ext.define('App.view.roomTransaction.roomMonitor.CancelCheckInForm', {
    extend:'Ext.window.Window',
    alias:'widget.cancelCheckinForm' ,
    bodyPadding:20 ,
    border:true,
    title:'Cancel Checkin Form',
    modal:true ,
    buttons:[

        {
            text:'Cancel Checkin',
            iconCls:'icon-cancel',
            action:'Save'
        },{
            text:'Close',
            action:'Cancel',
            iconCls:'icon-close'
        }
    ],

    items:[
        {
            xtype:'form',
            layout:{
                type:'table',
                columns:1
            },
            defaults:{
                width:350,
                style:'margin-left:5px',
            },
            items:[
                // {
                //     xtype: 'combo',
                //     name: 'room_no',
                //     store: 'combo.RoomList',
                //     valueField: 'id',
                //     displayField: 'room_no',
                //     triggerAction: 'all',
                //     allowBlank: false,
                //     editable: false,
                //     // disabled:true,
                //     fieldLabel: 'Room No'+redStar
                // },
                {
                    xtype: 'hiddenfield',
                    name: 'room_no'
                },

                {
                    xtype: 'textfield',
                    name: 'check_in_code',
                    allowBlank: false,
                    readOnly:true,
                    fieldLabel: 'Check In Code'+redStar
                },{
                    xtype: 'datefield',
                    name: 'check_in_date',
                    allowBlank: false,
                    readOnly:true,
                    fieldLabel: 'Check In Date'+redStar
                },
                {
                    xtype: 'textarea',
                    name: 'reason',
                    allowBlank: true,
                    fieldLabel: 'Reason'+redStar
                }

            ]
        }

    ]




});
