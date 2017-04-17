Ext.define('App.view.roomTransaction.checkIn.Form', {
    extend: 'Ext.form.Panel',
    alias: 'widget.CheckinForm',
    bodyPadding:20 ,
    // border: true,
    autoScroll: true,
    layout: {
        type: 'table',
        columns: 2
    },
    
    buttons: [
        {
            text: 'Cancel',
            action: 'CancelCheckInForm',
            iconCls: 'icon-cancel'
        },
        {
            text: 'Update Check In',
            action: 'UpdateCheckIn',
            iconCls: 'icon-save'
        }, 
        {
            text: 'Check In',
            iconCls: 'icon-save',
            action: 'SaveCheckIn',
            // handler:function(btn){                
            //     var ctrl = App.app.getRoomTransactionCheckInController(); 
            //     ctrl.saveFormCheckIn(btn); 
            // }
        },{
            text:'Cancel CheckIn',
            iconCls:'icon-terminateAccount',
            action:'CancelCheckIn'
        },{
            text:'Paid',
            iconCls:'icon-pay',
            action:"Paid"
        },{
            text:'CheckOut',
            action:"CheckOut", 
            iconCls:'icon-cashtransfer'
        }
    ],

    initComponent: function() {

        // var me = this;
        Ext.apply(this, {
            items: [

                this.customerInfoForm(),
                this.rentDetailForm(),                
                this.getGrid(),
                this.totalForm(),
            ]
        });
        this.callParent(arguments);
    },


    customerInfoForm: function() {
        form = {
            xtype: 'fieldset',
            title: 'Customer Info',
            autoWidth: true,
           colspan: 2, 
            layout:{
                type:'table', 
                columns:2
            },
            defaults: {
                // style:'margin:10px',
                allowBlank: false,
                width: '98%',
                style: 'margin-left:10px'
            },
            items: [{
                    xtype: 'hiddenfield',
                    name: 'room_master_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'id'
                },  {
                    xtype: 'checkbox',
                    boxLabel: 'Throught Revervation',
                    style: 'margin-left:20%'
                }, {
                    layout: 'hbox',
                    xtype: 'container',
                    items: [{
                        xtype: 'combo',
                        name: 'customers_id',
                        store: 'combo.Customer',
                        valueField: 'id',
                        displayField: 'customer_name',
                        triggerAction: 'all',
                        editable: true,
                        fieldLabel: 'Customer',
                        autoWidth: true,
                        // value: 1,
                        typeAhead: true,
                        minChars: 2,
                        queryMode: 'remote',
                        allowBlank: true,
                        width: "92%"
                    }, {
                        xtype: 'button',
                        style: 'margin-left:5px; margin-bottom:10px',
                        text: '+',
                        action: 'AddCustomer',
                    }]
                }, {
                    xtype: 'textarea',
                    fieldLabel: 'Address',
                    name: 'address',
                    readOnly: true,
                    allowBlank: true

                }, {
                    xtype: 'textfield',
                    fieldLabel: 'City',
                    name: 'city',
                    readOnly: true,
                    allowBlank: true
                }, {
                    xtype: 'textfield',
                    vtype: 'email',
                    name: 'email',
                    readOnly: true,
                    fieldLabel: 'Email',
                    allowBlank: true

                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Phone',
                    name: 'phone',
                    readOnly: true,
                    allowBlank: true
                }, {
                    xtype: 'datefield',
                    fieldLabel: 'DOB',
                    name: 'dob',
                    // value: new Date(),
                    format: 'Y-m-d',
                    readOnly: true,
                    allowBlank: true,
                    submitFormat: 'Y-m-d',
                },
               
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'N.ID',
                    layout: 'hbox',
                    width:'98%',
                    items: [{
                        xtype: 'numberfield',
                        // fieldLabel: 'N.ID',
                        name: 'national_no',
                        allowBlank: true,
                        width: '30%',
                        labelWidth: '100%',
                        readOnly: true,
                        // autoWidth: true,

                    }, {
                        xtype: 'textfield',
                        fieldLabel: 'Passport',
                        name: 'passport',
                        allowBlank: true,
                        // width:'40%'
                        labelWidth: '100%',
                        readOnly: true,
                        autoWidth: true,
                    }]
                }
             
            ]
        }
        return form
    },  
    rentDetailForm: function() {
        form = {
            xtype: 'fieldset',
            title: 'Rental Detail',
           colspan: 2, 
           layout:{
            type:'table', 
            columns:2
           },
            defaults: {      
                allowBlank: true,
                width: '98%',
                style: 'margin-left:10px'
            },
            items: [
            {

                    xtype: 'fieldcontainer',
                    fieldLabel: 'Check in Time',
                    layout: 'hbox',
                    items: [{
                        xtype: 'datefield',
                        name: 'check_in_date',
                        value: _now,
                        format: 'Y-m-d',
                        autoWidth: true,
                        submitFormat: 'Y-m-d H:i',
                    }, {
                        xtype: 'timefield',
                        name: 'check_in_time',
                        minValue: '00:00 AM',
                        maxValue: '24:00 PM',
                        increment: 01,
                        anchor: '100%',
                        autoWidth: true,
                        value: '',
                        format: "H:i:s",
                        value: _now,
                        id: 'currtime',
                        itemId: 'start_time_formated',
                        renderer: Ext.util.Format.dateRenderer('H:i'),
                        // listeners: {
                        //     afterrender: function() {
                        //       var task = {
                        //         run: function() {
                        //              Ext.getCmp('currtime').setValue(Ext.Date.format(new Date(), 'H:i:s'));
                        //         },
                        //         interval: 1000 //1 second
                        //       }
                        //       Ext.TaskManager.start(task);
                        //     }
                        //   },

                    }]
                }, {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Es.Check Out',
                    layout: 'hbox',
                    items: [{
                        xtype: 'datefield',
                        name: 'estimated_check_out_date',
                        value: new Date(),
                        format: 'Y-m-d',
                        autoWidth: true,
                        submitFormat: 'Y-m-d H:i',
                    }, {
                        xtype: 'timefield',
                        name: 'estimated_check_out_time',
                        minValue: '00:00 AM',
                        maxValue: '24:00 PM',
                        increment: 01,
                        anchor: '100%',
                        autoWidth: true,
                        value: '',
                        format: "H:i:s",
                        value: new Date(),
                        itemId: 'start_time_formated',
                        id: 'currestimated',
                        renderer: Ext.util.Format.dateRenderer('H:i'),
                         // listeners: {
                         //    afterrender: function() {
                         //      var task = {
                         //        run: function() {
                         //             Ext.getCmp('currestimated').setValue(Ext.Date.format(new Date(), 'H:i:s'));
                         //        },
                         //        interval: 1000 //1 second
                         //      }
                         //      Ext.TaskManager.start(task);
                         //    }
                         //  },

                    }]
                },/*{
                    xtype: 'numberfield',
                    fieldLabel: 'Paid Booking',
                    minValue: 0,
                    value: 0,
                    autoWidth: true,
                    name: 'paid_booking'
                }, */{
                    xtype: 'textfield',
                    name: 'purpose_of_visit',
                    autoWidth: true,
                    fieldLabel: 'Purpose of Visit',
                    allowBlank: true

                },{
                    xtype: 'combo',
                    name: 'discount',
                    store: 'combo.Discount',
                    valueField: 'discount_percentage',
                    autoWidth: true,
                    displayField: 'discount_percentage',
                    triggerAction: 'all',
                    allowBlank: true, 
                    editable: false,
                    fieldLabel: 'Discount(%)'
                },{
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Rental Type',
                    defaultType: 'radiofield',
                    defaults: {
                        flex: 1
                    },
                    layout: 'hbox',
                    items: [{
                        boxLabel: 'Rate',
                        name: 'rental_type',
                        inputValue: 'rate',
                        checked: true
                    }, {
                        boxLabel: 'Static Plan',
                        style: 'margin-left:20px;margin-right:20px',
                        name: 'rental_type',
                        inputValue: 'static_plan',

                    }, {
                        boxLabel: 'Dynamic Plan',
                        style: 'margin-left:10px;margin-right:20px',
                        name: 'rental_type',
                        inputValue: 'dynamic_plan',

                    }]

                },
               
            ]
        }
        return form
    },
    getGrid: function() {
        grid = {
            xtype: 'tabpanel',
            autoWidth: true,
            colspan: 2, 
            height: '100%',
            items: [{             
                xtype:'panel',
                title: 'Room Charge By Static Plan',
                hidden:true ,
                name:'chargeByStarticPlan',
                items: [
                    this.roomChargeByStaticPlan()
                ]
            }, {             
                xtype:'panel', 
                title: 'Room Charge By Rate',
                hidden:false,
                name:'chargeByRate',
                items: [
                    this.roomChargeByRate()
                ]
            },{
                xtype: 'panel',
                title: 'Room Charge By Dynamic Plan',
                hidden:false,
                name:'chargeByDynamicPlan',
                items: [
                    this.roomChargeByDynamicPlan()
                ]
            },{
                title: 'Item',
                items: [
                    this.itemGrid()
                ]
            }]
        }
        return grid
    },
    itemGrid: function() {
        itemGrid = {
            xtype: 'grid',
            border: true,
            autoScroll: true,
            name: 'item_detail',
            height: '100%',
            plugins: Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit: 1
            }),
            viewConfig: {
                getRowClass: function(record, id) {
                    return record.get("service_id") == null ? "hidden" : "row-error";
                }
            },
            selModel: {
                selType: 'cellmodel'
            },
            store: 'roomTransaction.CheckInDetail',
            // title: 'Check In',
            tbar: [
                '->', {
                    xtype: 'button',
                    action: 'AddItem',
                    iconCls: 'icon-add',
                    text: 'Add Item',
                    tooltip: 'Add Service Charge'
                }
            ],
            columns: [{
                header: 'NO',
                xtype: 'rownumberer',
                width: 50,
                align: 'center'
            }, {
                header: 'Description',
                dataIndex: 'service_name',
                autoWidth: true,
                flex: 1,
                editor: {
                    xtype: 'combo',
                    displayField: 'service_name',
                    valueField: 'service_name',
                    store: 'combo.RoomServiceMaster',
                    name: 'service_name',
                    queryMode: 'local',
                    typeAhead: true,
                    triggerAction: 'all',
                    //  listeners: {
                    //     select: function(combo, record, index) {
                    //         var rec = record.data;
                    //         App.app.getController("roomTransaction.CheckIn").itemRecord = rec;

                    //     }
                    // },
                }
            }, {
                header: 'Price',
                dataIndex: 'unit_price',
                autoWidth: true,
                flex: 1,
            }, {
                header: 'Qty',
                dataIndex: 'qty',
                autoWidth: true,
                flex: 1,
                field: {
                    xtype: 'numberfield',
                    name: 'qty',
                    minValue: 0
                }
            }, {
                header: 'Amount',
                dataIndex: 'total_amount',
                autoWidth: true,
                flex: 1,
            }, {
                header: 'Action',
                minWidth: 100,
                autoWidth: true,
                flex: 1,
                align: 'center',
                xtype: 'actioncolumn',
                items: [{
                    xtype: 'button',
                    iconCls: 'icon-delete',
                    action:'removeServiceFromGrid',
                    handler: function(grid, rowIndex) {
                        var ctrl = App.app.getController("roomTransaction.CheckIn");
                        var rec = grid.getStore().getAt(rowIndex);
                        ctrl.deleteDetailRecord(grid, rec);
                    }
                }]
            }],
        }
        return itemGrid
    },
    totalForm: function() {
        total = {
            xtype: 'fieldset',

            title: 'Total',
            // colspan: ,
            // autoWidth: true,
            // height: '100%',
            // style: "margin-left:10px",
            defaults: {
                // style:'margin:10px',
                // allowBlank: true,
                width: '98%',
                readOnly:true,
                labelWidth:120,
                // style: 'margin-right:0px'
            },
            
            layout: {
                type: 'table',
                columns: 2, 
                
            },
            defaultType:'numberfield',
            items: [
            {                
                fieldLabel: 'Total Tax Amount(+)',
                name: 'tax_amount',
              
            }, {                
                fieldLabel: 'Discount Amount(-)',
                name: 'discount_amount',
             
            }, {                
                fieldLabel: 'Other Charge(+)',
                name: 'other_charge',
             
            }, {                
                fieldLabel: 'Total Amount',
                name: 'total_amount',
             
            }, {               
                fieldLabel: 'Amount Paid(-)',
                name: 'paid_booking',
                
            }, {                
                fieldLabel: 'Balance',
                name: 'grand_total_amount',
                
            }],


        }
        return total
    },
    roomChargeByStaticPlan: function() {
        itemGrid = {
            xtype: 'grid',
            border: true,
            name: 'roomDetail',
            store: 'roomTransaction.CheckInDetail',
            plugins: Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit: 1
            }),
            selModel: 'cellmodel',
            // listeners: {
            //     beforeedit: function(editor, e) {

            //         var ctrl = App.app.getController("RoomTransactionCheckIn");
            //         ctrl.filterItemPrice(editor, e);
            // }
            // },
            viewConfig: {
                getRowClass: function(record, id) {
                    return record.get("room_no") == null ? "hidden" : "row-error";
                }
            },
            colspan: 2,

            // tbar: [,
            //  '->',  {
                // xtype: 'button',
                // action: 'AddRoomStaticPlan',
                // iconCls: 'icon-add',
                // text: 'Add Room',
                // tooltip: 'Add Room',
            // }],
            columns: [{
                header: 'NO',
                xtype: 'rownumberer',
                width: 50,
                align: 'center'
            }, {
                header: 'Room Number',
                dataIndex: 'room_no',
                flex: 1,
                editor: {
                    xtype: 'combo',
                    displayField: 'room_no',
                    store: 'combo.AvailableRooms',
                    valueField: 'room_no',
                    // valueField: 'id',
                    name: 'comboRoom',
                    queryMode: 'remote',
                    typeAhead: true,
                    triggerAction: 'all',
                    listeners: {
                        select: function(combo, rec, index) {

                            var tmpRoomData = App.app.getController("RoomTransactionCheckIn").tmpRoomData;

                            tmpRoomData.room_master_id = rec.getId();

                        }
                    },
                }
            },  {
                header: 'Adult',
                dataIndex: 'adults',
                flex: 1,
                editor: {
                    xtype: 'numberfield',
                    minValue:0 , 
                    name:'adults',
                    value:0 
                }
            },  {
                header: 'Children',
                dataIndex: 'childrens',
                flex: 1,
                editor: {
                    xtype: 'numberfield',
                    minValue:0 , 
                    name:'childrens',
                    value:0 
                }
            }, {
                header: 'Room Duration',
                // dataIndex:'categroy_price_id',
                dataIndex: 'category_price_name',
                flex: 1,
                editor: {
                    xtype: 'combo',
                    displayField: 'name',
                    store: 'combo.CategoryPrice',
                    // valueField: 'id',
                    valueField: 'name',
                    name: 'comboCategoryPrice',
                    queryMode: 'local',
                    typeAhead: true,
                    // listeners: Util.firstSelect(),
                    triggerAction: 'all',
                    // listeners: {
                    //     select: function(combo, rec, index) {
                    //         // updateRoomInDetail                        
                    //         // var rec = record.data;
                    //         console.log(rec.data);
                    //         var tmpRoomData = App.app.getController("roomTransaction.CheckIn").tmpRoomData;
                    //         tmpRoomData.categroy_price_id = rec.getId();
                    //         tmpRoomData.unit_price = rec.get("charge_amount");

                    //     },

                    // },

                }

            },{
                header: 'Rent Charge',
                dataIndex: 'unit_price',
                width: 150,
                renderer: function(value) {
                    amount = Number(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + " $";
                    return "<span style='color:black'><b>" + amount + "</b></span>"
                }
            }, {
                header: 'Description',
                dataIndex: 'description',
                flex: 1,
                editor: {
                    xtype: 'textfield',
                }
            }, /*{
                header: 'Action',
                minWidth: 100,
                autoWidth: true,
                flex: 1,
                align: 'center',
                xtype: 'actioncolumn',
                items: [{
                    xtype: 'button',    
                    iconCls: 'icon-delete',
                    handler: function(grid, rowIndex) {
                        var ctrl = App.app.getController("RoomTransactionCheckIn");

                        var rec = grid.getStore().getAt(rowIndex);
                        ctrl.deleteDetailRecord(grid, rec);
                    }
                }]
            }*/],
        }
        return itemGrid
    }, 
    roomChargeByRate: function() {
        itemGrid = {
            xtype: 'grid',
            border: true,
            name: 'roomDetailByRate',
            store: 'roomTransaction.CheckInDetail',
            plugins: Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit: 1
            }),
            selModel: 'cellmodel',

            viewConfig: {
                getRowClass: function(record, id) {
                    return record.get("room_no") == null || record.get("categroy_price_id") == 0 ? "hidden" : "row-error";
                }
            },
            colspan: 2,

            // tbar: [, '->',  {
                // xtype: 'button',
                // action: 'AddRoomByRate',
                // iconCls: 'icon-add',
                // text: 'Add Room',
                // tooltip: 'Add Room',
                // handler:function(btn){
                //     alert('add room');
                //     var ctrl = App.app.getController('roomTransaction.CheckIn');
                //     ctrl.addRoom(btn); 
                // }
            // }],
            columns: [{
                header: 'NO',
                xtype: 'rownumberer',
                width: 50,
                align: 'center'
            }, {
                header: 'Room Number',
                dataIndex: 'room_no',
                flex: 1,
                editor: {
                    xtype: 'combo',
                    displayField: 'room_no',
                    store: 'combo.AvailableRooms',
                    valueField: 'room_no',
                    // valueField: 'id',
                    name: 'comboRoom',
                    queryMode: 'remote',
                    typeAhead: true,
                    triggerAction: 'all',                  
                }
            },  {
                header: 'Adult',
                dataIndex: 'adults',
                flex: 1,
                editor: {
                    xtype: 'numberfield',
                    name:'adults',
                    minValue:0 , 
                    value:0 
                }
            },  {
                header: 'Children',
                dataIndex: 'childrens',
                flex: 1,
                editor: {
                    xtype: 'numberfield',
                    minValue:0 , 
                    name:'childrens',
                    value:0 
                }
            },  {
                header: 'Nights',
                dataIndex: 'qty',
              
            },{
                header: 'Rent Charge',
                dataIndex: 'unit_price',
                width: 150,
                renderer: function(value) {
                    amount = Number(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + " $";
                    return "<span style='color:black'><b>" + amount + "</b></span>"
                }
            }, {
                header: 'Description',
                dataIndex: 'description',
                flex: 1,
                editor: {
                    xtype: 'textfield',
                }
            }, ],
        }
        return itemGrid
    },
    roomChargeByDynamicPlan: function(){
         itemGrid = {
            xtype: 'grid',
            border: true,
            name: 'roomChargeByDynamicPlanGrid',
            store: 'roomTransaction.CheckInDetail',
            plugins: Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit: 1
            }),
            selModel: 'cellmodel',
            // listeners: {
            //     beforeedit: function(editor, e) {
            //         var ctrl = App.app.getController("RoomTransactionCheckIn");
            //         ctrl.filterItemPrice(editor, e);
            //     }
            // },
            viewConfig: {
                getRowClass: function(record, id) {
                    return record.get("room_no") == null ? "hidden" : "row-error";
                }
            },
            colspan: 2,

            // tbar: [, '->',  {
            //     xtype: 'button',
            //     action: 'AddRoomDynamicPlan',
            //     iconCls: 'icon-add',
            //     text: 'Add Room',
            //     tooltip: 'Add Room',
            // }],
            columns: [{
                header: 'NO',
                xtype: 'rownumberer',
                width: 50,
                align: 'center'
            }, {
                header: 'Room Number',
                dataIndex: 'room_no',
                flex: 1,
                editor: {
                    xtype: 'combo',
                    displayField: 'room_no',
                    store: 'combo.AvailableRooms',
                    valueField: 'room_no',
                    // valueField: 'id',
                    name: 'comboRoom',
                    queryMode: 'remote',
                    typeAhead: true,
                    triggerAction: 'all',
                    // listeners: {
                    //     select: function(combo, rec, index) {

                    //         var tmpRoomData = App.app.getController("RoomTransactionCheckIn").tmpRoomData;

                    //         tmpRoomData.room_master_id = rec.getId();

                    //     }
                    // },
                }
            },  {
                header: 'Adult',
                dataIndex: 'adults',
                flex: 1,
                editor: {
                    xtype: 'numberfield',
                    minValue:0 , 
                    name:'adults',
                    value:0 
                }
            },  {
                header: 'Children',
                dataIndex: 'childrens',
                flex: 1,
                editor: {
                    xtype: 'numberfield',
                    minValue:0 , 
                    name:'childrens',
                    value:0 
                }
            }, {
                header: 'Room Duration',
                // dataIndex:'categroy_price_id',
                dataIndex: 'category_price_name',
                flex: 1,
                editor: {
                    xtype: 'combo',
                    displayField: 'name',
                    store: 'combo.CategoryPrice',
                    // valueField: 'id',
                    valueField: 'name',
                    name: 'comboCategoryPrice',
                    queryMode: 'local',
                    typeAhead: true,
                    // listeners: Util.firstSelect(),
                    triggerAction: 'all',
                    // listeners: {
                    //     select: function(combo, rec, index) {
                    //         // updateRoomInDetail                        
                    //         // var rec = record.data;
                    //         console.log(rec.data);
                    //         var tmpRoomData = App.app.getController("RoomTransactionCheckIn").tmpRoomData;
                    //         tmpRoomData.categroy_price_id = rec.getId();
                    //         tmpRoomData.unit_price = rec.get("charge_amount");

                    //     },

                    // },

                }

            },{
                header: 'Rent Charge',
                dataIndex: 'unit_price',
                width: 150,
                renderer: function(value) {
                    amount = Number(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + " $";
                    return "<span style='color:black'><b>" + amount + "</b></span>"
                }
            }, {
                header: 'Description',
                dataIndex: 'description',
                flex: 1,
                editor: {
                    xtype: 'textfield',
                }
            }],
        }
        return itemGrid
    }



});