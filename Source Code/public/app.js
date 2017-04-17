var redStar ="<span style='color:red'> * </span>"; 
var _now = new Date(); 
Ext.application({
    appFolder:'app',
    name:'App',
    controllers:[

    	'Login',
        'Util',
        'Menu',
        'GlobalFunction',
        // admin module
        'admin.User',
         'roomTransaction.CheckIn',
        // 'admin.Role',
        // 'admin.MenuProfile'

    ],
    launch : function() {
      var viewport = Ext.create('App.view.Viewport');
       var ctrl = App.app.getController("roomTransaction.RoomMonitor");
        ctrl.loadDefaultColor();
    }
});
