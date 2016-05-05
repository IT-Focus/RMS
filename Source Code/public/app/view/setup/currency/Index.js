Ext.define('App.view.setup.currency.Index', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.currencyIndex',
    // bodyPadding: 10,
    // border: true,
    layout: 'card',
    initComponent: function() {
        Ext.apply(this, {
            items: [{
                xtype: 'grid',
                border: true,
                name: 'cityGrid',
                store: 'setup.Currency',
                title: 'Currency',
                tools: [{
                        xtype: 'textfield',
                        name: 'string',
                        emptyText: '-----Search------',
                        autoWidth: true,
                    },

                    {
                        xtype: 'button',
                        action: 'Add',
                        iconCls: 'icon-add',
                        tooltip: 'Add New City'
                    }, {
                        xtype: 'button',
                        action: 'Edit',
                        style: 'margin-left:5px',
                        iconCls: 'icon-edit',
                        tooltip: 'Edit City'
                    },
                ],
                columns: [{
                    header: 'NO',
                    xtype: 'rownumberer',
                    width: 50,
                    align: 'center'
                }, {
                    header: 'sequence',
                    dataIndex: 'seq_num',
                    autoWidth: true,
                }, {
                    header: 'Currency',
                    dataIndex: 'currency_name',
                    autoWidth: true,
                    flex: 1,

                }, {
                    header: 'Symbol',
                    dataIndex: 'currencysyb',
                    autoWidth: true,
                    flex: 1,
                }, {
                    header: 'Rate',
                    dataIndex: 'rate',
                    autoWidth: true,
                    flex: 1,
                    // renderer: function(value){
                    //          amount =  Number(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + " %";
                    //         return "<span style='color:black'><b>"+amount+"</b></span>"
                    //     }
                }, {
                    header: 'Exchange Rate',
                    dataIndex: 'exchange_rate',
                    autoWidth: true,
                    flex: 1,
                    // renderer: function(value){
                    //          amount =  Number(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + " $";
                    //         return "<span style='color:black'><b>"+amount+"</b></span>"
                    //     }
                }, ],
                bbar: Ext.create('Ext.PagingToolbar', {
                    store: 'setup.Currency',
                    displayInfo: true,
                    displayMsg: 'view {0} - {1} of {2}',
                    emptyMsg: "view 0"
                })

            }, ]
        });
        this.callParent(arguments);
    },



});