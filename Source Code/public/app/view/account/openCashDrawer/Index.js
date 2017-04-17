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
                title: 'Casheir Balance',
                tools: [
                   
                    {
                        xtype: 'button',
                        action: 'Open',
                        text:'<b>Open Balance</b>',
                        iconCls: 'icon-opencash ',
                        tooltip: 'Open Balance'
                    }, {
                        xtype: 'button',
                        action: 'CloseBalance',
                        text:'<b>Close Balance</b>',
                        iconCls: 'icon-closecash ',
                        tooltip: 'Close Balance'
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
                },{
                    header:"Status",
                    dataIndex:'status',
                    width:70 , 
                    renderer:function(value){
                        console.log(value);
                        if(value == 41 ){
                            return "Closed";
                        }
                        return "Openned";
                    },
                    isDisabled: function(view, rowIndex, colIndex, item, record) {                          
                            var isDisabled=record.get('status')==41;
                            return !isDisabled;
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
                    store: 'account.CashierBalance',
                    displayInfo: true,
                    displayMsg: 'view {0} - {1} of {2}',
                    emptyMsg: "view 0"
                })

            }, ]
        });
        this.callParent(arguments);
    },



});