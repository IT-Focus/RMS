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
      text: 'Copyright © 2016-2017 Small World Technology, All Rights Reserved.',
      style: 'font-size: 14px;margin-top:10px'
        //        	   html:'<h3> Document Management System</h3>',
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