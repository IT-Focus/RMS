
Ext.define('App.controller.Login', {
	extend: 'Ext.app.Controller',
	views:[
		'Login',
		'Header',
		'Menu',
		'Footer'
		
	],
	
	init: function() {
		
	    this.control({
	    	// "fmLogin":{
	    	// 	afterrender:this.checkUserLogedIn
	    	// },
	    	// 'fmLogin button[action=Login]':{
	    	// 	click: this.clickLogin
	    	// },
	    	'fmLogin textfield':{
	    		specialkey: this.submit
	    	},
	    	'fmHeader button[action=logout]':{
	    		click: this.logout
	    	},

	    	//============Option
	    	'fmHeader button[action=changePassword]':{
	    		click: this.showFormChangePassword
	    	},
	    	'userChangePassword button[action=Cancel]':{
	    		click: Util.closeWindow
	    	},
	    	'userChangePassword button[action=Save]':{
	    		click: this.saveChangePassword
	    	},
	    });


	    
	},
	showFormChangePassword:function(btn){
		win = Ext.create("App.view.admin.user.ChangePassword")
		win.show()
		win.center()
		win.down("textfield").focus(true , 200 )
	},
	saveChangePassword:function(btn){
		win = btn.up('window')
		form = win.down('form')
		value = form.getValues()

		if (form.getForm().isValid()) {
			params = {
				newPassword:value.new_password,
				confirmPassword:value.confirm_password
			}

			Util.ajax("/SysUsers/changePassword", params , this.afterChangePassword , win )
		}else{
			Util.msg("Please correct data entry")
		};

	},
	afterChangePassword:function(obj , win ){
		win.close() ;
	},
	logout:function(btn){
		this.showPageLogin();		

	},
	checkUserLogedIn:function(){
		var username = Ext.util.Cookies.get("username");
		var password = Ext.util.Cookies.get("password");

		if (username && password) {		
	
			this.logInProcess(username,password);

		}else{

			this.showPageLogin();

		};
	},
	showPageLogin:function(){
		var form = Ext.create("Ext.form.Panel");

		form.getForm().doAction('standardsubmit',{
		   url: '/home/logout',
		   standardSubmit: true,
		   method: 'POST'
		});
	},
	submit:function(f,e){
		if (e.getKey() == e.ENTER) {
                    this.clickLogin();
        }
	},
	showPageCustomer:function(){
		var page = Ext.getCmp('mainPage');
		
		page.getLayout().setActiveItem(1);
	},
	logInProcess:function(username, password){

		if(username && password){
			 Ext.MessageBox.wait("Please Wait ...... ",'System  logIn');
			
			this.username=username;
			this.password= password;
			
			// this.showPageCustomer();
			Util.ajax('Login/login',{username:username,password:password},this.resultLogin,this);	
			
			
		}
		


	},
	resultLogin: function(obj,me){
		
		if (obj.success) {
			alert(123);
			// me.showPageCustomer();
			
			Ext.MessageBox.hide();

			
		}else{
			Ext.MessageBox.hide();
			Ext.Msg.alert('Inform', 'Incorrect Username or Password');
			me.showPageLogin();			

		};
	},
	clickLogin:function(){

		var form =Ext.getCmp('mainPage').down('form');

		if (form.getForm().isValid()) {
			var values = form.getValues();
			this.logInProcess(values.username, values.password);
			App.widgets.SessionMonitor.start();
			Ext.getCmp('loggedin').update('Logged in as: ' + ' <b>' + values.username + '</b>');
			
		}else{
			Ext.Msg.alert('Inform', 'Please entry Username and Password');
		};

	}

	
})