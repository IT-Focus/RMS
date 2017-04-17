Ext.define('App.view.roomTransaction.roomMonitor.Index', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.roomMonitorIndex',   
    // bodyPadding: 10,
    border: true,
    height: '100%',
    autoWidth:true,
    autoScroll:true,
    layout: 'card',
    initComponent: function() {
       var me = this
       var ctrl = App.app.getController("roomTransaction.RoomMonitor");
        
        Ext.apply(this, {
            items:[
                {
                    xtype: 'form',
                    name:'indexPage',
                    title: "Room Monitor",
                    autoScroll:true,
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

                },{
                    xtype:'CheckinForm'
                },{
                    xtype:'checkOutForm'
                },{
                    xtype:'CustomersForm'
                }
                //Ext.create("App.view.roomTransaction.checkIn.Form")
            ],
            
        });
        this.callParent(arguments);

        ctrl.showButtonFloor(me);
        ctrl.getRoomData(me);
        // ctrl.addRoomMonitor(me,"ALL");
        ctrl.addRoomStatusColor(me);

        // Util.ajax("default_color", {}, me.loadValueToForm, me)
    },


});