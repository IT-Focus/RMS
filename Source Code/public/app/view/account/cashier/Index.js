Ext.define('App.view.account.cashier.Index', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.cashierIndex',
    // bodyPadding: 10,
    // border: true,
    layout: 'card',
    initComponent: function() {
        Ext.apply(this, {
            items: [{
                xtype: 'grid',
                border: true,
                name: 'cashierGrid',
                store: 'account.Cashier',
                title: 'Cashier Management',
                tools: [{
                        xtype: 'textfield',
                        name: 'string',
                        emptyText: '------workshift/Cashier------',
                        autoWidth:true,
                    },

                    {
                        xtype: 'button',
                        action: 'Add',
                        iconCls: 'icon-add',
                        tooltip: 'Add New Floor'
                    }, {
                        xtype: 'button',
                        action: 'Edit',
                        style: 'margin-left:5px',
                        iconCls: 'icon-edit',
                        tooltip: 'Edit Floor'
                    },
                ],
                columns: [{
                    header: 'NO',
                    xtype: 'rownumberer',
                    width: 50,
                    align: 'center'
                }, {
                    header: 'User',
                    dataIndex: 'username',
                     autoWidth:true,
                }, {
                    header: 'Workshift',
                    dataIndex: 'workshift_name',
                     autoWidth:true,
                }, {
                    header: 'Start Time',
                    dataIndex: 'start_time',
                     autoWidth:true,
                    renderer: Ext.util.Format.dateRenderer('H:i'),
                }, {
                    header: 'Open Balance',
                    dataIndex: 'obda',
                     autoWidth:true,
                     flex:1,
                    renderer: function(value) {
                        amount = Number(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + " $";
                        return "<span style='color:black'><b>" + amount + "</b></span>"
                    }
                }, {
                    header: 'STATUS',
                     autoWidth:true,
                     flex:1,
                    dataIndex: 'is_active',

                    renderer: function(val, meta, record) {

                        if (record.data.is_active == 1) {
                            return "<span style='color:green'> " + 'Active' + " </span>"
                        } else {
                            return "<span style='color:red'>" + 'Deactive' + "</span>"

                        };

                    }
                }, ],
                // {
                //     xtype: 'actioncolumn',
                //     header: 'Action',
                //     width: 150,
                //     align: 'center',
                //     items: [{
                //         iconCls: 'icon-ok',
                //         tooltip: 'Active',
                //         handler: function(grid, rowIndex) {
                //             var ctrl = App.app.getController("itemsetup.SubCategories");
                //             ctrl.Active(grid, rowIndex);
                //         },
                //         isDisabled: function(view, rowIndex, colIndex, item, record) {
                //             var isDisabled = record.get('is_active') == "N";
                //             console.log(isDisabled)
                //             return false;
                //         }
                //     }, '-', {
                //         iconCls: 'icon-delete',
                //         tooltip: 'Deactive',
                //         handler: function(grid, rowIndex) {
                //             var ctrl = App.app.getController("itemsetup.SubCategories");
                //             ctrl.Deactive(grid, rowIndex);
                //         },
                //         isDisabled: function(view, rowIndex, colIndex, item, record) {
                //             var isDisabled = record.get('is_active') == "N";
                //             console.log(isDisabled)
                //             return false;
                //         }
                //     }
                // ]
                bbar: Ext.create('Ext.PagingToolbar', {
                    store: 'account.Cashier',
                    displayInfo: true,
                    displayMsg: 'view {0} - {1} of {2}',
                    emptyMsg: "view 0"
                })

            }, ]
        });
        this.callParent(arguments);
    },



});