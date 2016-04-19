Ext.define('App.view.admin.role.Index', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.roleIndex',
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
                    store: 'admin.Role',
                    title: 'Role Management',
                    tools: [

                        {
                            xtype: 'button',
                            action: 'Add',
                            iconCls: 'icon-add',
                            tooltip: 'Add New Role'
                        }, {
                            xtype: 'button',
                            action: 'Edit',
                            style: 'margin-left:5px',
                            iconCls: 'icon-edit',
                            tooltip: 'Edit Role'
                        }, {
                            xtype: 'button',
                            action: 'ApplyPermission',
                            style: 'margin-left:5px',
                            iconCls: 'icon-applyPermission',
                            tooltip: 'Apply System Permission'
                        }
                    ],
                    columns: [{
                            header: 'NO',
                            xtype: 'rownumberer',
                            width: 50,
                            align: 'center'
                        },{
                            header:'Role',
                            dataIndex:'name',
                            width:200
                        },{
                            header:'Description',
                            dataIndex:'description',
                            flex:1
                        }
                    ],
                    bbar: Ext.create('Ext.PagingToolbar', {
                        store: 'admin.Role',
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
