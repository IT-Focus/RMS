Ext.define('App.view.setup.categoryMaster.Index', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.categoryMasterIndex',
    // bodyPadding: 10,
    // border: true,
    layout: 'card',
    initComponent: function() {
        Ext.apply(this, {
            items: [{
                xtype: 'grid',
                border: true,
                name: 'index',
                store: 'setup.CategoryMaster',
                title: 'Category Master Management',
                tools: [{
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
                    autoWidth:true,
                    locked: true
                }, {
                    header: 'Name',
                    dataIndex: 'name',
                    autoWidth:true,
                }, {
                    header: 'Rent Per Day',
                    dataIndex: 'tariff',
                    flex: 1,
                    renderer: function(value){
                             amount =  Number(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + " $";
                            return "<span style='color:black'><b>"+amount+"</b></span>"
                        }
                },{
                    header: 'Rent Per Hour',
                    dataIndex: 'tariff_hour',
                    flex: 1,
                    renderer: function(value){
                             amount =  Number(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + " $";
                            return "<span style='color:black'><b>"+amount+"</b></span>"
                        }
                },{
                    header: 'Rent Per Month',
                    dataIndex: 'tariff_month',
                    flex: 1,
                    renderer: function(value){
                             amount =  Number(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + " $";
                            return "<span style='color:black'><b>"+amount+"</b></span>"
                        }
                }],
                bbar: Ext.create('Ext.PagingToolbar', {
                    store: 'setup.CategoryMaster',
                    displayInfo: true,
                    displayMsg: 'view {0} - {1} of {2}',
                    emptyMsg: "view 0"
                })

            }, {
                xtype: 'categoryMasterForm'
            }]
        });
        this.callParent(arguments);
    },



});