
Ext.define('App.controller.Login', {
	extend: 'Ext.app.Controller',
	views:[
		'Login',
		'Header',
		'Menu'
		
	],
	
	init: function() {
		
	    this.control({
	    	"fmLogin":{
	    		afterrender:this.checkUserLogedIn
	    	},
	    	'fmLogin button[action=Login]':{
	    		click: this.clickLogin
	    	},
	    	'fmLogin textfield':{
	    		specialkey: this.submit
	    	},
	    	'fmHeader button[action=logout]':{
	    		click: this.logout
	    	}
	    });


	    
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
		
			// Ext.get('loggedin').setText(obj.data.first_name +" "+ obj.data.last_name);
			me.showPageCustomer();
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

		}else{
			Ext.Msg.alert('Inform', 'Please entry Username and Password');
		};

	}	

})