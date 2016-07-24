
Ext.define('App.controller.roomTransaction.RoomMonitor', {
    extend: 'Ext.app.Controller',
    views:[
        'roomTransaction.roomMonitor.Index',
        'roomTransaction.roomMonitor.CheckInForm', 
        'roomTransaction.checkIn.Form',
        'roomTransaction.roomMonitor.CancelCheckInForm'
        
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
        'roomTransaction.CheckInRoomDetail',

        // store for cancel check in
        'roomTransaction.CancelCheckin',
        'combo.RoomList'
    ],
    init: function() {


        this.control({
            'roomMonitorIndex button[action=loadRoomByFloor]':{
                click: this.loadRoomByFloor
            },

            'CheckinForm button[action=CancelCheckInForm]':{
                click: this.backToIndex
            },

            'roomMonitorIndex button[action=checkin]':{
                click: this.showFormCheckin
            },
            'roomMonitorIndex button[action=updateCheckIn]':{
                click: this.updateCheckIn
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
            'roomMonitorIndex button[action=cancelCheckIn]':{
                click: this.showFormCancelCheckin
            },
            'cancelCheckinForm button[action=Cancel]':{
                click: this.winCancel
            },
            // 'cancelCheckinForm combo[name=room_no]':{
            //     select: this.filterCancelInDetail
            // },
            'cancelCheckinForm hiddenfield[name=room_no]':{
                change: this.filterCancelInDetail
            },
             'cancelCheckinForm button[action=Save]':{
                click: this.saveCancelCheckIn
            },

          

    

        });
    },
    defaultColor:{},
    activedFloorId:"ALL",
    monitorIndexTmp:{},
    tmpCheckinDetailStore:{},
   
    backToIndex:function(btn){
        var container = btn.up("roomMonitorIndex");
        var indexForm = container.down("form[name=indexPage]");
        container.setActiveItem(indexForm);
        var store = this.getRoomTransactionCheckInDetailStore(); 
        store.removeAll();
        this.refreshMonitor(btn);
    },

    winCancel:function(btn){
        var me = this;
        var indexPage = me.monitorIndexTmp.down("form[name=indexPage]");
        me.clearRoomMonitor(indexPage); 
        me.addRoomMonitor(indexPage,me.activedFloorId);
        btn.up('window').close();
         
    },
    updateCheckIn:function(btn){
        
         // debugger;
        var me = this ; 
        var storeCheckDetail = me.getRoomTransactionCheckInDetailStore();
        tmpCheckinDetailStore = storeCheckDetail;
        Util.ajax('CheckInDetail/get_checkin_detail',{room_id:btn.roomId},this.loadRecordToForm,btn)
    },
    loadRecordToForm:function(obj,btn){
        var container = btn.up('roomMonitorIndex');
        var formCheckIn = container.down('CheckinForm');
        
        var model = Ext.create("App.model.roomTransaction.CheckInDetail");
        
        formCheckIn.getForm().reset();
  
            obj.checkinDetail.forEach(function(rec){  
                // formCheckIn.down('hiddenfield[name=room_master_id]').setValue(btn.roomId);
                formCheckIn.down('hiddenfield[name=id]').setValue(rec.check_in_id);
                // formCheckIn.getForm().loadRecord(rec);
                
                // Cutomer Info
                formCheckIn.down('datefield[name=check_in_date]').setValue(obj.check_in_date);
                formCheckIn.down('timefield[name=check_in_time]').setValue(Ext.util.Format.dateRenderer('H:i')(rec.check_in_time));
                formCheckIn.down('datefield[name=estimated_check_out_date]').setValue(Ext.util.Format.dateRenderer('Y-m-d')(rec.estimated_check_out_date));
                formCheckIn.down('timefield[name=estimated_check_out_time]').setValue(Ext.util.Format.dateRenderer('H:i')(rec.estimated_check_out_time));
                formCheckIn.down('textfield[name=customer_name]').setValue(rec.customer_name);
                formCheckIn.down('textarea[name=address]').setValue(rec.address);
                formCheckIn.down('textfield[name=city]').setValue(rec.city);
                formCheckIn.down('textfield[name=email]').setValue(rec.email);
                formCheckIn.down('textfield[name=phone]').setValue(rec.phone);
                formCheckIn.down('datefield[name=dob]').setValue(rec.dob);
                formCheckIn.down('numberfield[name=national_id]').setValue(rec.national_id);
                // Rantal Info
                formCheckIn.down('numberfield[name=no_person]').setValue(rec.no_person);
                formCheckIn.down('numberfield[name=adult]').setValue(rec.adult);
                formCheckIn.down('numberfield[name=children]').setValue(rec.children);
                formCheckIn.down('numberfield[name=male]').setValue(rec.male);
                formCheckIn.down('numberfield[name=female]').setValue(rec.female);
                formCheckIn.down('numberfield[name=paid_booking]').setValue(rec.paid_booking);
                formCheckIn.down('textfield[name=purpose_of_visit]').setValue(rec.purpose_of_visit);
                formCheckIn.down('numberfield[name=no_room]').setValue(rec.no_room);
                formCheckIn.down('numberfield[name=extra_person]').setValue(rec.extra_person);
                formCheckIn.down('numberfield[name=charge]').setValue(rec.charge);
                formCheckIn.down('combo[name=discount]').setValue(rec.discount);

                // model.set('id',rec.id);
                model.set('room_master_id', btn.roomId);
                model.set('check_in_id' , rec.check_in_id);
                model.set('room_master_id' , rec.room_master_id);
                model.set('categroy_price_id' , rec.categroy_price_id);
                model.set('total_amount', rec.total_amount);
                model.set('unit_price', rec.unit_price);
                model.set('discount', rec.discount);
                model.set('discount_amount', rec.discount_amount);
                model.set('tax', rec.tax);
                model.set('tax_amount', rec.tax_amount);
                model.set('grand_total_amount', rec.grand_total_amount);
                model.set('unit_price', rec.unit_price);
                model.set('qty', rec.qty);
                model.set('description' , rec.description);
                model.set('room_no' , rec.room_no);
                model.set('check_in_date',Ext.Date.format(obj.check_in_date,'Y-m-d'))
                model.set('tran_type' , rec.tran_type);
                tmpCheckinDetailStore.add(model);

            
             


             })
         container.setActiveItem(formCheckIn);
    },
    saveCancelCheckIn:function(btn){
        var store = this.getRoomTransactionCancelCheckinStore();
        var me = this;
        Util.save(btn,store,'roomTransaction.CancelCheckin');
        var indexPage = me.monitorIndexTmp.down("form[name=indexPage]");
        me.clearRoomMonitor(indexPage); 
        me.addRoomMonitor(indexPage,me.activedFloorId);
    },
    filterCancelInDetail: function(field) {
        value = field.getValue()
        Util.ajax('CheckInDetail/get_checkin_detail',{room_id:value},this.loadRecordToTextfield,field)
    },
    loadRecordToTextfield: function(obj, field){
        win = field.up('window')
       
        win.down("textfield[name=check_in_code]").setValue(obj.check_in_code);
        win.down("datefield[name=check_in_date]").setValue(obj.check_in_date);
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

    showFormCancelCheckin:function(btn){
        var me = this;
        var win = Ext.create("App.view.roomTransaction.roomMonitor.CancelCheckInForm");
        // var form = btn.up('form');
        // form.down('combo[name=]')
        win.show();
        win.center();
        // alert(btn.roomId);
        win.down('hiddenfield[name=room_no]').setValue(btn.roomId);
        // win.down('hiddenfield[name=room_no]').focus(true , 300 );
    },
    addRoomToCheckIn:function(roomId){
        debugger;
        var model = Ext.create("App.model.roomTransaction.CheckInDetail"), 
            storeCheckDetail = this.getRoomTransactionCheckInDetailStore(),
            storeRoom =this.getRoomTransactionRoomMonitorStore(), 
            room = storeRoom.getById(roomId);
        model.set('room_master_id', roomId);
        model.set('unit_price', 0);
        model.set('qty', 1);
        model.set('description' , room.get('room_no'));
        model.set('room_no' , room.get('room_no'));
        model.set('check_in_date',Ext.Date.format(new Date(),'Y-m-d'))
        model.set('tran_type' , 'SE');
        storeCheckDetail.add(model);
        
    },
    refreshMonitor:function(btn){
     
      var indexView =btn.up("roomMonitorIndex").down("form[name=indexPage]");
      // debugger;
      var me = this ;
        me.monitorIndexTmp=btn.up("roomMonitorIndex");
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
