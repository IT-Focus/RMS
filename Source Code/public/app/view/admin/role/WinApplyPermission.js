Ext.define('App.view.admin.role.WinApplyPermission', {
    extend: 'Ext.window.Window',
    alias: 'widget.roleWinApplyPermission',
    bodyPadding:10,
    border: true,
    title: 'Apply Permission',
    modal: true,
    width: 700,
    height: 500,
    layout: 'fit',
    buttons: [

        {
            text: 'Save',
            iconCls: 'icon-save',
            action: 'Save'
        }, {
            text: 'Cancel',
            action: 'Cancel',
            iconCls: 'icon-cancel'
        }
    ],

    items: [{
            xtype: 'grid',
            store: 'admin.RelMenu',
            border:true,
            tbar:[
                {
                    xtype:'hiddenfield',
                    itemId:'role_id'
                }
            ],
            features: [{
                id: 'group',
                ftype: 'grouping',
                groupHeaderTpl: '<b>{name}</b>',
                hideGroupedHeader: true,
                enableGroupingMenu: false
            }],
            columns: [{
                    header: 'Allow',
                    xtype: 'checkcolumn',
                    dataIndex: 'checked',
                    listeners: {
                        checkchange: function(column, recordIndex, checked) {
                            var ctrl = App.app.getController("admin.Role");
                            ctrl.updatePermission(column, recordIndex, checked)


                        }
                    }

                }, {
                    header: 'Menus',
                    dataIndex: 'menu',
                    flex: 1
                }

            ]
        }

    ]



});
