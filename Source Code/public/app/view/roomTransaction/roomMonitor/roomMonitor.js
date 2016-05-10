Ext.define('App.view.roomTransaction.roomMonitor.roomMonitor', {
    extend: 'Ext.button.Button',
    alias: 'widget.roomMonitorForm',    
    width:200 , 
    action:'roomMonitor',
    margin:1 , 
    initComponent: function() {
        var me = this        
        var text = me.getText(me.roomData);
        var id = me.roomData.id;

        Ext.apply(this, {
            text: text ,

            style:'background-color:'+me.roomData.color_status ,
            data:me.roomData,
            tooltip:me.getToolTip(me.roomData),
             menu: {
                xtype: 'menu',
                plain: true,
                items: {
                    xtype: 'buttongroup',
                    title: 'Table options',
                    columns: 2,
                    defaults: {
                        xtype: 'button',
                        scale: 'large',
                        iconAlign: 'left',
                        // handler: onButtonClick
                    },
                    items: [{
                       
                        width: '100%',
                        text: 'Check In',
                        scale: 'small',
                        action:'checkin',
                        value:id,
                        width: 200
                    }]
                }
            }
        });
        this.callParent(arguments);

    },
    getToolTip:function(data){
        var information = "Need more information"; 
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
    
});