Ext.define('App.view.admin.department.Index', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.departmentIndex',
    // bodyPadding: 10,
    // border: true,
    layout: 'card',
    initComponent: function() {
        Ext.apply(this, {
            items: [

                {
                    xtype: 'grid',
                    border: true,
                    name: 'index',
                    store: 'admin.Department',
                    title: 'Department Management',

                    tools: [

                        {
                            xtype: 'button',
                            action: 'Add',
                            iconCls: 'icon-add',
                            tooltip: 'Add New Department'
                        }, {
                            xtype: 'button',
                            action: 'Edit',
                            style: 'margin-left:5px',
                            iconCls: 'icon-edit',
                            tooltip: 'Edit Department'
                        }
                    ],
                    columns: [{
                            header: 'NO',
                            xtype: 'rownumberer',
                            width: 50,
                            align: 'center'
                        },{
                            header:'Department',
                            dataIndex:'name',
                            width:200
                        },{
                            header:'Description',
                            dataIndex:'description',
                            flex:1
                        }
                    ],
                    bbar: Ext.create('Ext.PagingToolbar', {
                        store: 'admin.Department',
                        displayInfo: true,
                        displayMsg: 'view {0} - {1} of {2}',
                        emptyMsg: "view 0"
                    })

                },
            ]
        });
        this.callParent(arguments);
    },



});
