Ext.define('App.view.setup.workshift.Index', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.workshiftIndex',
    // bodyPadding: 10,
    // border: true,
    layout: 'card',
    initComponent: function() {
        Ext.apply(this, {
            items: [{
                xtype: 'grid',
                border: true,
                name: 'workshiftGrid',
                store: 'setup.Workshift',
                title: 'Workshift Management',
                tools: [
                    {
                        xtype: 'textfield',
                        name: 'string',
                        emptyText: '------workshift------',
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
                    header: 'Abbr',
                    dataIndex: 'abbr',
                    width: 200,
                }, {
                    header: 'Name',
                    dataIndex: 'name',
                    width: 200
                }, {
                    header: 'Start Time',
                    dataIndex: 'start_time',
                    flex: 1,
                    renderer: Ext.util.Format.dateRenderer('H:i'),
                },{
                    header: 'End Time',
                    dataIndex: 'end_time',
                    renderer: Ext.util.Format.dateRenderer('H:i'),
                    flex: 1
                },{
                    header: 'Description',
                    dataIndex: 'description',
                    flex: 1
                }],
                bbar: Ext.create('Ext.PagingToolbar', {
                    store: 'setup.Workshift',
                    displayInfo: true,
                    displayMsg: 'view {0} - {1} of {2}',
                    emptyMsg: "view 0"
                })

            }, ]
        });
        this.callParent(arguments);
    },



});