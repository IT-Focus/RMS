Ext.define('App.controller.roomTransaction.CheckIn', {
    extend: 'Ext.app.Controller',
    alias: 'widget.RoomTransactionCheckIn',
    refs: [

        {
            ref: 'loginwindow',
            selector: 'loginwindow'
        }
    ],
    views: [
        'roomTransaction.checkIn.Index',
        'roomTransaction.checkIn.Form',
        'roomTransaction.checkin.GetRoomForm',
        'roomTransaction.roomMonitor.Index',

    ],
    stores: [
        'roomTransaction.CheckInRoomDetail',
        'combo.Nationality',
        'combo.Discount',
        'combo.CategoryPrice',
        'combo.AvailableRooms',
        'roomTransaction.CheckIn',
        'roomTransaction.CheckInDetail',
        'combo.RoomServiceMaster'
    ],
    init: function() {
        
        this.control({
            'CheckinIndex button[action=Add]': {
                click: this.add
            },
            'CheckinIndex button[action=CancelCheckIn]': {
                click: this.cancel
            },
            
            'getRoomForm button[action=go_check_in]': {
                click: this.continues_checkin
            },
            'getRoomForm button[action=Cancel]': {
                click: this.winCancel
            },
            'getRoomForm combo[name=room_no]': {
                specialkey: this.keyenter
            },

           

            'CheckinForm button[action=AddItem]': {
                click: this.addRow
            },
            // 'CheckinForm button[action=AddRoom]': {
            //     click: this.addRoom
            // },
            //==============--------- event in form 
            'CheckinForm button[action=Paid]': {
                click: this.showFormPaid
            },
            'CheckinForm button[action=CheckOut]': {
                click: this.showCheckOut
            },
            'CheckinForm button[action=CancelCheckIn]':{
                click: this.showCancelCheckInForm
            },
            'CheckinForm button[action=SaveCheckIn]': {
                click: this.saveFormCheckIn
            },
            'CheckinForm button[action=UpdateCheckIn]': {
                click: this.saveFormCheckIn
            },

            // 'CheckinForm button[action=add_NID_attachment]':{
            //     click: this.add_NID_image
            // },
         
            //=== event check in detail 
            'CheckinForm grid[name=item_detail]': {
                edit: this.setRecord            
                
            },
             
            // 'CheckinForm grid[name=roomDetail]': {
                
            //     edit: this.setRecordRoomDetail               
            // },

            // 'CheckinForm grid[name=roomChargeByDynamicPlanGrid]':{
            //     edit: this.setRecordRoomDetail
            // },

            'CheckinForm combo[name=comboRoom]': {
                
                select: this.setTmpRecord                 
            },
            'CheckinForm combo[name=comboCategoryPrice]': {
                
                select: this.setTmpCategoryPrice                 
            },
            'CheckinForm grid[name=roomDetailByRate]':{
                beforeedit: this.filterItemPrice
            },
            'CheckinForm grid[name=roomDetail]':{
                beforeedit: this.filterItemPrice,
                edit: this.setRecordRoomDetail 
            },
             'CheckinForm grid[name=roomChargeByDynamicPlanGrid]':{
                beforeedit: this.filterItemPrice,
                edit: this.setRecordRoomDetail
            },
            'CheckinForm button[action=AddRoomByRate]':{
                click: this.addRoom
            },
            'CheckinForm button[action=removeServiceFromGrid]':{
                click: this.removeRoomFromGrid
            },

            'CheckinIndex combo[name=searchBy]' : {
                change: this.advanceSearch
            },
            'CheckinIndex textfield[name=string]' : {
                change: this.advanceSearch
            },
            'CheckinForm combo[name=service_name]' : {
                select: this.selectService
            },

            //===== EVENT ON PAID FORM 
            'winPaid button[action=Cancel]':{
                click : this.closeForm
            },
            'winPaid button[action=Save]':{
                click : this.savePaid
            },
            // "grid[name=roomDetail] > combo[name=comboRoom]":{
            //     change: this.changeCombobox
            // }
            

            
        });

        //Ext.apply(me.tmpRoomData,Ext.create("App.model.roomTransaction.CheckInDetail"));
    },
  
    main_form: "",
    index_form: "",
    roomID: "",
    checkin_close: "",
    room_master_id_tem:"",
    itemRecord:{},
    tmpRoom:{},
    defaultColor:{},
    tmpRoomData:{} ,
    tmpServiceID:{},

    addRow: function(btn) {
        // debugger;
        var me = this,
            form = btn.up('form'),
            room_value = form.getValues(),
            roomID = room_value.room_master_id,
            store = btn.up('grid').getStore(),
            values = me.itemRecord,
            model = Ext.create("App.model.roomTransaction.CheckInDetail");



        model.set("service_id", 2);
        model.set("categroy_price_id", 0);
        model.set('room_master_id', roomID);
        // model.set('description' , values.service_name);
        model.set('check_in_date', Ext.Date.format(new Date(), 'Y-m-d'))
        model.set('tran_type', 'SE');
        store.add(model);
    },
     saveCancelCheckIn: function(btn) {
        var store = this.getRoomTransactionCancelCheckinStore();
        var me = this;
        Util.save(btn, store, 'roomTransaction.CancelCheckin');
        
    },
    selectService:function(combo, record, index){
        // alert(13333);
        var rec = record.data;
        this.itemRecord = rec;

    },
    removeRoomFromGrid:function(grid, rowIndex){
       // alert('test');
       var rec = grid.getStore().getAt(rowIndex);
        this.deleteDetailRecord(grid, rec);
    },
    setTmpCategoryPrice:function(combo, rec, index){
         // alert(rec.getId());
         var tmpRoomData =this.tmpRoomData;
            tmpRoomData.categroy_price_id = rec.getId();
            tmpRoomData.unit_price = rec.get("charge_amount");
    },
    setTmpRecord:function(combo, rec, index){
        this.tmpRoomData.room_master_id = rec.getId();

    },
    changeCombobox:function(){
        alert(123);
    },
    showCheckOut:function(btn){
        var form = btn.up('form').getForm();
        values = form.getValues(), 
        me = this ;
        // debugger;

        if(parseInt(values.total_amount) <= parseInt(values.paid_booking) ){
            Ext.MessageBox.confirm('Confirm', 'Are you sure you want to check out ?', function(button) {
                if (button == 'yes') {                    
                    Util.ajax("CheckOuts/create" , values, me.afterCheckOut , { btn:btn,me:me,form:form } )
                }
            });


        }else{
            Util.msg(" Please paid before check out")
        }

    },

    showCancelCheckInForm:function(btn){
       
        var me = this,
            form= btn.up('form'),
            values = form.getValues();

        var win = Ext.create("App.view.roomTransaction.roomMonitor.CancelCheckInForm");
        win.show();
        win.center();
        win.down('hiddenfield[name=room_no]').setValue(values.room_master_id);
    },
    afterCheckOut:function(result , params ){
        form = params.btn.up('form');
        store = form.down('grid').getStore();
        store.removeAll();
        window.open('check_outs/print?id=' + result.customer_payment_id);
        params.me.cancel(params.btn); 
        

    },
    
    savePaid:function(btn){
        var win = btn.up('window'), 
        me = this , 
        form = win.down('form').getForm(); 
        if(form.isValid()){
            var values = form.getValues(); 

            Util.ajax("CheckOuts/paid_booking" , values  , me.afterPaid, {win:win , me : me } );
        }else{
            Util.msg("Incorrect data entry ");
        }

    },
    afterPaid:function(obj , params){
        Util.msgSave(obj.message);
        params.win.close(); 
// === update paid amount and balance
        var main_form = params.me.main_form.getForm(); 
        var values = main_form.getValues();
        var paid_booking = obj.check_in.paid_booking ; 
        var grand_total_amount =  (values.total_amount - values.discount_amount )- paid_booking; 
        main_form.setValues({ paid_booking:paid_booking , grand_total_amount: grand_total_amount })

    },
    closeForm:function(btn){
        btn.up('window').close();
    },
    showFormPaid:function(btn){

      var form= btn.up('form');
      this.main_form = form; 
      var values = form.getValues(); 
      var win = Ext.create('App.view.roomTransaction.roomMonitor.WinPaid');
      values.balance = values.grand_total_amount  ; 
      win.down('form').getForm().setValues(values);
      win.show();
      win.center();
      win.down('numberfield[name=total_paid]').focus(true , 500);
      // win.down('numberfield[name=total_paid]').setMinValue(values.balance);
      // win.down('numberfield[name=total_paid]').setMaxValue(values.balance);
      // console.log(values);
    },
    filterItemPrice: function(editor, e) {
        var grid = e.grid,
            form = grid.up('form'),
            me = this;
        var record = grid.getStore().getAt(e.rowIdx);
        

        switch (e.colIdx) {
            case 4:
        
                if (record.get("room_master_id") > 0) {
                    // alert(record.get("room_master_id"));
                    room_master_id_tem = record.get("room_master_id");
                    me.getComboCategoryPriceStore().load({
                        params: {
                            roomId: record.get("room_master_id")
                        }
                    });

                };
                break;
        }


    },

    advanceSearch: function(field){
        // debugger;
        var me = this,
            form = field.up('gridpanel'),
            searchBy = form.down('combo[name=searchBy]').getValue(),
            searchString = form.down('textfield[name=string]').getValue()
            store = me.getRoomTransactionCheckInStore();

            Util.loadStore(store,{searchString:searchString,searchBy:searchBy});
    },
    
   updateRoomInDetail:function(combo){
        alert("Selected");
   },
    filterCancelInDetail: function(field) {
        value = field.getValue()
        Util.ajax('CheckInDetail/get_checkin_detail', {
            room_id: value
        }, this.loadRecordToTextfield, field)
    },
    selectAvailableRooms: function(field, records) {
        var form = field.up('form'),
            room_id = form.down('combo[name=room_no]').getValue();
    },
    loadRecordToTextfield: function(obj, field) {
        win = field.up('window')
        win.down("textfield[name=check_in_code]").setValue(obj.check_in_code);
        win.down("datefield[name=check_in_date]").setValue(obj.check_in_date);
    },
    cancel: function(btn) {
        var conatiner = btn.up('roomMonitorIndex');
        var indexForm = conatiner.down('form');
        indexForm.getForm().reset();
        conatiner.setActiveItem(indexForm);
        this.refreshMonitor(btn);
    },
    CancelCheckInForm: function(btn){
        alert(123);
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

    refreshMonitor:function(btn){
      var indexView =btn.up("roomMonitorIndex").down("form[name=indexPage]");
      var me = this ;
        me.loadDefaultColor();
        me.clearRoomMonitor(indexView); 
        me.addRoomMonitor(indexView,"ALL");
    },
    clearRoomMonitor:function(indexView){
        indexView.removeAll();
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
    winCancel: function(btn) {
        btn.up('window').close();
    },
    add: function(btn) {

        var win = Ext.create("App.view.roomTransaction.checkin.GetRoomForm");
        var conatiner = btn.up('CheckinIndex');
        var form = conatiner.down('CheckinForm');
        main_form = form;
        index_form = conatiner;
        win.show();
        win.center();
        checkin_close = win;
        win.down('combo[name=room_no]').focus(true, 300);
        

    },

    setRecordRoomDetail: function(editor, e ){
        // debugger;
        var me = this,
            grid = e.grid,
            form = grid.up('form'),
            record = grid.getStore().getAt(e.rowIdx),    
            model = Ext.create("App.model.roomTransaction.CheckInDetail"),
            storeCheckDetail = this.getRoomTransactionCheckInDetailStore();

        switch (e.colIdx) {
            case 4:
                // values.total_amount = '';
                record.set("unit_price", me.tmpRoomData.unit_price);
                record.set('total_amount', me.tmpRoomData.unit_price);
                record.set("categroy_price_id", me.tmpRoomData.categroy_price_id);
                form.down('numberfield[name=total_amount]').setValue(me.tmpRoomData.unit_price);
                form.down('numberfield[name=grand_total_amount]').setValue(me.tmpRoomData.unit_price);
            break; 
        }
        // if (me.tmpRoomData) {
        //         var values = me.tmpRoomData; //get record form grid/combobox
        //         record.set("unit_price", values.charge_amount);
        //         model.set('total_amount', values.charge_amount);
        //         me.tmpRoomData = false;

        //     };
    },
    setRecord: function(editor, e){
        
        // debugger;
        var grid = e.grid,
            form = grid.up('form'),
            me = this,
            record = grid.getStore().getAt(e.rowIdx),
            check_in_values = form.getForm().getValues();
            other_charge = check_in_values.other_charge,
            totoal_amount = check_in_values.total_amount,
            grand_total_amount = check_in_values.grand_total_amount,

            model = Ext.create("App.model.roomTransaction.CheckInDetail"),
            storeCheckDetail = this.getRoomTransactionCheckInDetailStore(),
            values = me.itemRecord;
        switch (e.colIdx) {
            
            case 1:

                // alert(values.charge_amount);    
                record.set("qty", 1);
                record.set("service_id", values.id);
                record.set("unit_price", values.charge_amount);
                record.set("total_amount", record.get("unit_price") * record.get("qty"));

                other_charge = parseInt(other_charge) + parseInt(values.charge_amount);
                get_total_amount = parseInt(totoal_amount) + parseInt(values.charge_amount);
                get_grand_total_amount= parseInt(grand_total_amount) + parseInt(values.charge_amount);
                
                form.down('numberfield[name=other_charge]').setValue(other_charge);
                form.down('numberfield[name=total_amount]').setValue(get_total_amount);
                form.down('numberfield[name=grand_total_amount]').setValue(get_grand_total_amount);
            

            break;
            case 3:
                record.set("qty", record.get("qty"));
                record.set("unit_price", values.charge_amount);
                record.set("total_amount", record.get("unit_price") * record.get("qty"));

                other_charge = parseInt(other_charge) + parseInt(values.charge_amount);
                totoal_amount = parseInt(totoal_amount) + parseInt(values.charge_amount);
                grand_total_amount= parseInt(grand_total_amount) + parseInt(values.charge_amount);
                
                form.down('numberfield[name=other_charge]').setValue(other_charge);
                form.down('numberfield[name=total_amount]').setValue(totoal_amount);
                form.down('numberfield[name=grand_total_amount]').setValue(grand_total_amount);
            break; 
        }

    },    
    addRoom: function(btn){
        // alert(123456);
        var store = btn.up('grid').getStore();
        var model = Ext.create("App.model.roomTransaction.CheckInDetail");
        model.set("check_in_id", null);
        
        model.set('qty', 1);
        model.set('room_no', 1);
        model.set('unit_price', 0);
        model.set('check_in_date',Ext.Date.format(new Date(),'Y-m-d H:i'))
        model.set('tran_type' , 'RE');
        store.add(model);
    },

    deleteDetailRecord: function(grid, rec) {
        var me = this;
        Ext.MessageBox.confirm('Confirm', 'Are you sure you want to remove this item ?', function(btn) {
            if (btn == 'yes') {
                var store = grid.getStore();

                if (rec.get('id') > 0) {
                    rec.set("_destroy", true);

                    me.store.add(rec);

                }
                store.remove(rec);

            }
        });

    },

    keyenter: function(item, event) {
        if (event.getKey() == event.ENTER) {
            roomID = item.value;
            if (roomID !== null) {
                main_form.getForm().reset();
                main_form.down('hiddenfield[name=room_master_id]').setValue(roomID)
                index_form.setActiveItem(main_form);
                checkin_close.close()
            }
        }
    },
    continues_checkin: function(btn) {
        var form = btn.up('window').down('form');

        if (form.getForm().isValid()) {
            roomID = form.down('combo[name=room_no]').getValue()
            main_form.getForm().reset();
            main_form.down('hiddenfield[name=room_master_id]').setValue(roomID)
            index_form.setActiveItem(main_form);
            btn.up('window').close();

        }
    },

    saveFormCheckIn: function(btn) {

        var me = this; 
        var form = btn.up('form'),
            record = form.getRecord(),
            values = form.getValues();
        var store = this.getRoomTransactionCheckInStore();
        var check_in_detail_store = me.getRoomTransactionCheckInDetailStore();
        values["check_in_detail_attributes"] = Util.getItemStore(check_in_detail_store)
        if (form.isValid()) {
            if (record) {

                record.set(values);
            } else {
                var model = Ext.create('App.model.roomTransaction.CheckIn');
                model.set(values);
                store.add(model);


            };
           Ext.MessageBox.wait("Please wait while system is processing.........", "Get Data");

            store.sync({
                success: function() {
                    Ext.MessageBox.hide();
                    me.cancel(btn);                
                    check_in_detail_store.removeAll();


                    setTimeout(function() {
                        store.load();
                    }, 1000);

                    Ext.MessageBox.show({
                        title: 'Saved',
                        msg: 'Record Save Succeed.',
                        icon: Ext.MessageBox.INFO,
                        buttons: Ext.Msg.OK
                    });


                },
                failure: function(batch, option) {
                    Ext.MessageBox.hide();
                    store.rejectChanges();

                    var msg = option.batch.proxy.reader.rawData.message;
                    Ext.MessageBox.show({
                        title: 'Error',
                        msg: msg,
                        icon: Ext.MessageBox.ERROR,
                        buttons: Ext.Msg.OK
                    });
                }
            });

        } else {
            Util.msg("Please entry require field!");
        }
    },



})