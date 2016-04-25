
Ext.define('App.view.setup.workshift.Form', {
    extend:'Ext.window.Window',
    alias:'widget.workshiftForm' ,
    bodyPadding:10,
    border:true,
    title:'Workshift',
    modal:true ,
    buttons:[

        {
            text:'Save',
            iconCls:'icon-save',
            action:'Save'
        },{
            text:'Cancel',
            action:'Cancel',
            iconCls:'icon-cancel'
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
                {
                    xtype:'textfield',
                    name:'abbr',
                    allowBlank:false,
                    fieldLabel:'Abbr'+redStar
                },
                {
                    xtype:'textfield',
                    name:'name',
                    allowBlank:false,
                    fieldLabel:'Name'+redStar
                },
                {
                    xtype: 'timefield',
                    name: 'start_time',
                    fieldLabel: 'Start Time'+redStar,
                    minValue: '6:00 AM',
                    maxValue: '00:00 PM',
                    increment: 30,
                    allowBlank:false,
                    anchor: '100%',
                    value: '',
                    format: "H:i",
                    value: new Date(),
                    itemId: 'start_time_formated',
                    renderer: Ext.util.Format.dateRenderer('H:i'),
                },
                {
                    xtype: 'timefield',
                    name: 'end_time',
                    fieldLabel: 'End Time'+redStar,
                    minValue: '6:00 AM',
                    maxValue: '00:00 PM',
                    increment: 30,
                    allowBlank:false,
                    anchor: '100%',
                    value: '',
                    format: "H:i",
                    value: new Date(),
                    itemId: 'end_time_formated',
                    renderer: Ext.util.Format.dateRenderer('H:i'),
                },
                {
                    xtype:'textarea',
                    name:'description',
                    fieldLabel:"Description"
                },
                // {
                //     xtype: 'fieldcontainer',
                //     fieldLabel: translate('STATUS'),
                //     rowspan: 2,
                //     defaultType: 'radiofield',
                //     defaults: {
                //         flex: 1
                //     },
                //     layout: 'vbox',
                //     items: [{
                //         boxLabel: translate('Active'),
                //         style: 'color:blue',
                //         labelStyle: 'font-weight:bold;',
                //         name: 'is_active',
                //         inputValue: 1,
                //         checked: true,
                //     }, {
                //         boxLabel: translate('Deactive'),
                //         style: 'color:red',
                //         labelStyle: 'font-weight:bold;',
                //         name: 'is_active',
                //         inputValue: 0,
                //     }]
                // }
            ]
        }

    ]




});
