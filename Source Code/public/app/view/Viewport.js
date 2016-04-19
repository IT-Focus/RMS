
Ext.define('App.view.Viewport', {
    extend:'Ext.container.Viewport',
    layout:'card',    
    id:'mainPage',
    require:['App.view.game.Index'],

    items:[

        // {
        //     xtype:'fmLogin',
            
        // },
        {
            xtype:'panel',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items:[
                {
                    xtype:'fmHeader',
                    height:45
                },
                {
                    xtype:'panel',                
                    flex:1, 
                    layout:'border',          
                    items:[
                        {
                            xtype:'fmMenu',
                            // collapsible:true,
                            split:true,
                            width:300,          
                            region:'west',
                            // title:'Menu List',
                            // items:[
                            //    {
                            //         xtype:'fmMenu'
                            //     }
                            // ]

                        },{
                            xtype:'panel',
                            border:false,
                            region:'center',
                            layout:'card',
                            id:'container-page',
                            items:[
                                // {
                                //     xtype:'roomIndex'
                                // }
                            ]
                           
                        }


                    ]

                }

            ],
            
        },
    	
	  
    ]


});