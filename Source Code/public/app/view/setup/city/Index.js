Ext.define('App.view.setup.city.Index', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.cityIndex',
    // bodyPadding: 10,
    // border: true,
    layout: 'card',
    initComponent: function() {
        Ext.apply(this, {
            items: [{
                xtype: 'grid',
                border: true,
                name: 'cityGrid',
                store: 'setup.City',
                title: 'City',
                tools: [
                    {
                        xtype: 'textfield',
                        name: 'string',
                        emptyText: '-----Search------',
                        width: 300,
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
                    header: 'City',
                    dataIndex: 'city',
                    width: '100%',
                    
                }],
                bbar: Ext.create('Ext.PagingToolbar', {
                    store: 'setup.City',
                    displayInfo: true,
                    displayMsg: 'view {0} - {1} of {2}',
                    emptyMsg: "view 0"
                })

            }, ]
        });
        this.callParent(arguments);
    },



});