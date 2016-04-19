
Ext.define('App.controller.Menu', {
	extend: 'Ext.app.Controller',
	init: function() {
		
	    this.control({
	    	
	    });
	},
	
	showPage: function(fileName){
		var tabpanel = Ext.getCmp('container-page');
		var panel =tabpanel.down('panel[action='+fileName+']');
		if (panel) {			
			tabpanel.setActiveItem(panel);

		}else{
			panel = Ext.create("App.view."+fileName,{action:fileName});
			tabpanel.add(panel);
			tabpanel.setActiveItem(panel);

		};


	}, 
	loadStore: function(cn , vn){

		var ctrl = App.app.getController(cn); 
		var tabpanel = Ext.getCmp('container-page');
		var xtype =ctrl.getView(vn);
	
		var component = null ; 
		if (xtype) {

			component=  tabpanel.down(xtype.xtype);
		};
	

		if (component) {
		}else{
			Util.loadControllerStore(cn);

		};
			

	}

})