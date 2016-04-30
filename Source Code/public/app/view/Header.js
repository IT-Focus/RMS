/**
 * Header
 */
Ext.define('App.view.Header', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.fmHeader',
  layout: 'hbox',
  id: 'header',
  bodyStyle: 'background-color:#0F4471 ;color:white',
  bodyPadding: 5,
  items: [

    {
      // width:'83%',
      border: false,
      xtype: 'label',
      flex: 1,
      text: 'Hotel Management System',
      style: 'font-weight: bold;font-size: 20px;margin-top:10px'
        //        	   html:'<h3> Document Management System</h3>',
    }, {
      xtype: 'label',
      width: 160,
      id: 'loggedin',
      style: ' text-align: right;font-weight:bold',
      margin: '10 0 0 0',

    }, {
      xtype: 'label',
      style: 'font-size: 15px;margin-top:10px; margin-right:20px',
      text: "Current Date:"+"    "+Ext.Date.format(new Date(), 'j-M-Y')
    },{
      xtype: 'label',
      style: 'font-size: 15px;margin-top:10px; margin-right:20px',
      text: "Current Time:"+"    "+Ext.Date.format(new Date(), 'h:i A')
    }, {
      text: 'Option',
      xtype: 'button',
      widht: 250,
      iconCls: 'icon-option',
      menu: {
        xtype: 'menu',
        plain: true,
        items: {
          xtype: 'buttongroup',
          // title: 'User options',
          columns: 1,
          defaults: {
            xtype: 'button',
            // scale: 'large',
            width: 200,
            iconAlign: 'left',

          },
          items: [
            // {
            //   iconCls: 'icon-kh',
            //   action: 'langauge',
            //   xtype: 'button',
            //   width: 100,
            //   text: 'ខ្មែរ',

            //   name: 'kh'
            // }, {
            //   iconCls: 'icon-en',
            //   action: 'langauge',
            //   xtype: 'button',
            //   text: 'English',
            //   name: 'en',
            //   width: 100
            // }, 
            // {
            //   text: 'Sale Panel',
            //   xtype: 'button',
            //   action: 'SalePanel',
            //   colspan: 2,
            //   iconCls: 'icon-sale',
            // }, 
            {
              id: 'logoutButton',
              xtype: 'button',
              iconAlign: 'right',
              iconCls: 'icon-logout',
              text: 'Logout',
              margin: '5 0 0 5',
              action: 'logout'
            }, {
              text: "ChangePassword",
              colspan: 2,
              iconCls: 'icon-edit',
              action: 'changePassword'
            }
          ]
        }
      }
    }


    // {
    //     id:'logoutButton',
    //     xtype:'button',
    //     iconAlign:'right',
    //     iconCls:'icon-logout',
    //     text:'Logout',
    //     margin:'5 0 0 5',
    //     action:'logout'
    // }

  ]
});