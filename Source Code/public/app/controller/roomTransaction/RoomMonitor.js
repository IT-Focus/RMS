
Ext.define('App.controller.roomTransaction.RoomMonitor', {
    extend: 'Ext.app.Controller',
    views:[
        'roomTransaction.roomMonitor.Index',

    ],
    stores:[
        'setup.Floor', 
        "roomTransaction.RoomMonitor",
        "setup.DefaultColor"
    ],
    init: function() {


        this.control({
            'roomMonitorIndex roomMonitorForm':{
                click: this.showFormOption
            },
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
      

        });
    },
    defaultColor:{}, 
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
    addRoomMonitor:function(indexView){
        var me = this ; 
        var roomStore = me.getStore("roomTransaction.RoomMonitor");
        roomStore.load({
            callback:function( records ){
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

      


})
