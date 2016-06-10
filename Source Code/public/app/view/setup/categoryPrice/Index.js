Ext.define('App.view.setup.categoryPrice.Index', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.categoryPriceIndex',

    border: false,
    layout: 'card',
    initComponent: function() {
        Ext.apply(this, {
            items: [

                {
                    xtype: 'grid',
                    border: true,
                    name: 'index',
                    store: 'setup.CategoryPrice',
                    title: 'Category Price Management',

                    tools: [

                        {
                            xtype: 'button',
                            action: 'Add',
                            iconCls: 'icon-add',
                            tooltip: 'Add New User'
                        }, {
                            xtype: 'button',
                            action: 'Edit',
                            style: 'margin-left:5px',
                            iconCls: 'icon-edit',
                            tooltip: 'Edit User'
                        }
                    ],
                    columns: [{
                        header: 'NO',
                        xtype: 'rownumberer',
                        width: 50,
                        align: 'center'
                    }, {
                        header: 'Category',
                        dataIndex: 'category_name',
                        autoWidth: true,
                        locked: true
                    }, {
                        header: 'Name',
                        dataIndex: 'name',
                        autoWidth: true,
                    }, {
                        header: 'Charge Amount',
                        dataIndex: 'charge_amount',
                        flex: 1,
                        autoWidth: true,
                        renderer: function(value) {
                            amount = Number(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + " $";
                            return "<span style='color:black'><b>" + amount + "</b></span>"
                        }
                    }, {
                        header: 'Duration Time',
                        dataIndex: 'duration_time',
                        autoWidth: true,
                        renderer: Ext.util.Format.dateRenderer('H:i'),
                        flex: 1,
                    }, {
                        header: 'Duration Day',
                        dataIndex: 'duration_day',
                        autoWidth: true,
                        flex: 1,
                    }, {
                        header: 'Allow Late',
                        dataIndex: 'allow_late',
                        renderer: Ext.util.Format.dateRenderer('H:i'),
                        autoWidth: true,
                        flex: 1,
                    }, {
                        header: 'End Extra Duration',
                        dataIndex: 'exd',
                        renderer: Ext.util.Format.dateRenderer('H:i'),
                        autoWidth: true,
                        flex: 1,
                    }, {
                        header: 'Seq No',
                        dataIndex: 'Seq_no',
                        autoWidth: true,
                        flex: 1,
                    }, {
                        header: 'Status',
                        dataIndex: 'is_active',
                        autoWidth: true,
                        flex: 1,
                    }],
                    bbar: Ext.create('Ext.PagingToolbar', {
                        store: 'setup.CategoryPrice',
                        displayInfo: true,
                        displayMsg: 'view {0} - {1} of {2}',
                        emptyMsg: "view 0"
                    })

                }, {
                    xtype: 'categoryPriceForm'
                }
            ]
        });
        this.callParent(arguments);
    },



});