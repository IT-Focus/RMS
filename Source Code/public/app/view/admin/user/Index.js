
Ext.define('App.view.admin.user.Index', {
    extend:'Ext.panel.Panel',
    alias:'widget.userIndex' ,
    
    border:false,
    layout:'card',
    initComponent:function () {
        Ext.apply(this, {   items:[

                                {
                                    xtype:'grid',
                                    border:true,
                                    name:'index',
                                    store:'admin.User',
                                    title:'User Management',

                                     tools:[

                                        {   xtype:'button',
                                            action:'Add',
                                            iconCls:'icon-add',
                                            tooltip:'Add New User'
                                        },
                                        {
                                            xtype:'button',
                                            action:'Edit',
                                            style:'margin-left:5px',
                                            iconCls:'icon-edit',
                                            tooltip:'Edit User'
                                        }
                                    ],
                                    columns:[
                                        {header:'NO', xtype:'rownumberer', width:50, align:'center'},
                                        {header:'FIRST NAME ',width:120,dataIndex:'first_name'},
                                        {header:'LAST NAME ',width:100,dataIndex:'last_name'},
                                        {header:'PHONE',width:200,dataIndex:'phone'},
                                        {header:'EMAIL',width:200,dataIndex:'email'},
                                        {header:'USERNAME',width:200,dataIndex:'username'},
                                        {header:'STATUS',width:200,dataIndex:'is_active',

                                            renderer:function(val, meta, record){
                                                console.log(record );
                                                if (record.data.is_active == true ) {
                                                    return "<span style='color:green'> Active </span>"
                                                } else{
                                                    return "<span style='color:red'> Deactive </span>"

                                                };

                                            }
                                        },

                                        {header:'ACTION',xtype:'actioncolumn',width:100,align:'center',
                                            items:[
                                                {
                                                   icon:'images/edit.png',
                                                    tooltip:'Edit' ,
                                                    handler: function(grid, rowIndex, colIndex) {
                                                        var rec = grid.getStore().getAt(rowIndex);
                                                        var controller =App.app.getController("admin.User");
                                                        controller.edit(rec,grid);

                                                    }

                                                },

                                            ]
                                    },
                                    ],
                                    bbar:Ext.create('Ext.PagingToolbar', {
                                        store:'admin.User',
                                        displayInfo: true,
                                        displayMsg: 'view {0} - {1} of {2}',
                                        emptyMsg: "view 0"
                                    })

                                },{
                                    xtype:'userForm'
                                }
                            ]
        });
        this.callParent(arguments);
    },




});
