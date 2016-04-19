var redStar ="<span style='color:red'> * </span>"; 
Ext.application({
    appFolder:'app',
    name:'App',
    controllers:[

    	'Login',
        'Util',
        'Menu',
        // admin module
        'admin.User',
        // 'admin.Role',
        // 'admin.MenuProfile'

    ],
    launch : function() {
      var viewport = Ext.create('App.view.Viewport');
    }
});
