Ext.define('App.view.roomTransaction.roomMonitor.Index', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.roomMonitorIndex',
    title: "Room Monitor",
    bodyPadding: 10,
    border: true,
    autoScroll:true,
    layout: 'card',
    initComponent: function() {
        var me = this
       var ctrl = App.app.getController("roomTransaction.RoomMonitor");
        
        Ext.apply(this, {

            items:[
                {
                    xtype: 'form',
                    name:'roomMonitor' , 
                    tbar:[                        
                        {
                            xtype:"label",
                            text:'Floor: '
                        },{
                            xtype:'button',
                            text:'ALL' , 
                            value:'ALL',
                            action:"loadRoomByFloor"
                        }
                    ],  
                    bbar:[]  
                }
            ]
                
        });
        this.callParent(arguments);

        var mainForm = me.down("form[name=roomMonitor]");
        ctrl.showButtonFloor(me);
        ctrl.addRoomMonitor(me, "ALL");
        ctrl.addRoomStatusColor(me);

        // Util.ajax("default_color", {}, me.loadValueToForm, me)
    },


});