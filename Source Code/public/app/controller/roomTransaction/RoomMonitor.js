
Ext.define('App.controller.roomTransaction.RoomMonitor', {
    extend: 'Ext.app.Controller',
    views:[
        'roomTransaction.roomMonitor.Index',
        'roomTransaction.roomMonitor.CheckInForm', 
        'roomTransaction.checkIn.Form'
        
    ],
    stores:[
        'setup.Floor', 
        "roomTransaction.RoomMonitor",
        "setup.DefaultColor",

        // store for check in form
        'combo.Nationality',
        'combo.Discount',
        'combo.CategoryPrice',
        'combo.AvailableRooms',
        'combo.RoomList',
        'roomTransaction.CheckInDetail',
        'combo.RoomServiceMaster',
        'roomTransaction.CheckIn',
        'roomTransaction.CheckInRoomDetail'
    ],
    init: function() {


        this.control({
            'roomMonitorIndex button[action=loadRoomByFloor]':{
                click: this.loadRoomByFloor
            },

            'roomMonitorIndex button[action=checkin]':{
                click: this.showFormCheckin
            },
            'roomMonitorIndex button[action=Refresh]':{
                click: this.refreshMonitor
            },
            'roomMonitorIndex button[action=btnfree]':{
                click: this.showFreeRoom
            },
            'roomMonitorIndex button[action=btnreserved]':{
                click: this.showReservedRoom
            },
            'roomMonitorIndex button[action=btnoccupied]':{
                click: this.showOccupiedRoom
            },
            'roomMonitorIndex button[action=btnlatecheckout]':{
                click: this.showLateCheckoutRoom
            }, 
            // === event on form check in 
            'roomMonitorIndex button[action=CancelCheckIn]':{
                click: this.backToIndex
            }, 

    

        });
    },
    defaultColor:{},
    activedFloorId:"ALL",
   
    backToIndex:function(btn){
        var container = btn.up("roomMonitorIndex");
        var indexForm = container.down("form[name=indexPage]");
        container.setActiveItem(indexForm);
        var store = this.getRoomTransactionCheckInDetailStore(); 
        store.removeAll();
    },
    getRoomMonitor: function(indexView,status_id){
        var me = this ; 
        var roomStore = me.getStore("roomTransaction.RoomMonitor");
        roomStore.load({
            params:{
                status_id:status_id
            },
            callback:function( records ){
                records.forEach(function(record){
                    
                    var button = me.generateRoomForm(record.getData() , indexView);
                });
            },
            scope: this
        });
    },
    showFreeRoom: function(btn){
        var indexView = btn.up("roomMonitorIndex").down("form[name=indexPage]");
             me = this ;
        me.clearRoomMonitor(indexView);
        me.getRoomMonitor(indexView,1)
    },

    showReservedRoom: function(btn){
        var indexView = btn.up("roomMonitorIndex").down("form[name=indexPage]");
             me = this ;
        me.clearRoomMonitor(indexView);
        me.getRoomMonitor(indexView,2)
    },
    showOccupiedRoom: function(btn){
        var indexView = btn.up("roomMonitorIndex").down("form[name=indexPage]");
             me = this ;
        me.clearRoomMonitor(indexView);
        me.getRoomMonitor(indexView,3)
    },
     showLateCheckoutRoom: function(btn){
        var indexView = btn.up("roomMonitorIndex").down("form[name=indexPage]");
             me = this ;
        me.clearRoomMonitor(indexView);
        me.getRoomMonitor(indexView,4)
    },
    showFormCheckin:function(btn){
        var me = this ; 
        var container = btn.up('roomMonitorIndex');
        
        var formCheckIn = container.down('CheckinForm');
    
        formCheckIn.getForm().reset();
        formCheckIn.down('hiddenfield[name=room_master_id]').setValue(btn.roomId);
        me.addRoomToCheckIn(btn.roomId);
        container.setActiveItem(formCheckIn);
    },
    addRoomToCheckIn:function(roomId){
        
        var model = Ext.create("App.model.roomTransaction.CheckInDetail"), 
            storeCheckDetail = this.getRoomTransactionCheckInDetailStore(),
            storeRoom =this.getRoomTransactionRoomMonitorStore(), 
            room = storeRoom.getById(roomId);
        model.set('room_master_id', roomId);
        model.set('rent_charge', 0); 
        model.set('description' , room.get('room_no'));
        model.set('room_no' , room.get('room_no'));
        model.set('tran_type' , 'SE');
        storeCheckDetail.add(model);
        
    },
    refreshMonitor:function(btn){
      var indexView =btn.up("roomMonitorIndex").down("form[name=indexPage]");
      var me = this ;
        me.clearRoomMonitor(indexView); 
        me.addRoomMonitor(indexView,me.activedFloorId);
    },
    
    loadRoomByFloor:function(btn){
        var floorId  = btn.value; 
        this.activedFloorId = floorId;
        var indexView =btn.up("roomMonitorIndex").down("form[name=indexPage]");
        this.clearRoomMonitor(indexView); 
        this.addRoomMonitor(indexView,floorId);
    },

    loadDefaultColor:function(){
        var storeDefaultColor = this.getStore("setup.DefaultColor");
        var me = this ; 

        storeDefaultColor.load({
            callback:function(records){       
                records.forEach(function(record){
                    me.defaultColor = record.data; 
                }); 
            }, 
            scope: this
        });
    },
    showFormOption:function(){
        
    },
    addRoomStatusColor:function(indexView){
       var bbar = indexView.down("toolbar[dock=bottom]") ; 
     var color = this.defaultColor; 
       var panel =this.getFooterText(color) ;

        bbar.add(panel);
    },
    addRoomMonitor:function(indexView, floor ){
        var me = this ; 
        var roomStore = me.getStore("roomTransaction.RoomMonitor");
        roomStore.load({
            params:{
                floor:floor
            },
            callback:function(records){
                records.forEach(function(record){
                    var data= record.data; 
                    var button = me.generateRoomForm(data , indexView);
                });
            },
            scope: this
        });
    },
    generateRoomForm:function(data, indexView){
        var me = this ; 
        
        switch (data.status_id){
            case 1 : 
                data.color_status = me.defaultColor.free ; 
                data.color_text  = me.defaultColor.free_text_color;
                break; 
            case 2 : 
                data.color_status = me.defaultColor.reserved  ; 
                data.color_text  = me.defaultColor.reserved_text_color; 
                break; 
            case 3 : 
                data.color_status = me.defaultColor.occupied ; 
                data.color_text  = me.defaultColor.occupied_text_color;
                break; 
            case 4 : 
                data.color_status = me.defaultColor.late_checkout ; 
                data.color_text  = me.defaultColor.late_checkout_text_color;
                break; 
        }

        var panel = Ext.create("App.view.roomTransaction.roomMonitor.roomMonitor",{roomData:data});
        
        indexView.add(panel);
    },
    showButtonFloor:function(indexView){
        var me = this ;
        var floorStore = this.getStore("setup.Floor"); 
        floorStore.load({
            callback:function( records ){
                records.forEach(function(record){
                    var data= record.data; 
                    var button = me.generateButton(data);
                    me.addBtnToGrid(button , indexView); 
                });
                //== add button refresh 
                me.addBtnRefresh(indexView);
            },
            scope: this
        });
    },
    
    addBtnToGrid:function(btn , grid ){
        
        var tbar = grid.down("toolbar"); 
        tbar.add(btn);    
    },
    generateButton:function(data){
        var button = Ext.create("Ext.button.Button",{
            text: data.name , 
            action:"loadRoomByFloor",
            value: data.id 
        });
        return button ; 
    },
    edit:function(btn){
        var rec = Util.getRecord(btn,"Please select record for edit ");
        if (rec) {
            var conatiner = btn.up('userIndex');
            var form = conatiner.down('userForm');
            form.getForm().loadRecord(rec);
            conatiner.setActiveItem(form);
        };

    },
    add:function(btn){
        var conatiner = btn.up('userIndex');
        var form = conatiner.down('userForm');
        form.getForm().reset();
        conatiner.setActiveItem(form);

    },

    save :function(btn){
        var store = this.getAdminUserStore();
        var me = this ;
        Util.saveForm(btn,store,'admin.User', me);


    },
    cancel:function(btn){
        var conatiner = btn.up('userIndex');
        var grid = conatiner.down('grid[name=index]');
        conatiner.setActiveItem(grid);
    },
    delete: function(rec , grid ){
        var store = grid.getStore();
         Ext.MessageBox.confirm('Confirm', 'Are you sure to Delete this record?',
            function(btn ){
                if (btn == 'yes') {
                    store.remove(rec);
                    store.sync();
                };
            });

    },
    //======================= private  function 
    clearRoomMonitor:function(indexView){
        indexView.removeAll();
    },
    getFooterText:function(color){
        
        var panel = Ext.create("Ext.panel.Panel",{

            layout:'hbox',
            width:'100%',
            items:[
                {
                    xtype:'label', 
                    text:'Free :'
                },{
                    xtype:'button' , 
                    style:'background-color:'+color.free+';margin-right:10px', 
                    action: 'btnfree',
                    height:20
                },{
                    xtype:'label',
                    text:' Reserved :'
                },{
                   xtype:'button' , 
                    style:'background-color:'+color.reserved+';margin-right:10px', 
                    action: 'btnreserved',
                    height:20 
                },{
                    xtype:'label',
                    text:' Occupied :'
                },{
                   xtype:'button' , 
                    style:'background-color:'+color.occupied+';margin-right:10px', 
                    action: 'btnoccupied',
                    height:20 
                },{
                    xtype:'label',
                    text:' Late Checkout :'
                },{
                   xtype:'button' , 
                    style:'background-color:'+color.late_checkout+';margin-right:10px', 
                    action: 'btnlatecheckout',
                    height:20 
                },
            ]
        });     
        return panel ; 
    },
    addBtnRefresh:function(indexView){
        var me = this ;
        me.addBtnToGrid("->" , indexView); 

        var button= Ext.create("Ext.button.Button",{
            text:'Refresh',
            action:'Refresh',
            iconCls:'icon-refresh',

        });
        me.addBtnToGrid(button, indexView); 

    },

      


})
