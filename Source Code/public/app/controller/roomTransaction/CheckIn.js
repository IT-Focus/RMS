Ext.define('App.controller.roomTransaction.CheckIn', {
    extend: 'Ext.app.Controller',
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

            'CheckinForm button[action=Save]': {
                click: this.save
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
            //=== event check in detail 
            'CheckinForm grid[name=item_detail]': {
                edit: this.setRecord
                
                
            },
             //=== event check in detail 
            'CheckinForm grid[name=roomDetail]': {
                edit: this.setRecordRoomDetail
                
                
            },


        });

        
    },
    main_form: "",
    index_form: "",
    roomID: "",
    checkin_close: "",
    room_master_id_tem:"",
    itemRecord:{},
    tmpRoom:{},
    tmpRoomData:Ext.create("App.model.roomTransaction.CheckInDetail") , 
    filterItemPrice: function(editor, e) {
        debugger;
        var grid = e.grid,
            form = grid.up('form'),
            me = this;
        var record = grid.getStore().getAt(e.rowIdx);
        console.log("edit to room detail =========", e.colIdx,record); 

        switch (e.colIdx) {
            case 2:

                if (record.get("room_master_id") > 0) {
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
        conatiner.setActiveItem(indexForm);
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

    setRecordRoomDetail: function(editor, e){
        var grid = e.grid,
            me = this;
        var record = grid.getStore().getAt(e.rowIdx);
        if (me.tmpRoomData) {
                var values = me.tmpRoomData; //get record form grid/combobox
                record.set("rent_charge", values.charge_amount);
                me.tmpRoomData = false;

            };
    },
    setRecord: function(editor, e){
        
        
        var grid = e.grid,
            me = this;
        var record = grid.getStore().getAt(e.rowIdx);
        if (me.itemRecord) {
                var values = me.itemRecord; //get record form grid/combobox
                record.set("id", values.id);
                record.set("qty", 1);
                record.set("unit_price", values.charge_amount);
                record.set("total_amount", record.get("unit_price") * record.get("qty"));
                me.itemRecord = false;

            };

    },
    addRow: function(btn) {
        var store = btn.up('grid').getStore();
        var model = Ext.create("App.model.roomTransaction.CheckInDetail");
        model.set("check_in_id", null);
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

    save: function(btn) {
        // var store = this.getRoomTransactionCheckInStore();
        // var me = this;
        // Util.saveForm(btn, store, 'roomTransaction.CheckIn', me);

        me = this
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
                    store.load();
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