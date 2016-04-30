Ext.define('App.view.roomTransaction.roomMonitor.Index', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.drawTableIndex',
    title: "Room Monitor",
    bodyPadding: 10,
    border: true,

    // layout: 'fit',
    initComponent: function() {
        Ext.apply(this, {
            items: [
                // this.getFileIndex()
                this.getHeader(),
                this.getFooter(),
            ],
        });
        this.callParent(arguments);
    },

    getHeader: function() {
        test = {
            xtype: 'container',
            style: 'margin-top:5px;text-align:left;border:1px solid blue',
            width: '100%',
            height: 100,
            defaults: {
                width: '98%',
                style: 'margin-left:10px'
            },
            layout: {
                type: 'table',
                columns: 2
            },
            items: [{
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Status',
                    defaultType: 'radiofield',
                    defaults: {
                        flex: 1,
                        style: 'margin-left:20px'
                    },
                    layout: 'hbox',
                    items: [{
                        boxLabel: 'All',
                        name: 'sex',
                        inputValue: 'M',
                        checked: true
                    }, {
                        boxLabel: 'FREE',
                        name: 'sex',
                        inputValue: 'F',

                    }, {
                        boxLabel: 'RESERVED',
                        name: 'sex',
                        inputValue: 'F',

                    }, {
                        boxLabel: 'OCCUPIED',
                        name: 'sex',
                        inputValue: 'F',

                    }, {
                        boxLabel: 'LATE CHECK IN',
                        name: 'sex',
                        inputValue: 'F',

                    }]
                }

            ]

        }
        return test
    },

    getFooter: function() {
        footer = {
            xtype: 'container',
            style: 'margin-top:5px;text-align:left;border:1px solid blue',
            width: '100%',
            height: 100,
            defaults: {
                width: '98%',
                style: 'margin-left:10px'
            },
            layout: {
                type: 'table',
                columns: 2
            },
            items: [{
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Status',
                    defaultType: 'radiofield',
                    defaults: {
                        flex: 1,
                        style: 'margin-left:20px'
                    },
                    layout: 'hbox',
                    items: [{
                        boxLabel: 'All',
                        name: 'sex',
                        inputValue: 'M',
                        checked: true
                    }, {
                        boxLabel: 'FREE',
                        name: 'sex',
                        inputValue: 'F',

                    }, {
                        boxLabel: 'RESERVED',
                        name: 'sex',
                        inputValue: 'F',

                    }, {
                        boxLabel: 'OCCUPIED',
                        name: 'sex',
                        inputValue: 'F',

                    }, {
                        boxLabel: 'LATE CHECK IN',
                        name: 'sex',
                        inputValue: 'F',

                    }]
                }

            ]

        }
        return footer
    },
    buttons: [

         {
            xtype: 'label',
            style: 'font-size:15px;color:gray',
            text: 'Status Color',
        },{
            xtype: 'label',
            style: 'font-size:15px;color:gray',
            text: 'Free',
        },{

            xtype: 'label',
            style: 'font-size:15px;color:gray',
            text: '',
    
        },'-',{

            xtype: 'label',
            style: 'font-size:15px;color:gray',
            text: 'Reserved',
    
        },{

            xtype: 'label',
            style: 'font-size:15px;color:gray',
            text: '',
    
        },{

            xtype: 'label',
            style: 'font-size:15px;color:gray',
            text: 'Occupied',
    
        },{

            xtype: 'label',
            style: 'font-size:15px;color:gray',
            text: '',
    
        },{

            xtype: 'label',
            style: 'font-size:15px;color:gray',
            text: 'Late Check In',
    
        },{

            xtype: 'label',
            style: 'font-size:15px;color:gray',
            text: '',
    
        }, '->', {
            xtype: 'button',
            text: '<b>Print<b>',
            iconCls: 'icon-printer',
            action: 'Print',
            hidden: true
        }
    ]



});