Ext.define('App.view.roomTransaction.checkIn.Form', {
    extend: 'Ext.form.Panel',
    alias: 'widget.CheckinForm',
    // bodyPadding:20 ,
    // border: true,
    autoScroll: true,
    layout: {
        type: 'table',
        columns: 2
    },
    buttons: [{
        text: 'Save',
        iconCls: 'icon-save',
        action: 'Save'
    }, {
        text: 'Cancel',
        action: 'CancelCheckIn',
        iconCls: 'icon-cancel'
    }],

    initComponent: function() {
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
            style: "margin-left:10px",
            defaults: {
                // style:'margin:10px',
                allowBlank: false,
                width: '100%',
                style: 'margin-left:10px'
            },
            items: [{
                xtype: 'hiddenfield',
                name: 'room_master_id'
            }, {

                xtype: 'fieldcontainer',
                fieldLabel: 'Check in Time',
                layout: 'hbox',
                items: [{
                    xtype: 'datefield',
                    name: 'check_in_date',
                    value: new Date(),
                    format: 'Y-m-d',
                    autoWidth: true,
                    submitFormat: 'Y-m-d',
                }, {
                    xtype: 'timefield',
                    name: 'check_in_time',
                    minValue: '6:00 AM',
                    maxValue: '00:00 PM',
                    increment: 30,
                    anchor: '100%',
                    autoWidth: true,
                    value: '',
                    format: "H:i",
                    value: new Date(),
                    itemId: 'start_time_formated',
                    renderer: Ext.util.Format.dateRenderer('H:i'),

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
                    submitFormat: 'Y-m-d',
                }, {
                    xtype: 'timefield',
                    name: 'estimated_check_out_time',
                    minValue: '6:00 AM',
                    maxValue: '00:00 PM',
                    increment: 30,
                    anchor: '100%',
                    autoWidth: true,
                    value: '',
                    format: "H:i",
                    value: new Date(),
                    itemId: 'start_time_formated',
                    renderer: Ext.util.Format.dateRenderer('H:i'),

                }]
            }, {
                xtype: 'checkbox',
                boxLabel: 'Throught Revervation',
                style: 'margin-left:20%'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Customer' + redStar,
                name: 'customer_name'
            }, {
                xtype: 'textarea',
                fieldLabel: 'Address',
                name: 'address',
                allowBlank: true

            }, {
                xtype: 'textfield',
                fieldLabel: 'City',
                name: 'city',
                allowBlank: true
            }, {
                xtype: 'textfield',
                vtype: 'email',
                name: 'email',
                fieldLabel: 'Email',
                allowBlank: true

            }, {
                xtype: 'numberfield',
                fieldLabel: 'Phone' + redStar,
                name: 'phone'
            }, {
                xtype: 'datefield',
                fieldLabel: 'DOB',
                name: 'dob',
                value: new Date(),
                format: 'Y-m-d',
                submitFormat: 'Y-m-d',
            }, {
                xtype: 'numberfield',
                fieldLabel: 'N.ID',
                name: 'national_id',
                allowBlank: true
            }]
        }
        return form
    },
    rentDetailForm: function() {
        form = {
            xtype: 'fieldset',
            title: 'Rental Detail',
            autoWidth: true,
            style: "margin-left:10px",
            defaults: {
                // style:'margin:10px',
                allowBlank: false,
                width: '100%',
                style: 'margin-left:10px'
            },
            items: [{
                xtype: 'fieldcontainer',
                fieldLabel: 'Rental Type',
                defaultType: 'radiofield',
                defaults: {
                    flex: 1
                },
                layout: 'hbox',
                items: [{
                    boxLabel: 'Day',
                    name: 'rental_type',
                    inputValue: 'Day',
                }, {
                    boxLabel: 'Hour',
                    name: 'rental_type',
                    inputValue: 'Hour',
                    checked: true

                }]
            }, {
                xtype: 'combo',
                name: 'national_id',
                store: 'combo.Nationality',
                valueField: 'id',
                displayField: 'name',
                triggerAction: 'all',
                editable: false,
                fieldLabel: 'Nationality' + redStar,
                autoWidth: true
            }, {
                xtype: 'fieldcontainer',
                fieldLabel: 'NO.of Persons',
                // defaultType: 'radiofield',
                defaults: {
                    flex: 1
                },
                layout: {
                    type: 'table',
                    columns: 3
                },
                items: [{
                    xtype: 'numberfield',
                    name: 'no_person',
                    width: 70,
                    minValue: 0,
                    value: 0,
                    fieldStyle: "text-align:right;",
                    labelWidth: 20,
                    autoWidth: true
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Adult',
                    name: 'adult',
                    minValue: 0,
                    value: 0,
                    width: 140,
                    fieldStyle: "text-align:right;",
                    labelWidth: "100%",
                    // style: "margin-left:100%"

                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Child',
                    name: 'children',
                    width: 140,
                    minValue: 0,
                    value: 0,
                    fieldStyle: "text-align:right;",
                    labelWidth: "100%",
                    // style: "margin-left:100%"

                }, {}, {
                    xtype: 'numberfield',
                    fieldLabel: 'Male',
                    // colspan:2,
                    fieldStyle: "text-align:right;",
                    name: 'male',
                    width: 140,
                    minValue: 0,
                    value: 0,
                    labelWidth: "100%",
                    // style: "margin-left:100%"

                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Female',
                    name: 'female',
                    width: 140,
                    minValue: 0,
                    value: 0,
                    fieldStyle: "text-align:right;",
                    labelWidth: "100%",
                    // style: "margin-left:100%"

                }]
            }, {
                xtype: 'numberfield',
                fieldLabel: 'Paid Booking',
                minValue: 0,
                value: 0,
                autoWidth: true,
                name: 'paid_booking'
            }, {
                xtype: 'textfield',
                name: 'purpose_of_visit',
                autoWidth: true,
                fieldLabel: 'Purpose of Visit',
                allowBlank: true

            }, {
                xtype: 'fieldcontainer',
                autoWidth: true,
                fieldLabel: 'No. Rooms',
                defaultType: 'numberfield',

                defaults: {
                    flex: 1,
                    // width: 10
                },
                layout: {
                    type: 'table',
                    columns: 2
                },
                items: [{
                    width: 70,
                    fieldStyle: "text-align:right;",
                    minValue: 0,
                    value: 0,
                    name: 'no_room'
                }, {
                    fieldLabel: 'No.of Extra Person',
                    name: 'extra_person',
                    labelWidth: '100%',
                    autoWidth: true,

                    minValue: 0,
                    value: 0,
                    // style: "margin-left:5px"

                }]
            }, {
                xtype: 'numberfield',
                fieldLabel: 'Extra Person Charge',
                name: 'charge',
                minValue: 0,
                autoWidth: true,
                value: 0,
                allowBlank: true

            }, {
                xtype: 'combo',
                name: 'user_id',
                store: 'combo.Discount',
                valueField: 'id',
                autoWidth: true,
                displayField: 'discount_percentage',
                triggerAction: 'all',
                allowBlank: true,
                editable: false,
                fieldLabel: 'Discount Percentage' + redStar
            }, {
                xtype: 'numberfield',
                name: 'discount',
                allowBlank: true,
                autoWidth: true,
                fieldLabel: 'Discount Amount',
                readOnly: true
            }]
        }
        return form
    },
    getGrid: function() {
        grid = {
            xtype: 'tabpanel',
            autoWidth: true,
            colspan: 2,
            style: "margin-left:10px",
            height: '100%',

            items: [{
                xtype: 'form',
                title: 'Items',
                items: [
                    this.itemGrid()
                ]
            }, {
                title: 'Rooms',
                items: [
                    this.roomFormInTap()
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
            name: 'index',
            height: '100%',
            plugins: Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit: 1
            }),
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
                    tooltip: 'Check In'
                }
            ],
            columns: [{
                header: 'NO',
                xtype: 'rownumberer',
                width: 50,
                align: 'center'
            }, {
                header: 'Description',
                dataIndex: 'room_no',
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
                    listeners: {
                        select: function(combo, record, index) {
                            var rec = record.data;
                            App.app.getController("roomTransaction.CheckIn").itemRecord = rec;

                        }
                    },
                }
            }, {
                header: 'Price',
                dataIndex: 'price',
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
                dataIndex: 'amount',
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
            colspan: 2,
            autoWidth: true,
            style: "margin-left:10px",
            defaults: {
                // style:'margin:10px',
                allowBlank: true,
                width: '98%',
                style: 'margin-left:10px'
            },
            buttons: [{
                text: 'Calculate',
                iconCls: 'icon-save',
                action: 'Calculate'
            }],
            layout: {
                type: 'table',
                columns: 2
            },
            items: [{
                xtype: 'numberfield',
                fieldLabel: 'Total Rental Amount(+)',
                labelWidth: '100%',
                autoWidth: true,
                name: 'customer_name',
                readOnly: true
            }, {
                xtype: 'numberfield',
                fieldLabel: 'Total Extra Person Charge(+)',
                name: 'customer_name',
                labelWidth: '100%',
                autoWidth: true,
                readOnly: true

            }, {
                xtype: 'numberfield',
                fieldLabel: 'Total Tax Amount(+)',
                name: 'customer_name',
                labelWidth: '100%',
                autoWidth: true,
                readOnly: true
            }, {
                xtype: 'numberfield',
                fieldLabel: 'Discount Amount(-)',
                name: 'customer_name',
                labelWidth: '100%',
                autoWidth: true,
                readOnly: true

            }, {
                xtype: 'numberfield',
                fieldLabel: 'Other Charge(+)',
                name: 'customer_name',
                labelWidth: '100%',
                autoWidth: true,
                readOnly: true
            }, {
                xtype: 'numberfield',
                fieldLabel: 'Total Amount',
                name: 'customer_name',
                labelWidth: '100%',
                autoWidth: true,
                readOnly: true
            }, {
                xtype: 'numberfield',
                fieldLabel: 'Amount Paid(-)',
                name: 'customer_name',
                labelWidth: '100%',
                autoWidth: true,
                readOnly: true
            }, {
                xtype: 'numberfield',
                fieldLabel: 'Balance',
                name: 'customer_name',
                labelWidth: '100%',
                autoWidth: true,
                readOnly: true
            }, {
                xtype: 'button',
                text: 'Calculate',
                iconCls: 'icon-save',
                action: 'Calculate',
                width: 100
            }],


        }
        return total
    },
    roomFormInTap: function() {
        itemGrid = {
            xtype: 'grid',
            border: true,
            name: 'index',
            colspan: 2,
            tbar: [
                '->', {
                    xtype: 'button',
                    action: 'Add',
                    iconCls: 'icon-add',
                    text: 'Add Item',
                    tooltip: 'Check In'
                }
            ],
            // store: 'roomTransaction.CancelCheckin',
            // title: 'Room Form In Tap',
            // tools: [

            //     {
            //         xtype: 'button',
            //         action: 'Add',
            //         iconCls: 'icon-add',
            //         text: 'Add Item',
            //         tooltip: 'Check In'
            //     }
            // ],
            columns: [{
                header: 'NO',
                xtype: 'rownumberer',
                width: 50,
                align: 'center'
            }, {
                header: 'Room Number',
                dataIndex: 'room_no',
                autoWidth: true,
                flex: 1
            }, {
                header: 'Room Type',
                dataIndex: 'check_in_date',
                autoWidth: true,
                flex: 1,
            }, {
                header: 'Rent Charge',
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
                    // handler: function(grid, rowIndex) {
                    // var ctrl = App.app.getController("sale.Quotation");

                    // var rec = grid.getStore().getAt(rowIndex);
                    // ctrl.deleteDetailRecord(grid, rec);
                    // }
                }]
            }],
        }
        return itemGrid
    }



});