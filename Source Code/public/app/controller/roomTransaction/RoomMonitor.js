Ext.define('App.controller.roomTransaction.RoomMonitor', {
    extend: 'Ext.app.Controller',
    views: [
        'roomTransaction.roomMonitor.Index',
        // 'roomTransaction.roomMonitor.CheckInForm', 
        'roomTransaction.roomMonitor.CheckOutForm',
        'roomTransaction.checkIn.Form',
        'roomTransaction.roomMonitor.CustomerForm',
        'roomTransaction.roomMonitor.CancelCheckInForm',
        // 'roomTransaction.checkIn.WinNIDImage',
        // 'roomTransaction.checkIn.WinPassportImage',


    ],
    stores: [
        'setup.Floor',
        "roomTransaction.RoomMonitor",
        "setup.DefaultColor",
        // store for check in form
        'combo.Nationality',
        'combo.Discount',
        'combo.CategoryPrice',
        'combo.AvailableRooms',
        'combo.RoomList',
        'combo.Customer',
        'roomTransaction.CheckInDetail',
        'combo.RoomServiceMaster',
        'roomTransaction.CheckIn',
        'roomTransaction.CheckInRoomDetail',
        'setup.CategoryPrice',

        // store for cancel check in
        'roomTransaction.CancelCheckin',
        'combo.RoomList',
        'combo.AvailableRooms',

        // store for check out
        'roomTransaction.CheckOutItemDetail',
        // store for customer
        'roomTransaction.Customer',
    ],
    init: function() {


        this.control({
            'roomMonitorIndex button[action=loadRoomByFloor]': {
                click: this.loadRoomByFloor
            },

            'CheckinForm button[action=CancelCheckInForm]': {
                click: this.backToIndex
            },

            'roomMonitorIndex button[action=checkin]': {
                click: this.showFormCheckin
            },

            'roomMonitorIndex button[action=updateCheckIn]': {
                click: this.updateCheckIn
            },

            'roomMonitorIndex button[action=Refresh]': {
                click: this.refreshMonitor
            },
            'roomMonitorIndex button[action=btnfree]': {
                click: this.showFreeRoom
            },
            'roomMonitorIndex button[action=btnreserved]': {
                click: this.showReservedRoom
            },
            'roomMonitorIndex button[action=btnoccupied]': {
                click: this.showOccupiedRoom
            },
            'roomMonitorIndex button[action=btnlatecheckout]': {
                click: this.showLateCheckoutRoom
            },


            // === event on form check in 
            'roomMonitorIndex button[action=cancelCheckIn]': {
                click: this.showFormCancelCheckin
            },
            'CheckinForm button[action=add_NID_attachment]': {
                click: this.add_NID_image
            },
            'CheckinForm button[action=add_attachment]': {
                click: this.add_NID_image
            },
            'CheckinForm button[action=add_passport_attachment]': {
                click: this.test
            },
            'CheckinForm numberfield[name=no_person]': {
                change: this.check_people_allowance
            },
            'CheckinForm combo[name=customers_id]': {
                change: this.loadCustomer
            },
            'CheckinForm button[action=AddCustomer]': {
                click: this.add_customer
            },
            // Customer Form Events
            'CustomersForm button[action=cancel]':{
                click: this.cancel_customerForm
            },
            'CustomersForm button[action=Save]':{
                click: this.save_customerForm
            },
            //=== event check in detail 
            // 'CheckinForm grid[name=item_detail]': {
            //     edit: this.setRecord
            // },
            // 'CheckinForm button[action=AddItem]': {
            //     click: this.addRow
            // },
            'CheckinForm filefield[name=image]': {
                change: this.uploadNIDImage
            },


            'CheckinForm button[action=Remove_nid]': {
                click: this.removeImage
            },
            'cancelCheckinForm button[action=Cancel]': {
                click: this.winCancel
            },
            // 'cancelCheckinForm combo[name=room_no]':{
            //     select: this.filterCancelInDetail
            // },
            'cancelCheckinForm hiddenfield[name=room_no]': {
                change: this.filterCancelInDetail
            },
            'cancelCheckinForm button[action=Save]': {
                click: this.saveCancelCheckIn
            },


            // == check out 
            'roomMonitorIndex button[action=checkOut]': {
                click: this.showFormCheckout
            },
            'roomMonitorIndex button[action=Cancel]': {
                click: this.backToIndex
            },
            'checkOutForm button[action=CheckOut]': {
                click: this.checkCashierTransaction
            },
             // === event change rental plan 
           'CheckinForm radiofield[name=rental_type]':{
                change:this.toggleHideGrid
           }, 
          'CheckinForm datefield[name=estimated_check_out_date]':{
                change:this.updateNight
           }, 
           'CheckinForm combo[name=discount]':{
                select:this.discountRoomRent 
           }, 

        });
    },
    defaultColor: {},
    activedFloorId: "ALL",
    monitorIndexTmp: {},
    checkInFormTmp: {},
    tmpRoomID: {},
    tmpRoom: {},
    tempCheckinData: {},
    test: function(btn) {
        
    },
    discountRoomRent:function(field){
        var form = field.up('form');
        GlobalFunction.recalculateCheckInAmount(form);
    },
    updateNight:function(field , checkOutDate  ){
        var form = field.up('form');
        var values = form.getValues() ; 
        if (values.rental_type == 'rate') {
            var checkInDate = form.down('datefield[name=check_in_date]').getValue(); 
            var durationDay = checkOutDate.getDate() -  checkInDate.getDate() ;
            var store  = form.down('grid[name=roomDetailByRate]').getStore(); 
            store.data.each(function(rec){
                var totalAmount = durationDay * rec.get('unit_price'); 
                var taxAmount = 0 ; 
                rec.set('total_amount' , totalAmount);
                rec.set('qty' , durationDay) ; 
                if (GlobalFunction.globalParams.VAT == true  ) {
                    taxAmount =  (GlobalFunction.globalParams.VATValue /100) * totalAmount ; 
                    rec.set('tax_amount' , taxAmount  ); 
                }
                var grandTotal = totalAmount + taxAmount; 
                rec.set('grand_total_amount',grandTotal); 

            })
            GlobalFunction.recalculateCheckInAmount(form); 
            //debugger;
        }
    },
    toggleButtonBar:function(btn){
        var form = btn.up('form');
        var values = form.getValues();
        var isEdit = false ; 
        if(values.id > 0){
            // === form is edit mode
            isEdit= true ; 
        }

        form.down("button[action=SaveCheckIn]").setHidden(isEdit);
        form.down("button[action=CancelCheckIn]").setHidden(!isEdit);
        form.down("button[action=Paid]").setHidden(!isEdit);
        form.down("button[action=CheckOut]").setHidden(!isEdit);
        form.down("button[action=UpdateCheckIn]").setHidden(!isEdit);
     },
    toggleHideGrid:function(field ){
        
            var form = field.up('CheckinForm');
            var values = form.getValues() ; 
            
            if(values.rental_type == 'static_plan'){
                var formRate = form.down('panel[name=chargeByRate]');
                var fromStaticPlan = form.down('panel[name=chargeByStarticPlan]');
                var formDynamicPlan = form.down('panel[name=chargeByDynamicPlan]');
                formRate.setHidden(true); 
                formDynamicPlan.setHidden(true);
                fromStaticPlan.setHidden(false); 
                var tab = formRate.up('tabpanel');               
                formRate.tab.hide();
                formDynamicPlan.tab.hide(); 
                fromStaticPlan.tab.show(); 
                tab.setActive(fromStaticPlan);
            }else if(values.rental_type == 'dynamic_plan'){
                var formRate = form.down('panel[name=chargeByRate]');
                var fromStaticPlan = form.down('panel[name=chargeByStarticPlan]');
                var formDynamicPlan = form.down('panel[name=chargeByDynamicPlan]');
                formDynamicPlan.setHidden(false); 
                fromStaticPlan.setHidden(true); 
                formRate.setHidden(true); 
                var tab = formRate.up('tabpanel');               
                formRate.tab.hide();
                fromStaticPlan.tab.hide();  
                formDynamicPlan.tab.show(); 
                tab.setActive(formDynamicPlan);
            }else{
                var formRate = form.down('panel[name=chargeByRate]');
                var fromStaticPlan = form.down('panel[name=chargeByStarticPlan]');
                var formDynamicPlan = form.down('panel[name=chargeByDynamicPlan]');
                var tab = fromStaticPlan.up('tabpanel');               
                formRate.setHidden(false); 
                fromStaticPlan.setHidden(true);
                formDynamicPlan.setHidden(true);  
                formRate.tab.show(); 
                fromStaticPlan.tab.hide();
                formDynamicPlan.tab.hide(); 
                tab.setActive(formRate);
            }
    },

    loadCustomer: function(field) {
        var me = this,
            form = field.up('form'),
            values = field.getValue();
        Util.ajax("customer/get_customer_info", {
            customer_id: values
        }, me.filterCustomer, {
            form: form,
            me: me
        });
    },

    add_customer: function(btn){
        var me = this;
        var formCheckIn = btn.up('CheckinForm');
        var container = formCheckIn.up('roomMonitorIndex');
        var formCustomer = container.down('CustomersForm');
       
        formCustomer.getForm().reset();    
        container.setActiveItem(formCustomer);
    },

    save_customerForm: function(btn){
        // debugger;
        var me = this;
            store = me.getRoomTransactionCustomerStore(),
            formCustomer = btn.up('CustomersForm'),
            container = formCustomer.up('roomMonitorIndex'),
            formCheckIn = container.down('CheckinForm');
            container.setActiveItem(formCheckIn);
        Util.saveForm(btn, store, 'roomTransaction.Customer', me);
    },

    cancel_customerForm: function(btn){
        var formCustomer = btn.up('CustomersForm'),
            container = formCustomer.up('roomMonitorIndex'),
            formCheckIn = container.down('CheckinForm');
         
         container.setActiveItem(formCheckIn);  
    },  

    filterCustomer: function(obj, params) {
        // debugger;
        var form = params.form,
            me = params.me;
        if (obj.success == true) {
            var customer = obj.customer;
            customer.forEach(function(rec) {
                // Cutomer Info
                form.down('textarea[name=address]').setValue(rec.address);
                form.down('textfield[name=city]').setValue(rec.city);
                form.down('textfield[name=email]').setValue(rec.email);
                form.down('textfield[name=phone]').setValue(rec.phone);
                form.down('datefield[name=dob]').setValue(rec.dob);
                form.down('numberfield[name=national_no]').setValue(rec.national_no);
                // form.down('combo[name=national_id]').setValue(rec.national_id);
            });
        }
    },

    check_people_allowance: function(field) {
        var me = this,
            form = field.up('form'),
            values = form.getValues(),
            no_person = values.no_person,
            room_master_id = values.room_master_id;
        Util.ajax("room_master/check_people_allowance", {
            room_master_id: room_master_id,
            no_person: no_person
        }, me.alertPeopleAllowance, {
            form: form,
            me: me,
            no_person: no_person
        });
    },

    alertPeopleAllowance: function(obj, params) {
        if (obj.extra_pp == true) {
            var form = params.form,
                me = params.me,
                values = form.getValues(),
                no_person = parseInt(params.no_person),
                allow_pp = parseInt(obj.p_allowance),
                extra_person = no_person - allow_pp;
            total_extra_charge = parseInt(obj.extra_pp_charge) * extra_person

            form.down('numberfield[name=extra_person]').setValue(extra_person);
            form.down('numberfield[name=charge]').setValue(total_extra_charge);
            Util.msg("People allowance is " + allow_pp);
        }
    },



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


    checkCashierTransaction: function(btn) {
        var me = this;
        var form = btn.up('form');
        Util.ajax("check_outs/show", "", me.checkOutProcess, {
            form: form,
            me: me,
            btn: btn
        });
    },

    add_NID_image: function(btn) {
        
        // values = checkInFormTmp.getValues();
        // tmpCheckInForm = checkInFormTmp.down('hiddenfield[name=national_id_url]');
        var form = btn.up('form'),
            values = form.getValues(),
            record = form.getRecord();
        checkInFormTmp = btn.up('form');

        var win = Ext.create("App.view.roomTransaction.checkIn.WinNIDImage");
        win.show();
        win.center();
    },

    uploadNIDImage: function(field) {
        var form = field.up('form');
        if (form.getForm().isValid()) {
            form.getForm().submit({
                url: '/Images/upload_image',
                waitMsg: 'Uploading Image ...',
                success: function(formPanel, action) {
                    var data = Ext.decode(action.response.responseText);
                    form.down('image').setSrc(data.image_url)
                    form.down('hiddenfield').setValue(data.image_url);
                },
                failure: function(formPanel, action) {
                    var data = Ext.decode(action.response.responseText);
                    alert("Failure: " + data.data);
                }

            });
        }
    },
    removeImage: function(btn) {
        var form = btn.up('form');
        form.down('image').setSrc("");
    },
    saveNIDImage: function(btn) {
        debugger;
        var win = btn.up('window'),
            me = this;
        form = win.down('form'),
            container = win.up('roomMonitorIndex');
        values = form.getValues(),

            CheckInform = this.checkInFormTmp;
        CheckInform.down('hiddenfield[name=national_id_url]').setValue(values.background_url);
        // record = me.checkInFormTmp.getRecord();
        // record.set('national_id_url', values.background_url);

        win.close();
    },

    cancelNID: function(btn) {
        btn.up('window').close();
    },

    // checkOutProcess: function(obj, params) {

    //     if (obj.success == true) {
    //         var values = params.form.getForm().getValues();
    //         if (parseInt(values.grand_total_amount) <= parseInt(values.total_paid)) {
    //             Util.ajax("check_outs/create", values, params.me.printReceipt, {
    //                 form: params.form,
    //                 me: params.me,
    //                 btn: params.btn
    //             });
    //         } else {
    //             Util.msg("Amount must be bigger than grand total amount");
    //         }
    //     }
    // },
    // printReceipt: function(obj, params) {
    //     // params.me.backToIndex(params.form);
    //     // debugger;
    //     form = params.btn.up('form');
    //     store = form.down('grid').getStore();
    //     store.removeAll();
    //     // window.open('check_outs/print?id=' + obj.data.id);

    // },
    showFormCheckout: function(btn) {
        var me = this;
        var container = btn.up('roomMonitorIndex');
        this.monitorIndexTmp = container;
        var formCheckOut = container.down('checkOutForm');
        var room_id = btn.roomId;
        Util.ajax("check_outs/index", {
            room_id: room_id
        }, me.loadCheckOutInfo, {
            formCheckOut: formCheckOut,
            ctrl: me
        })
        formCheckOut.getForm().reset();
        // formCheckOut.down('hiddenfield[name=room_master_id]').setValue(btn.roomId);        
        container.setActiveItem(formCheckOut);
    },
    loadCheckOutInfo: function(obj, params) {
        var formCheckOut = params.formCheckOut;
        var check_in_data = obj.check_in;
        var item_detail = obj.detail;
        // debugger;
        formCheckOut.getForm().setValues(check_in_data);
        formCheckOut.down('textfield[name=check_in_date]').setValue(Ext.util.Format.dateRenderer('Y-m-d')(check_in_data.check_in_date));
        formCheckOut.down('textfield[name=check_in_time]').setValue(Ext.util.Format.dateRenderer('H:i')(check_in_data.check_in_time));
        formCheckOut.down('textfield[name=estimated_check_out_date]').setValue(Ext.util.Format.dateRenderer('Y-m-d')(check_in_data.estimated_check_out_date));
        formCheckOut.down('textfield[name=estimated_check_out_time]').setValue(Ext.util.Format.dateRenderer('H:i')(check_in_data.estimated_check_out_time));
        var store = params.ctrl.getRoomTransactionCheckOutItemDetailStore();
        store.removeAll();
        item_detail.forEach(function(rec) {
            var model = Ext.create("App.model.roomTransaction.CheckOutItemDetail");
            model.set(rec);
            store.add(model);
        });



    },

    tmpCheckinDetailStore: {},


    backToIndex: function(btn) {
        var container = btn.up("roomMonitorIndex");
        var indexForm = container.down("form[name=indexPage]");
        container.setActiveItem(indexForm);
        var store = this.getRoomTransactionCheckInDetailStore();
        store.removeAll();
        this.refreshMonitor(btn);
    },

    winCancel: function(btn) {
        var me = this;
        var indexPage = me.monitorIndexTmp.down("form[name=indexPage]");
        me.clearRoomMonitor(indexPage);
        me.addRoomMonitor(indexPage, me.activedFloorId);
        btn.up('window').close();

    },
    // updateCheckIn: function(btn) {
    //     // debugger;
    //     var me = this;
    //     var storeCheckDetail = me.getRoomTransactionCheckInDetailStore();
    //     tmpCheckinDetailStore = storeCheckDetail;

    //     Util.ajax('CheckInDetail/get_checkin_detail', {
    //         room_id: btn.roomId
    //     }, this.loadRecordToForm, btn)
    // },
    updateCheckIn: function(btn) {
        // debugger;
        var me = this;
      //  var storeCheckDetail = me.getRoomTransactionCheckInDetailStore();       

        Util.ajax('CheckIn/edit', {
            check_in_id: btn.checkInId
        }, this.loadRecordToForm, {btn:btn , me:me })
    },
    loadRecordToForm: function(obj, params) {
        
        var container = params.btn.up('roomMonitorIndex');
        var formCheckIn = container.down('CheckinForm');
        var model = Ext.create("App.model.roomTransaction.CheckInDetail");
        formCheckIn.getForm().reset() ; 
        //==== calculate balance
        var data = obj.data ;
        tempCheckinData = obj.data; 
        data.grand_total_amount =(data.total_amount-data.discount_amount)  - data.paid_booking ; 

        formCheckIn.getForm().setValues(data);
        
        
        formCheckIn.getForm().setValues({
            check_in_time:obj.check_in_time , 
            estimated_check_out_time:obj.estimated_check_out_time,
            room_master_id:obj.room_master_id
        }) ; 
        // ======== load store detail 
        var store = params.me.getRoomTransactionCheckInDetailStore();
        
        store.load({
            params:{
                check_in_id : obj.data.id 
            }
        });
        var idField = formCheckIn.down('hiddenfield[name=id]'); 
        params.me.toggleButtonBar(idField);
        params.me.toggleHideGrid(idField);
     
        container.setActiveItem(formCheckIn);
        
    },
    saveCancelCheckIn: function(btn) {
        // debugger;
        var store = this.getRoomTransactionCancelCheckinStore();
        var me = this;
        Util.save(btn, store, 'roomTransaction.CancelCheckin');


        
    },
    filterCancelInDetail: function(field) {
        value = field.getValue()
        Util.ajax('CheckInDetail/get_checkin_detail', {
            room_id: value
        }, this.loadRecordToTextfield, field)
    },
    loadRecordToTextfield: function(obj, field) {
        win = field.up('window')

        win.down("textfield[name=check_in_code]").setValue(obj.check_in_code);
        win.down("datefield[name=check_in_date]").setValue(obj.check_in_date);
    },

    getRoomMonitor: function(indexView, status_id) {
        var me = this;
        var roomStore = me.getStore("roomTransaction.RoomMonitor");
        roomStore.load({
            params: {
                status_id: status_id
            },
            callback: function(records) {
                records.forEach(function(record) {

                    var button = me.generateRoomForm(record.getData(), indexView);
                });
            },
            scope: this
        });
    },
    showFreeRoom: function(btn) {
        var indexView = btn.up("roomMonitorIndex").down("form[name=indexPage]");
        me = this;
        me.clearRoomMonitor(indexView);
        me.getRoomMonitor(indexView, 1)
    },

    showReservedRoom: function(btn) {
        var indexView = btn.up("roomMonitorIndex").down("form[name=indexPage]");
        me = this;
        me.clearRoomMonitor(indexView);
        me.getRoomMonitor(indexView, 2)
    },
    showOccupiedRoom: function(btn) {
        var indexView = btn.up("roomMonitorIndex").down("form[name=indexPage]");
        me = this;
        me.clearRoomMonitor(indexView);
        me.getRoomMonitor(indexView, 3)
    },
    showLateCheckoutRoom: function(btn) {
        var indexView = btn.up("roomMonitorIndex").down("form[name=indexPage]");
        me = this;
        me.clearRoomMonitor(indexView);
        me.getRoomMonitor(indexView, 4)
    },
    showFormCheckin: function(btn) {

        var me = this;
        var container = btn.up('roomMonitorIndex');
        var formCheckIn = container.down('CheckinForm');
        checkInFormTmp = formCheckIn;
        formCheckIn.getForm().reset();


        formCheckIn.down('hiddenfield[name=room_master_id]').setValue(btn.roomId);
        me.addRoomToCheckIn(btn.roomId);
        container.setActiveItem(formCheckIn);

        // set date 
        var today = new Date(); 
        var tmr = new Date(); 
          tmr.setDate(today.getDate()+1 ); 
        var checkOutField = formCheckIn.down('datefield[name=estimated_check_out_date]') ; 
        var checkInField = formCheckIn.down('datefield[name=check_in_date]'); 

        formCheckIn.down('timefield[name=check_in_time]').setValue(today); 

        checkOutField.setValue(tmr);
        checkOutField.setMinValue(tmr) ;
        checkInField.setMaxValue(tmr);
        
        this.toggleButtonBar(checkOutField);
        this.toggleHideGrid(checkOutField);
        setTimeout(function() {
            GlobalFunction.recalculateCheckInAmount(formCheckIn);
            
        }, 500);
    },
    
    showFormCancelCheckin: function(btn) {
        var me = this;
        var win = Ext.create("App.view.roomTransaction.roomMonitor.CancelCheckInForm");
        win.show();
        win.center();
      
        win.down('hiddenfield[name=room_no]').setValue(btn.roomId);
        // win.down('hiddenfield[name=room_no]').focus(true , 300 );
    },
    addRoomToCheckIn: function(roomId) {
        // debugger;
        var model = Ext.create("App.model.roomTransaction.CheckInDetail"),
            storeCheckDetail = this.getRoomTransactionCheckInDetailStore(),
            storeRoom = this.getRoomTransactionRoomMonitorStore(),
            room = storeRoom.getById(roomId);
        tmpRoomID = roomId;

        var roomRate = room.get('tariff'); 

        tmpRoom = room.get('room_no');
        model.set('room_master_id', roomId);
        model.set('unit_price',roomRate);
        model.set('qty', 1);
        model.set('categroy_price_id', 1);
        // model.set('category_price_name', '3 Hours');
        // model.set('description', room.get('room_no'));
        model.set('room_no', room.get('room_no'));
        model.set('check_in_date', Ext.Date.format(new Date(), 'Y-m-d'));
        model.set('tran_type', 'RE');
        model.set('total_amount' ,roomRate ); 
        model.set('discount_amount' ,0 );
        model.set('tax_amount' ,0 );
        if (room.get('is_include_tax') == 1 && GlobalFunction.globalParams.VAT == true) {

            var taxAmount = (GlobalFunction.globalParams.VATValue /100) * roomRate
            model.set('tax_amount' ,taxAmount );
            
        }

        storeCheckDetail.add(model);

    },
    refreshMonitor: function(btn) {

        var indexView = btn.up("roomMonitorIndex").down("form[name=indexPage]");
        // debugger;
        var me = this;
        me.monitorIndexTmp = btn.up("roomMonitorIndex");
        me.clearRoomMonitor(indexView);
        me.addRoomMonitor(indexView, me.activedFloorId);
    },

    getRoomData: function(index) {
        var me = this,
            indexView = index.down("form[name=indexPage]");
        me.monitorIndexTmp = indexView;
        me.clearRoomMonitor(indexView);
        me.addRoomMonitor(indexView, me.activedFloorId);
    },

    loadRoomByFloor: function(btn) {
        var floorId = btn.value;
        this.activedFloorId = floorId;
        var indexView = btn.up("roomMonitorIndex").down("form[name=indexPage]");
        this.clearRoomMonitor(indexView);
        this.addRoomMonitor(indexView, floorId);
    },

    loadDefaultColor: function() {
        var storeDefaultColor = this.getStore("setup.DefaultColor");
        var me = this;

        storeDefaultColor.load({
            callback: function(records) {
                records.forEach(function(record) {
                    me.defaultColor = record.data;
                });
            },
            scope: this
        });
    },
    showFormOption: function() {

    },
    addRoomStatusColor: function(indexView) {
        var bbar = indexView.down("toolbar[dock=bottom]");
        var color = this.defaultColor;
        var panel = this.getFooterText(color);

        bbar.add(panel);
    },
    addRoomMonitor: function(indexView, floor) {
        // debugger;
        var me = this;
        var roomStore = me.getStore("roomTransaction.RoomMonitor");
        roomStore.load({
            params: {
                floor: floor
            },
            callback: function(records) {
                records.forEach(function(record) {

                    var data = record.data;
                    var button = me.generateRoomForm(data, indexView);
                });
            },
            scope: this
        });
    },
    generateRoomForm: function(data, indexView) {
        // debugger;

        var me = this;

        switch (data.status_id) {
            case 1:

                data.color_status = me.defaultColor.free;
                data.color_text = me.defaultColor.free_text_color;
                break;
            case 2:
                data.color_status = me.defaultColor.reserved;
                data.color_text = me.defaultColor.reserved_text_color;
                break;
            case 3:
                data.color_status = me.defaultColor.occupied;
                data.color_text = me.defaultColor.occupied_text_color;
                break;
            case 4:
                data.color_status = me.defaultColor.late_checkout;
                data.color_text = me.defaultColor.late_checkout_text_color;
                break;
        }

        var panel = Ext.create("App.view.roomTransaction.roomMonitor.roomMonitor", {
            roomData: data
        });

        indexView.add(panel);
    },
    showButtonFloor: function(indexView) {
        var me = this;
        var floorStore = this.getStore("setup.Floor");
        floorStore.load({
            callback: function(records) {
                records.forEach(function(record) {
                    var data = record.data;
                    var button = me.generateButton(data);
                    me.addBtnToGrid(button, indexView);
                });
                //== add button refresh 
                me.addBtnRefresh(indexView);
            },
            scope: this
        });
    },

    addBtnToGrid: function(btn, grid) {

        var tbar = grid.down("toolbar");
        tbar.add(btn);
    },
    generateButton: function(data) {
        var button = Ext.create("Ext.button.Button", {
            text: data.name,
            action: "loadRoomByFloor",
            value: data.id
        });
        return button;
    },
    edit: function(btn) {
        var rec = Util.getRecord(btn, "Please select record for edit ");
        if (rec) {
            var conatiner = btn.up('userIndex');
            var form = conatiner.down('userForm');
            form.getForm().loadRecord(rec);
            conatiner.setActiveItem(form);
        };

    },
    add: function(btn) {
        var conatiner = btn.up('userIndex');
        var form = conatiner.down('userForm');
        form.getForm().reset();
        conatiner.setActiveItem(form);

    },

    save: function(btn) {
        var store = this.getAdminUserStore();
        var me = this;
        Util.saveForm(btn, store, 'admin.User', me);


    },
    cancel: function(btn) {
        var conatiner = btn.up('userIndex');
        var grid = conatiner.down('grid[name=index]');
        conatiner.setActiveItem(grid);
    },
    delete: function(rec, grid) {
        var store = grid.getStore();
        Ext.MessageBox.confirm('Confirm', 'Are you sure to Delete this record?',
            function(btn) {
                if (btn == 'yes') {
                    store.remove(rec);
                    store.sync();
                };
            });

    },
    //======================= private  function 
    clearRoomMonitor: function(indexView) {
        indexView.removeAll();
    },
    getFooterText: function(color) {

        var panel = Ext.create("Ext.panel.Panel", {

            layout: 'hbox',
            width: '100%',
            items: [{
                xtype: 'label',
                text: 'Free :'
            }, {
                xtype: 'button',
                style: 'background-color:' + color.free + ';margin-right:10px',
                action: 'btnfree',
                height: 20
            }, {
                xtype: 'label',
                text: ' Reserved :'
            }, {
                xtype: 'button',
                style: 'background-color:' + color.reserved + ';margin-right:10px',
                action: 'btnreserved',
                height: 20
            }, {
                xtype: 'label',
                text: ' Occupied :'
            }, {
                xtype: 'button',
                style: 'background-color:' + color.occupied + ';margin-right:10px',
                action: 'btnoccupied',
                height: 20
            }, {
                xtype: 'label',
                text: ' Late Checkout :'
            }, {
                xtype: 'button',
                style: 'background-color:' + color.late_checkout + ';margin-right:10px',
                action: 'btnlatecheckout',
                height: 20
            }, ]
        });
        return panel;
    },
    addBtnRefresh: function(indexView) {
        var me = this;
        me.addBtnToGrid("->", indexView);

        var button = Ext.create("Ext.button.Button", {
            text: 'Refresh',
            action: 'Refresh',
            iconCls: 'icon-refresh',

        });
        me.addBtnToGrid(button, indexView);

    },



})