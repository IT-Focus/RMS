Ext.define('App.view.roomTransaction.roomMonitor.Index', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.roomMonitorIndex',
    title: "Room Monitor",
    bodyPadding: 10,
    border: true,

    // layout: 'fit',
    initComponent: function() {
        var me = this
        var ctrl = App.app.getController("roomTransaction.RoomMonitor");
        ctrl.loadDefaultColor();

        Ext.apply(this, {
            xtype: 'form',
            tbar:[
                {
                    xtype:"label",
                    text:'Floor: '
                }
            ],
            items: [
                // this.getFileIndex()
                // this.getHeader(),
                // this.getFooter(),
            ],
        });
        this.callParent(arguments);
        ctrl.showButtonFloor(me);
        ctrl.addRoomMonitor(me);

        // Util.ajax("default_color", {}, me.loadValueToForm, me)
    },

    loadValueToForm: function(obj, me) {
        if (obj.success) {
            var form = me.up('panel');

            form.down("#reserved").setValue(obj.data.reserved)
            form.down("#occupied").setValue(obj.data.occupied)
            form.down("#late_checkout").setValue(obj.data.late_checkout)
            form.down("#free").setValue(obj.data.free)
        }
    },
    getHeader: function() {
        test = {
            xtype: 'container',
            style: 'margin-top:5px;text-align:left;border:1px solid gray',
            width: '100%',
            height: 100,
            defaults: {
                width: '98%',
                style: 'margin-left:10px'
            },
            layout: {
                type: 'table',
                columns: 1
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
                        inputValue: 'all',
                        checked: true
                    }, {
                        boxLabel: 'FREE',
                        name: 'sex',
                        inputValue: 'free',

                    }, {
                        boxLabel: 'RESERVED',
                        name: 'sex',
                        inputValue: 'reserved',

                    }, {
                        boxLabel: 'OCCUPIED',
                        name: 'sex',
                        inputValue: 'occupied',

                    }, {
                        boxLabel: 'LATE CHECK OUT',
                        name: 'sex',
                        inputValue: 'late_checkout',

                    }]
                }, {
                    xtype: 'form',
                    xtype: 'fieldcontainer',
                    id: 'panelId',
                    fieldLabel: 'Floors',
                    autoWidth: true,
                    // callback: this.getButton()
                }


            ]

        }
        return test
    },
    getButton: function() {
        // create the Data Store
        var store = Ext.create('Ext.data.Store', {
            model: 'App.model.setup.Floor',
            proxy: {
                type: 'rest',
                url: '/floor',
                reader: {
                    type: 'json',
                    root: 'data',
                    successProperty: 'success'
                },

            }
        });

        //create the buttons          
        store.load(function() {
            store.each(function(records) {
                var button = {
                    xtype: 'button',
                    text: records.get('Name'),
                    margin: '10 10 10 10',
                    listeners: {
                        click: function() {
                            Ext.Msg.alert('Hello', "You selected " + this.text);
                        }
                    }
                };
                Ext.getCmp('panelId').insert(button);
            }); //each                                           
        }); //load
    },

    getFooter: function() {
        footer = {
            xtype: 'container',
            style: 'margin-top:5px;text-align:left',
            width: '100%',
            height: '100%',
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
                    defaultType: 'radiofield',
                    defaults: {
                        flex: 1,
                        style: 'margin-left:20px'
                    },

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
        }, '-', {
            xtype: 'label',
            style: 'font-size:15px;color:gray',
            text: 'Free',
        },
        Ext.create('Ext.ux.ColorPicker', {
            luminanceImg: 'extjs6/Ext.ux.ColorPicker-master/luminance.png',
            spectrumImg: 'extjs6/Ext.ux.ColorPicker-master/spectrum.png',
            name: 'free',
            width: 70,
            editable: false,
            readOnly: true,
            itemId: 'free',
        }), '-', {

            xtype: 'label',
            style: 'font-size:15px;color:gray',
            text: 'Reserved',

        },
        Ext.create('Ext.ux.ColorPicker', {
            luminanceImg: 'extjs6/Ext.ux.ColorPicker-master/luminance.png',
            spectrumImg: 'extjs6/Ext.ux.ColorPicker-master/spectrum.png',
            name: 'reserved',
            width: 70,
            editable: false,
            readOnly: true,
            itemId: 'reserved',
        }), '-', {

            xtype: 'label',
            style: 'font-size:15px;color:gray',
            text: 'Occupied',

        },
        Ext.create('Ext.ux.ColorPicker', {
            luminanceImg: 'extjs6/Ext.ux.ColorPicker-master/luminance.png',
            spectrumImg: 'extjs6/Ext.ux.ColorPicker-master/spectrum.png',
            name: 'occupied',
            width: 70,
            editable: false,
            readOnly: true,
            itemId: 'occupied',
        }), '-', {

            xtype: 'label',
            style: 'font-size:15px;color:gray',
            text: 'Late Check In',

        },
        Ext.create('Ext.ux.ColorPicker', {
            luminanceImg: 'extjs6/Ext.ux.ColorPicker-master/luminance.png',
            spectrumImg: 'extjs6/Ext.ux.ColorPicker-master/spectrum.png',
            name: 'late_checkout',
            width: 70,
            editable: false,
            readOnly: true,
            itemId: 'late_checkout',
        }), '->', {
            xtype: 'button',
            text: '<b>Print<b>',
            iconCls: 'icon-printer',
            action: 'Print',
            hidden: true
        }
    ]



});