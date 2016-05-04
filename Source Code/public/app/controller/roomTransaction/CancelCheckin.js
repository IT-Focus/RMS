
Ext.define('App.controller.roomTransaction.CancelCheckin', {
    extend: 'Ext.app.Controller',
    views:[
        'roomTransaction.cancelCheckin.Index',
        'roomTransaction.cancelCheckin.Form'

    ],
    stores:[
        'roomTransaction.CancelCheckin',
        'combo.RoomList'
    ],
    init: function() {

        this.control({
            'cancelCheckinIndex button[action=Add]':{
                click: this.add
            },
            'cancelCheckinForm button[action=Save]':{
                click: this.save
            },
            'cancelCheckinForm button[action=Cancel]':{
                click: this.cancel
            },
            'cancelCheckinForm combo[name=room_no]':{
                select: this.filterCancelInDetail
            }
            // 'Viewport > fmMenu':{
            //  // afterrender
            // }

        });
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

    cancel: function(btn) {
        btn.up('window').close();
    },
    add:function(btn){
        var win = Ext.create("App.view.roomTransaction.cancelCheckin.Form");
        win.show();
        win.center();
        win.down('combo[name=room_no]').focus(true , 300 );

    },

    save :function(btn){
        var store = this.getRoomTransactionCancelCheckinStore();
        var me = this ;
        Util.save(btn,store,'roomTransaction.CancelCheckin');


    },



})
