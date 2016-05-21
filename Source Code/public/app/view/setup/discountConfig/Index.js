Ext.define('App.view.setup.discountConfig.Index', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.discountConfigIndex',
    // bodyPadding: 10,
    // border: true,
    layout: 'card',
    initComponent: function() {
        Ext.apply(this, {
            items: [
                this.get_grid(),
            ]
        });
        this.callParent(arguments);
    },

get_grid: function(){
    grid = {
                        xtype: 'grid',
                border: true,
                name: 'cityGrid',
                store: 'setup.DiscountConfig',
                title: 'Discount Configuration',
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
                        tooltip: 'Add New Discount'
                    }, {
                        xtype: 'button',
                        action: 'Edit',
                        style: 'margin-left:5px',
                        iconCls: 'icon-edit',
                        tooltip: 'Edit Discount'
                    },{
                        xtype: 'button',
                        action: 'Delete',
                        style: 'margin-left:5px',
                        iconCls: 'icon-delete',
                        tooltip: 'Edit Discount'
                    }
                ],
                columns: [{
                    header: 'NO',
                    xtype: 'rownumberer',
                    width: 50,
                    align: 'center'
                }, {
                    header: 'Code',
                    dataIndex: 'code',
                    autoWidth: true,
                }, {
                    header: 'Remark',
                    dataIndex: 'remark',
                    autoWidth: true,
                    flex: 1,

                },],
                bbar: Ext.create('Ext.PagingToolbar', {
                    store: 'setup.DiscountConfig',
                    displayInfo: true,
                    displayMsg: 'view {0} - {1} of {2}',
                    emptyMsg: "view 0"
                })
    }
    return grid
}

});