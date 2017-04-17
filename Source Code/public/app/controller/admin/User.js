
Ext.define('App.controller.admin.User', {
	extend: 'Ext.app.Controller',
	views:[
		'admin.user.Index',
		'admin.user.Form'

	],
	stores:[
		'admin.User',
		'combo.Role',
		'combo.Department',
		
	],
	init: function() {

	    this.control({
	    	'userIndex button[action=Add]':{
	    		click: this.checkLimit
	    	},
	    	'userIndex button[action=Edit]':{
	    		click: this.edit
	    	},
	    	// 'userForm button[action=Save]':{
	    	// 	click: this.save
	    	// },
	    	'userForm button[action=Cancel]':{
	    		click: this.cancel
	    	},
	    	// 'Viewport > fmMenu':{
	    	// 	// afterrender
	    	// }

	    });
	},

	edit:function(btn){
		var rec = Util.getRecord(btn,"Please select record for edit ");
		if (rec) {
			var conatiner = btn.up('userIndex');
			var form = conatiner.down('userForm');
			form.getForm().loadRecord(rec);
			conatiner.setActiveItem(form);
		};

	},
	// add:function(btn){
	// 	var conatiner = btn.up('userIndex');
	// 	var form = conatiner.down('userForm');
	// 	form.getForm().reset();
	// 	conatiner.setActiveItem(form);

	// },

	setCode: function(obj, form) {

		if (obj.success) {
			var txtCode = form.down("textfield[name=sale_quotation_no]");
			// check form is do action for add new or edit
			if (form.getRecord()) {
				// for edit form
				if (obj.is_manaul) {

					txtCode.setReadOnly(false);
				} else {
					txtCode.setReadOnly(true);
				}

			} else {
				// for add new form
				if (obj.is_manaul) {
					txtCode.setReadOnly(false);
					txtCode.setValue('');
					txtCode.focus(true, 200);
				} else {
					txtCode.setValue(obj.code);
					txtCode.setReadOnly(true);
					form.down('combo[name=customer_id]').focus(true, 300);
				};

			};

		} else {
			Ext.Msg.alert("Error", "System Can't Get Code");
		};
	},

	checkLimit :function(btn){
		// debugger;
		var me = this ;
		Util.ajax("SysUsers/check_user_limit",{test:1}, me.add , {me:me , btn:btn}  );


	},

	saveUserForm :function(btn){
		var me = this ;
		var store = me.getAdminUserStore();
		Util.saveForm(btn,store,'admin.User', me);
	},
	add :function(obj , param){
		// alert(obj.max_user);
		if (obj.success == true) {
			var conatiner = param.btn.up('userIndex');
			var form = conatiner.down('userForm');
			form.getForm().reset();
			conatiner.setActiveItem(form);
		}else{
			Util.msg("You're privilege to create "+obj.max_user+" only!");
		};
	},
	cancel:function(btn){
		var conatiner = btn.up('userIndex');
		var grid = conatiner.down('grid[name=index]');
		conatiner.setActiveItem(grid);
	},
	delete: function(rec , grid ){
		var store = grid.getStore();
		 Ext.MessageBox.confirm('Confirm', 'Are you sure to Delete this record?',
		 	function(btn ){

		 		if (btn == 'yes') {
		 			store.remove(rec);
		 			store.sync();
		 		};
		 	});

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
	getMenuList:function(view){
		Util.ajax("/Menu/get_menu_by_user" ,{menu:0}, this.applyMenuList , view)
	},
	applyMenuList:function(obj , view){
		main_menu = obj.main
		sub_menu = obj.sub
		items = new Array()
		me = App.app.getAdminUserController()

		main_menu.forEach(function(eachMainMenu){

			main_id = eachMainMenu.id
			subItemMenu = new Array()
// =========== sub menu
			sub_menu.forEach(function(eachSubMenu){
				if (eachSubMenu.parent_id == main_id ) {
					subObj={
						text: eachSubMenu.menu ,
	            		style:'font-weight:bold',
	            		iconCls:eachSubMenu.icon_cls,
	            		handler:me.fn,
	            		cn:eachSubMenu.controller,
		                vn:eachSubMenu.view_index

					}
					subItemMenu.push(subObj)
				};

			})

// ========== main menu
			if (subItemMenu.length>0){
			itemObj={
				title:eachMainMenu.menu,
   				xtype:'menu',
   				cls:'my-menu',
   				iconCls:eachMainMenu.icon_cls ,
   				items:subItemMenu
			}
			items.push(itemObj)

		}
		
		})
		// debugger;
		view.add(items)

	}



})
