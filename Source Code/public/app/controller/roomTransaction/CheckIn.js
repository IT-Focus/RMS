
Ext.define('App.controller.roomTransaction.CheckIn', {
    extend: 'Ext.app.Controller',
    views:[
        'roomTransaction.checkIn.Index',
        'roomTransaction.checkIn.Form'

    ],
    stores:[
    'combo.Nationality'
    ],
    init: function() {

        this.control({
            'CheckinIndex button[action=Add]':{
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
        var conatiner = btn.up('CheckinIndex');
        var form = conatiner.down('CheckinForm');
        form.getForm().reset();
        conatiner.setActiveItem(form);

    },

    save :function(btn){
        var store = this.getRoomTransactionCancelCheckinStore();
        var me = this ;
        Util.save(btn,store,'roomTransaction.CancelCheckin');


    },



})
