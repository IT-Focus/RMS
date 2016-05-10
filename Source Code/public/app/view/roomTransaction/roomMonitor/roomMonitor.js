Ext.define('App.view.roomTransaction.roomMonitor.roomMonitor', {
    extend: 'Ext.button.Button',
    alias: 'widget.roomMonitorForm',    
    width:200 , 
    action:'roomMonitor',
    margin:1 , 
    initComponent: function() {
        var me = this       ;
        var data = me.roomData; 
        var text = me.getText(me.roomData);
       

        Ext.apply(this, {
            text: text ,
            style:'background-color:'+data.color_status ,
            data:data,
            tooltip:me.getToolTip(data),
             menu: {
                xtype: 'menu',
                plain: true,
                items: {
                    xtype: 'buttongroup',
                    // title: 'Table options',
                    columns: 1,
                    defaults: {
                        xtype: 'button',
                        scale: 'large',
                        iconAlign: 'left',
                        textAlign:'left'
                        // handler: onButtonClick
                    },
                    items: me.getMenuList(data)
                }
            }
        });
        this.callParent(arguments);

    },
    getToolTip:function(data){
        if (data.check_in_date == null){
            
            var information = "Free"; 

        } else{
            var information = "Not free"; 

        }
        return information;
    },

    getText:function(data){
        var checkInDate = data.check_in_date == null ? "_" : data.check_in_date; 

        var text ="<div style='text-align:center;'>"+
                    "<p style='color:"+data.color_text+"'>"+data.floor_name+" </p>"+
                    "<h2 style='color:"+data.color_text+"'>"+data.room_no+"</h2>"+
                    "<p style='color:"+data.color_text+"'>"+checkInDate +"</p>"+
                "</div>";
        return text;
    },
    getMenuList:function(data){
        var menuOption ={}; 
        var me = this ; 
        console.log(data.status_id);
        switch(data.status_id){
            case 1 : 
                menuOption = me.getFreeMenuList(data);
                break; 
            case 2 : 
                menuOption = me.getReserveMenuList(data);
                break; 
            case 3 : 
                menuOption = me.getOccupiedMenulist(data);

        }; 
       
        return menuOption; 
    }, 
    getOccupiedMenulist:function(data){
        var id = data.id ; 
          var menuList = [{
                        // colspan: 2,
                        width: '100%',
                        text: 'Check Out',
                        scale: 'small',
                        action:'checkin',
                        iconCls:'icon-transfer',
                        value:id,
                        width: 200
                    },{
                        // colspan: 2,
                        width: '100%',
                        text: 'Estimate Bill ',
                        scale: 'small',
                        action:'checkin',
                        value:id,
                        width: 200
                    },{
                        // colspan: 2,
                        width: '100%',
                        text: 'Cancel Check In',
                        iconCls:'icon-ok',
                        scale: 'small',
                        action:'checkin',
                        value:id,
                        width: 200
                    }]

        return menuList; 
    },
    getReserveMenuList:function(data){
        var id = data.id ; 
         var menuList = [{
                        // colspan: 2,
                        width: '100%',
                        text: 'Check In',
                        iconCls:'icon-ok',
                        scale: 'small',
                        action:'checkin',
                        value:id,
                        width: 200
                    }]

        return menuList; 

    }, 
    getFreeMenuList:function(data){
         var id = data.id;
         var menuList = [{
                        // colspan: 2,
                        width: '100%',
                        text: 'Check In',
                        scale: 'small',
                        iconCls:'icon-ok',
                        action:'checkin',
                        value:id,
                        width: 200
                    },{
                        width: '100%',
                        text: 'Reserve',
                        scale: 'small',
                        iconCls:'icon-calendar',
                        action:'reserve',
                        value:id,
                        width: 200

                    }]

        return menuList; 

    }

});