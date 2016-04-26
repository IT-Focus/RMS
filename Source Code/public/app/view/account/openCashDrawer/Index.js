Ext.define('App.view.account.openCashDrawer.Index', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.openCashDrawerIndex',
    // bodyPadding: 10,
    // border: true,
    layout: 'card',
    initComponent: function() {
        Ext.apply(this, {
            items: [{
                xtype: 'grid',
                border: true,
                name: 'openCashDrawerGrid',
                store: 'account.CashierBalance',
                title: 'Open Cash Drawer',
                tools: [
                    // {
                    //     xtype: 'textfield',
                    //     fieldLabel:'<b>Search</b>',
                    //     labelWidth:50,
                    //     name: 'string',
                    //     emptyText: '------Cashier------',
                    //     width: 300,
                    //     style: 'margin-right:50px; color:white',
                    // },

                    {
                        xtype: 'button',
                        action: 'Open',
                        text:'<b>Open Cash Drawer</b>',
                        iconCls: 'icon-opencash ',
                        tooltip: 'Open Cash Drawer'
                    }, 
                    // {
                    //     xtype: 'button',
                    //     action: 'Edit',
                    //     style: 'margin-left:5px',
                    //     iconCls: 'icon-edit',
                    //     tooltip: 'Edit Floor'
                    // },
                ],
                columns: [{
                    header: 'NO',
                    xtype: 'rownumberer',
                    width: 50,
                    align: 'center'
                }, {
                    header: 'User',
                    dataIndex: 'username',
                    width: 200,
                },{
                    header: 'Openned Date',
                    dataIndex: 'opened_date',
                    flex: 1,
                    renderer: Ext.util.Format.dateRenderer('d-m-Y H:i'),
                },{
                    header: 'Openned Balance',
                    dataIndex: 'open_balance',
                    flex: 1,
                    renderer: function(value) {
                        amount = Number(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + " $";
                        return "<span style='color:black'><b>" + amount + "</b></span>"
                    }
                }],
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
                    // store: 'account.Cashier',
                    displayInfo: true,
                    displayMsg: 'view {0} - {1} of {2}',
                    emptyMsg: "view 0"
                })

            }, ]
        });
        this.callParent(arguments);
    },



});