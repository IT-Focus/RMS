
Ext.define('App.view.admin.auditrail.Index', {
    extend:'Ext.panel.Panel',
    alias:'widget.auditrailIndex' ,	   
    title:'<font style="font-size: 18px;font-weight: bold;color: darkgoldenrod;text-decoration: underline;" >History Action</font>',
    bodyPadding:10 ,
    border:true,
    layout:'card',   
    initComponent:function () {
        Ext.apply(this, {   items:[

                                {
                                    xtype:'grid',
                                    border:true,
                                    name:'index',
                                    store:'admin.Auditrail',
                                  
                                    columns:[
                                        {header:'NO', xtype:'rownumberer', width:50, align:'center'},
                                        {header:'MODULE',width:120,dataIndex:'module'},                                 
                                        {header:'ACTION',width:100,dataIndex:'ad_type'},                                 
                                        {header:'DATA DESCRIPTION',flex:1,dataIndex:'description'},                                 
                                        {header:'DATE',width:200,dataIndex:'created_at'},                                 
                                  
                                    ],
                                    bbar:Ext.create('Ext.PagingToolbar', {
                                        store:'admin.Auditrail',
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