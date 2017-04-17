Ext.define('App.view.roomTransaction.customer.Index', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.CustomerIndex',
    // bodyPadding: 10,
    border: true,
    layout: 'card',
    initComponent: function() {
        Ext.apply(this, {
            items: [{
                xtype: 'grid',
                border: true,
                name: 'index',
                store: 'roomTransaction.Customer',
                title: 'Customer Lists',
                
                tools: [{
                        xtype: 'combo',
                        fieldLabel: '<b>Search By</b>',
                        store: ['Customer Name', 'Phone', 'Passport', 'National No'],
                        value: 'Customer Name',
                        labelAlign: 'right',
                        name: 'searchBy',
                        editable: false,
                        autoWidth: true,
                        style: 'padding-right:10px'
                    }, {
                        xtype: 'textfield',
                        name: 'string',
                        autoWidth: true,
                    },
                    {
                        xtype: 'button',
                        action: 'Add',
                        iconCls: 'icon-add',
                        tooltip: 'Add new Customer'
                    }, {
                        xtype: 'button',
                        action: 'Edit',
                        style: 'margin-left:5px',
                        iconCls: 'icon-edit',
                        tooltip: 'Edit Customer'
                    },
                ],
                columns: [{
                    header: 'NO',
                    xtype: 'rownumberer',
                    width: 50,
                    align: 'center'
                }, {
                    header: 'Customer Name',
                    dataIndex: 'customer_name',
                    autoWidth: true,
                    flex: 1
                },{
                    header: 'Phone',
                    dataIndex: 'phone',
                    autoWidth: true,
                    flex: 1
                },{
                    header: 'Address',
                    dataIndex: 'address',
                    autoWidth: true,
                    flex: 1,
                },{
                    header: 'Email',
                    dataIndex: 'email',
                    autoWidth: true,
                    flex: 1
                }],
                bbar: Ext.create('Ext.PagingToolbar', {
                    store: 'roomTransaction.Customer',
                    displayInfo: true,
                    displayMsg: 'view {0} - {1} of {2}',
                    emptyMsg: "view 0"
                })

            }
            ,{
                xtype:"CustomerForm"
            }


         ]
        });
        this.callParent(arguments);
    },



});