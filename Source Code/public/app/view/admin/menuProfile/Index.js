Ext.define('App.view.admin.menuProfile.Index', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.menuProfileIndex',
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
                    store: 'admin.MenuProfile',
                    title: 'Menu Profile',

                    tools: [

                        {
                            xtype: 'button',
                            action: 'Add',
                            iconCls: 'icon-add',
                            tooltip: 'Add New menuProfile'
                        }, {
                            xtype: 'button',
                            action: 'Edit',
                            style: 'margin-left:5px',
                            iconCls: 'icon-edit',
                            tooltip: 'Edit menuProfile'
                        }
                    ],
                    columns: [{
                            header: 'NO',
                            xtype: 'rownumberer',
                            width: 50,
                            align: 'center'
                        },{
                            header:'Menu Profile',
                            dataIndex:'menu',
                            flex:1,
                            autoWidth:true
                        },{
                            header:"Parent Menu",
                            dataIndex:'parent_menu_name',
                            flex:1,                              
                            autoWidth:true

                        },{
                            header:"View Index",
                            dataIndex:'view_index' ,
                            flex:1,
                            autoWidth:true
                        },{
                            header:'Controller ',
                            dataIndex:'controller',
                            flex:1,
                            autoWidth:true
                        },{
                            header:"Status", 
                            dataIndex:'is_active',
                            autoWidth:true,
                            renderer:function(value){
                                return value == true ? "<span style='color:green'>Active</span>" : "<span style='color:red'>Deactive</span>";
                            }
                        },{
                            header:'Description',
                            dataIndex:'description',
                            autoWidth:true,
                            flex:1
                        }
                    ],
                    bbar: Ext.create('Ext.PagingToolbar', {
                        store: 'admin.MenuProfile',
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
