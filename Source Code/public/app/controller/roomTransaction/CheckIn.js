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
        'roomTransaction.checkin.GetRoomForm'

    ],
    stores: [
        'combo.Nationality',
        'combo.Discount',
        'combo.AvailableRooms',
        'roomTransaction.CheckIn'
    ],
    init: function() {
        this.control({
            'CheckinIndex button[action=Add]': {
                click: this.add
            },

            'CheckinForm button[action=Save]': {
                click: this.save
            },
            'CheckinForm button[action=Cancel]': {
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
            // '#loginwindow combo': {
            //     specialkey: this.keyenter
            // },


            // 'Viewport > fmMenu':{
            //  // afterrender
            // }

        });
    },
    main_form: "",
    index_form: "",
    roomID: "",
    checkin_close: "",
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
        var conatiner = btn.up('CheckinIndex');
        var grid = conatiner.down('grid[name=index]');
        conatiner.setActiveItem(grid);
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

    keyenter: function (item, event) {
        if (event.getKey() == event.ENTER) {
            roomID = item.value;
            if (roomID !== null){
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
        var store = this.getRoomTransactionCheckInStore();
        var me = this;
        Util.saveForm(btn, store, 'roomTransaction.CheckIn', me);


    },



})