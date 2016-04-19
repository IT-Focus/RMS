
Ext.define('App.view.Login', {
    extend:'Ext.panel.Panel',
    alias:'widget.fmLogin' ,	
    // make panel center
  	layout: {
		type: 'vbox',
		align: 'center',
		pack: 'center'
	}  ,
    bodyStyle:'background-color:silver',
    items:[
	    // {
	    // 	html:'<img src="images/companylogo.jpg" width = "200px" height="100px"> ' ,
	    // 	style:'margin-top:-200px'

	    // },
    	{
    		xtype:'form',
    		bodyPadding: 30 ,
    		// bodyStyle: 'background:transparent;',
    		title:' <center><font style="font-size:17px; font-weight:bold; " >Login Admin Page  </font></center>',
            style:'border: 1px solid silver',
    		border:true,
    		defaults:{allowBlank:false, width:350 },
    		items:[
    			{
    				xtype:'textfield',
    				name:'username',
                    emptyText:'User Name',
    				fieldLabel:'User Name', 
                    value:'Admin'
    			},{
    				xtype:'textfield',
    				inputType: 'password' ,
                    emptyText:'Password',
    				fieldLabel:'Password',
                    value:'Admin',
    				name:'password'
    			}


    		], 
    		buttons:[
    			{
    				text:'Login',
    				action:'Login',
                    iconCls:'icon-login'
    			}

    		]
    	}
	  
    ]


});