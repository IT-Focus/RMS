/**
 * Header
 */
Ext.define('App.view.Header', {
    extend:'Ext.panel.Panel',
    alias:'widget.fmHeader',
    layout:'hbox',
    id:'header',
    bodyStyle:'background-color:#0F4471;color:white',
    bodyPadding:5,
    items:[

           {
        	   // width:'83%',
        	   border:false,
        	   xtype:'label',
             flex:1,
        	   text:'Sample System',
    		   style:'font-weight: bold;font-size: 20px;margin-top:10px'
//        	   html:'<h3> Document Management System</h3>',
           },{
        	   xtype:'label',
        	   width:160,
        	   id:'loggedin',
        	   style:' text-align: right;font-weight:bold',
        	   margin:'10 0 0 0',

           }, {
               id:'logoutButton',
               xtype:'button',
               iconAlign:'right',
               iconCls:'icon-logout',
               text:'Logout',
               margin:'5 0 0 5',
               action:'logout'
           }

    ]
});
