Ext.define('App.view.roomTransaction.roomMonitor.roomMonitor', {
    extend: 'Ext.button.Button',
    alias: 'widget.roomMonitorForm',
    width: 200,
    action: 'roomMonitor',
    margin: 1,
    initComponent: function() {
        var me = this;
        var data = me.roomData;
        var text = me.getText(data);

        Ext.apply(this, {
            text: text,
            style: 'background-color:' + data.color_status,
            data: data,
            tooltip: me.getToolTip(data),
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
                        textAlign: 'left'
                            // handler: onButtonClick
                    },
                    items: me.getMenuList(data)
                }
            }
        });
        this.callParent(arguments);

    },
    getToolTip: function(data) {
        switch (data.status_id) {
            case 1:
                // Free
                var information = "<p>" + data.room_no + "<span style='margin-left: 40px'>" + data.category_name + "</span><span style='margin-left: 40px'>" + data.status_name + "</span></p>";
                break;
            case 2:
                // Reserved 

                // var information = "<p>" + data.room_no + "<span style='margin-left: 40px'>" + data.category_name + "</span><span style='margin-left: 40px'>" + data.status_name + "</span></p><br><p>Guest Name:" + data.customer + "</p><p>Address:" + data.address + " </p><p>Check In Date:" + data.check_in_date + data.check_in_time + " </p><p>Estimate Check Out Date:" + data.estimated_check_out + " </p><p>Rent Type: </p> ";

                var information = "<p>" + data.room_no + "<span style='margin-left: 40px'>" + data.category_name + "</span><span style='margin-left: 40px'>" + data.status_name + "</span></p><br><p>Guest Name:" + data.customer + "</p><p>Address:" + data.address + " </p><p>Check In Date:" + data.check_in_date + " </p><p>Estimate Check Out Date:" + data.estimated_check_out + " </p><p>Rent Type: " + data.category_price + " </p> ";


                break;
            case 3:
                // Occupied
                var information = "<p>" + data.room_no + "<span style='margin-left: 40px'>" + data.category_name + "</span><span style='margin-left: 40px'>" + data.status_name + "</span></p><br><p>Guest Name:<span style='margin-left: 20px'>" + data.customer_name + "<span></p><p>Address:<span style='margin-left: 20px'>" + data.address + "</span> </p><p>Check In Date:<span style='margin-left: 20px'>" + data.check_in_date + "    " + data.check_in_time + "</span> </p><p>Estimate Check Out Date:<span style='margin-left: 20px'>" + data.estimated_check_out + "    " + data.estimated_check_out_time + "</span> </p><p>Rent Type: " + data.rt + " </p> ";

                break;
            case 4:
                // Late Checkout 
                var information = "<p>" + data.room_no + "<span style='margin-left: 40px'>" + data.category_name + "</span><span style='margin-left: 40px'>" + data.status_name + "</span></p><br><p>Guest Name:<span style='margin-left: 20px'>" + data.customer_name + "<span></p><p>Address:<span style='margin-left: 20px'>" + data.address + "</span> </p><p>Check In Date:<span style='margin-left: 20px'>" + data.check_in_date + "</span> </p><p>Estimate Check Out Date:<span style='margin-left: 20px'>" + data.estimated_check_out + "</span> </p><p>Rent Type: " + data.rt + "</p> ";
                break;
        }
        return information;
    },

    getText: function(data) {
        // var checkInDate = data.check_in_date == null  ? "_" : data.check_in_date+"   "+data.check_in_time; 

        if (data.check_in_date == null || data.status_code == 12) {
            var checkInDate = "_";
        } else {
            var checkInDate = data.check_in_date + "   " + data.check_in_time;
        }
        var text = "<div style='text-align:center;'>" +
            "<p style='color:" + data.color_text + "'>" + data.floor_name + " </p>" +
            "<h2 style='color:" + data.color_text + "'>" + data.room_no + "</h2>" +
            "<p style='color:" + data.color_text + "'>" + checkInDate + "</p>" +
            "</div>";
        return text;
    },
    getMenuList: function(data) {
        var menuOption = {};
        var me = this;

        switch (data.status_id) {
            case 1:
                menuOption = me.getFreeMenuList(data);
                break;
            case 2:
                menuOption = me.getReserveMenuList(data);
                break;
            case 3:
                menuOption = me.getOccupiedMenulist(data);
                break;
            case 4:
                menuOption = me.getLateCheckoutlist(data);
                break;

        };

        return menuOption;
    },
    getOccupiedMenulist: function(data) {
        var id = data.check_in_id,
            roomId = data.id;
        var menuList = [
            /*{
                // colspan: 2,
                width: '100%',
                text: 'Check Out',
                scale: 'small',
                action: 'checkOut',
                iconCls: 'icon-check_out',
                roomId: id,
                width: 200
            },*/ {
                // colspan: 2,
                width: '100%',
                text: 'Show Check In',
                scale: 'small',
                action: 'updateCheckIn',
                iconCls: 'icon-update_check_in',

                checkInId: id,

                width: 200
            },
            // {
            //     // colspan: 2,
            //     width: '100%',
            //     text: 'Estimate Bill ',
            //     scale: 'small',
            //     action:'estimateBill',
            //      roomId:id,
            //     width: 200
            // },
            // {
            //     // colspan: 2,
            //     width: '100%',
            //     text: 'Cancel Check In',
            //     iconCls: 'icon-cancel',
            //     scale: 'small',
            //     action: 'cancelCheckIn',
            //     roomId: roomId,
            //     width: 200
            // }
        ]

        return menuList;
    },
    getLateCheckoutlist: function(data){
        var id = data.check_in_id;
        var menuList = [
            {
                // colspan: 2,
                width: '100%',
                text: 'Show Check In',
                scale: 'small',
                action: 'updateCheckIn',
                iconCls: 'icon-update_check_in',

                checkInId: id,

                width: 200
            },
            {
                width: '100%',
                text: 'Cancel Check In',
                iconCls: 'icon-cancel',
                scale: 'small',
                action: 'cancelCheckIn',
                roomId: id,
                width: 200
            }
        ]

        return menuList;
    },
    getReserveMenuList: function(data) {
        var id = data.id;
        var menuList = [{
            // colspan: 2,
            // width: '100%',
            text: 'Check In',
            iconCls: 'icon-ok',
            scale: 'small',
            action: 'checkin',
            value: id,
            width: 200
        }, {
            width: '100%',
            text: "Customer Arrival",
            iconCls: 'icon-calander',
            scale: 'small',
            value: id,
            action: 'CustomerArraive',
            width: 200
        }, {
            width: '100%',
            text: "Cancel Check in",
            iconCls: 'icon-calander',
            scale: 'small',
            // value:id, 
            roomId: id,
            action: 'CancelCheckIn',
            width: 200
        }]

        return menuList;

    },
    getFreeMenuList: function(data) {
        
        var id = data.id;
        var menuList = [{
            // colspan: 2,
            width: '100%',
            text: 'Check In',
            scale: 'small',
            iconCls: 'icon-ok',
            action: 'checkin',
            roomId: id,
            width: 200,

        }, {
            width: '100%',
            text: 'Reserve',
            scale: 'small',
            iconCls: 'icon-calendar',
            action: 'reserve',
            roomId: id,
            width: 200

        }]

        return menuList;

    }

});