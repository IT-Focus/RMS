/**
 * Header
 */
Ext.define('App.view.Header', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.fmHeader',
  layout: 'hbox',
  id: 'header',
  bodyStyle: 'background-color:#003366 ;color:white',
  bodyPadding: 5,
  listeners: {
    afterrender: function() {
         

          Ext.getCmp('loggedin').setText('Logged in as: ');
  
        
    }
  },
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
      flex: 1,
      id: 'loggedin',
      text: 'test',
      style: ' text-align:right;font-weight:bold',
      margin: '10 0 0 0',

    },
    // {
    //   xtype: 'label',
    //   style: 'font-size: 15px;margin-top:10px; margin-right:20px',
    //   // text: "Date/Time:"+"    "+Ext.Date.format(new Date(), 'j-M-Y g:i:s A')
    //   text: "Date/Time:"+"    "+Ext.Date.format(new Date(), 'j-M-Y g:i:s A')
    // },
    {
      text: 'Option',
      xtype: 'button',
      autoWidth: true,
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