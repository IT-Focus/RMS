/**
 * created by: Monydara
 */
Ext.define('App.view.Menu', {
    extend:'Ext.panel.Panel',
    alias:'widget.fmMenu',
	// border:true,
  	layout: {
	    // layout-specific configs go here
	    type: 'accordion',
	    titleCollapse: false,
	    animate: true,
	    fill:true,
	     // multi: true,
	    // activeOnTop: true
	},
	defaults:{
		listeners: {
	      afterrender: function(panel) {
	        panel.header.el.on('click', function() {
	          if (panel.collapsed) {panel.expand();}
	          else {panel.collapse();}
	        });
	      }
	    },
	    showSeparator: false,
        floating: false,
        hideHeader: false,
        collapsed: true ,
	},

  	fn:function(field){
  		var controllerName = field.cn ;
  		var viewName = field.vn ;
  		if (controllerName) {
  			// check if form already load
  			App.app.getController('Menu').loadStore( controllerName, viewName+".Index");
  		}

  		if (viewName) {
  			App.app.getController('Menu').showPage(viewName+".Index");

  		};


  	},
   	initComponent:function () {
      App.app.getAdminUserController().getMenuList(this);
   		// var menus = [] ;
   		// menus  = [

   		// 	{

   		// 		title:'System Administration',
   		// 		xtype:'menu',
   		// 		cls:'my-menu',

	    //         items:[
	    //         	{
	    //         		text:'User',
	    //         		style:'font-weight:bold',
	    //         		iconCls:'icon-setting',
	    //         		handler:this.fn,
	    //         		cn:'admin.User',
     //              vn:'admin.user'

	    //         	},'-',
     //            {
     //                text:'Role',
     //                style:'font-weight:bold',
     //                iconCls:'icon-setting',
     //                handler:this.fn,
     //                cn:'admin.Role',
     //                vn:'admin.role'
     //            },'-',
     //            ,
	    //         	{
	    //         		text:'Department',
	    //         		iconCls:'icon-department',
	    //         		handler:this.fn,
	    //         		cn:'admin.Department',
     //              vn:'admin.department'

	    //         	},
	    //         ]
   		// 	}

   		// ]

        // Ext.apply(this, {
        // 	items:menus
        // });


        this.callParent(arguments);
    },
});
