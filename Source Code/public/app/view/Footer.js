/**
 * Footer
 */
Ext.define('App.view.Footer', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.fmFooter',
  layout: 'hbox',
  id: 'footer',
  bodyStyle: 'background-color:#003366 ;color:white',
  bodyPadding: 5,
  items: [

    {
      // width:'83%',
      border: false,
      xtype: 'label',
      flex: 1,
      text: 'Copyright © 2016-2017 IT Focus Technology, All Rights Reserved.',
      style: 'font-size: 14px;margin-top:10px'
        //        	   html:'<h3> Document Management System</h3>',
    },{
      xtype: 'label',
      style: 'font-size: 15px;margin-top:10px; margin-right:20px',
      text: "Date/Time:"+"    "+Ext.Date.format(new Date(), 'j-M-Y g:i:s A')
    },
    
    // {

    //   border: false,
    //   xtype: 'label',
    //   flex: 1,
    //   text: 'Current User:',
    //   style: 'font-size: 14px;margin-top:10px'
      
    // }, 



  ]
});