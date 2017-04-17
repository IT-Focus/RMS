Ext.define('App.view.reports.auditrail.Index', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.auditrailIndex',
    // title:'<font style="font-size: 18px;font-weight: bold;color: darkgoldenrod;text-decoration: underline;" >History Action</font>',
    // bodyPadding:10 ,
    // border:true,
    layout: 'card',
    initComponent: function() {
        Ext.apply(this, {
            items: [

                {
                    xtype: 'grid',
                    border: true,
                    name: 'index',
                    store: 'reports.Auditrail',
                    title: 'Auditrail History',
                    features: [{
                        ftype: 'grouping',
                        groupField: 'user_name',
                        groupHeaderTp1: '{name} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})',
                    }],
                    tools: [{
                        xtype: 'datefield',
                        name: 'from_date',
                        submitFormat: 'Y-m-d',
                        value: new Date(),
                        fieldLabel: 'From Date',
                        style: 'margin-right:-20px;',
                        labelAlign: 'right',
                    },{
                        xtype: 'datefield',
                        name: 'to_date',
                        submitFormat: 'Y-m-d',
                        value: new Date(),
                        fieldLabel: 'To Date',
                        style: 'margin-right:-20px;',
                        labelAlign: 'right',
                    },{
                        xtype: 'combo',
                        name: 'user',
                        valueField: 'id',
                        store: 'combo.User',
                        editable: true,
                        fieldLabel: 'User',
                        displayField: 'custom_name',
                        labelAlign: 'right',
                        style: 'margin-right:30px;',
                        queryMode: 'remote',
                        allowBlank: true,
                    }, {
                        xtype: 'button',
                        action: 'print',
                        text: 'Print',
                        style: 'margin-left:5px',
                        iconCls: 'icon-printer',
                        tooltip: 'Print'
                    }],
                    columns: [{
                            header: 'NO',
                            xtype: 'rownumberer',
                            width: 50,
                            align: 'center'
                        },{
                            header: 'USER',
                            autoWidth: true,
                            flex:1,
                            dataIndex: 'user_name'
                        },{
                            header: 'MODULE',
                            autoWidth: true,
                            flex:1,
                            dataIndex: 'module_name'
                        }, {
                            header: 'ACTION',
                            autoWidth: true,
                            flex:1,
                            dataIndex: 'action'
                        }, {
                            header: 'DATA DESCRIPTION',
                            autoWidth: true,
                            flex:1,
                            dataIndex: 'description'
                        }, {
                            header: 'DATE',
                            autoWidth: true,
                            flex:1,
                            dataIndex: 'created_at'
                        },

                    ],
                    bbar: Ext.create('Ext.PagingToolbar', {
                        store: 'reports.Auditrail',
                        displayInfo: true,
                        displayMsg: 'view {0} - {1} of {2}',
                        emptyMsg: "view 0"
                    })

                }
            ]
        });
        this.callParent(arguments);
    },



});