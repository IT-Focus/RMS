Ext.define('App.view.roomTransaction.nightAudit.Index', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nightAuditIndex',   
    // bodyPadding: 10,
    border: true,
    height: '100%',
    autoWidth:true,
    autoScroll:true,
    initComponent: function() {
       var me = this;         

        Ext.apply(this, {
            items:[
                {
                    xtype: 'form',
                    name:'indexPage',
                    title: "Night Audit",
                    textAlign:'center',
                    autoScroll:true,   
                    bodyPadding:30,                 
                    items:[
                        {
                            xtype:'datefield',
                            name:'date',
                            maxValue:new Date() , 
                            submitFormat: 'Y-m-d',
                             format: 'Y-m-d',
                            width:400 , 
                            fieldLabel:'Date'+redStar,
                            allowBlank:false , 
                            value:new Date(),
                            readOnly:true
                        },{
                            xtype:'textarea',
                            width:400 ,       
                            fieldLabel:'Remark'   ,                   
                            name:'comment'
                        },

                    ], 
                    buttons:[
                        {
                            xtype:'button',
                            text:'Save',
                            action:'Save',
                            iconCls:'icon-save'
                        }
                    ]

                }
            ],
            
        });
        this.callParent(arguments);

    },


});