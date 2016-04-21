Ext.define('App.view.setup.floor.Index', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.floorIndex',
    // bodyPadding: 10,
    // border: true,
    layout: 'card',
    initComponent: function() {
        Ext.apply(this, {
            items: [{
                xtype: 'grid',
                border: true,
                name: 'floorGrid',
                store: 'setup.Floor',
                title: 'Floor Management',
                tools: [
                    {
                        xtype: 'combo',
                        fieldLabel: '<b>Search By</b>',
                        store: ['Code', 'Name'],
                        value: 'Name',
                        labelAlign: 'right',
                        name: 'searchBy',
                        editable: false,
                        style: 'padding-right:10px'
                    }, {
                        xtype: 'textfield',
                        name: 'string',
                        width: 300,
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
                    header: 'Code',
                    dataIndex: 'code',
                    width: 200,
                    locked: true
                }, {
                    header: 'Name',
                    dataIndex: 'name',
                    width: 200
                }, {
                    header: 'Description',
                    dataIndex: 'description',
                    flex: 1
                }],
                bbar: Ext.create('Ext.PagingToolbar', {
                    store: 'setup.Floor',
                    displayInfo: true,
                    displayMsg: 'view {0} - {1} of {2}',
                    emptyMsg: "view 0"
                })

            }, ]
        });
        this.callParent(arguments);
    },



});