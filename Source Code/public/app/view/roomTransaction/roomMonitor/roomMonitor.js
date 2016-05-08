

Ext.define('App.view.roomTransaction.roomMonitor.roomMonitor', {
    extend: 'Ext.button.Button',
    alias: 'widget.roomMonitorForm',    
    width:200 , 
    title:'Floor 01',
    margin:1 , 
    initComponent: function() {
        var me = this        
        var text = me.getText(me.roomData);
        Ext.apply(this, {
            text: text ,

            style:'background-color:'+me.roomData.color_status ,
        });
        this.callParent(arguments);

    },
    getText:function(data){
        var checkInDate = data.check_in_date == null ? "_" : data.check_in_date; 

        var text ="<div style='text-align:center;'>"+
                    "<h2 style='color:"+data.color_text+"'>"+data.room_no+"</h2>"+
                    "<p style='color:"+data.color_text+"'>"+checkInDate +"</p>"+
                "</div>";
        return text;
    },
    
});