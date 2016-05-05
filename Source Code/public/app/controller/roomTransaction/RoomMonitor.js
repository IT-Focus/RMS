
Ext.define('App.controller.roomTransaction.RoomMonitor', {
    extend: 'Ext.app.Controller',
    views:[
        'roomTransaction.roomMonitor.Index',

    ],
    stores:[
    ],
    init: function() {

        this.control({
            'userIndex button[action=Add]':{
                click: this.add
            },
            'userIndex button[action=Edit]':{
                click: this.edit
            },
            'userForm button[action=Save]':{
                click: this.save
            },
            'userForm button[action=Cancel]':{
                click: this.cancel
            },
            // 'Viewport > fmMenu':{
            //  // afterrender
            // }

        });
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

      


})
