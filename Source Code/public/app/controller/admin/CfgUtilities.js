
Ext.define('App.controller.admin.CfgUtilities', {
	extend: 'Ext.app.Controller',
	views:[
		'admin.CfgUtilities.Index',

	],	
	stores:[
		'admin.CompanyProfile'
	],
	init: function() {
		
	    this.control({
	    	'CfgUtilitiesIndex filefield[name=image]': {
				change: this.uploadLogoImage
			},
			'CfgUtilitiesIndex button[action=Remove_logo]': {
				click: this.removeImage
			},
			'CfgUtilitiesIndex button[action=Remove_background]': {
				click: this.removeImage
			},
			'CfgUtilitiesIndex button[action=save_company_profile]': {
				click: this.save
			},


	    });
	},

	uploadLogoImage: function(field) {
		var form = field.up('form');
		if (form.getForm().isValid()) {
			form.getForm().submit({
				url: '/Images/upload_image',
				waitMsg: 'Uploading Image ...',
				success: function(formPanel, action) {
					var data = Ext.decode(action.response.responseText);
					form.down('image').setSrc(data.image_url);
					form.down('hiddenfield[name=image_url]').setValue(data.image_url);
				},
				failure: function(formPanel, action) {
					var data = Ext.decode(action.response.responseText);
					alert("Failure: " + data.data);
				}

			});
		}
	},
	removeImage: function(btn) {
		var form = btn.up('form');
		form.down('image').setSrc("");
	},

	save: function(btn){
		debugger;
		var form = btn.up('form').getForm(),
			// frm = btn.up('form'),
			me = this,
			values = form.getValues(),
			record = form.getRecord(),
			store = me.getAdminCompanyProfileStore();

		if (form.isValid()) {


			var model = Ext.create('App.model.admin.CompanyProfile');
			model.set(values);
			store.add(model);

			store.sync({
				success: function(batch, options) {

					Ext.MessageBox.show({
						title: 'Saved',
						msg: 'Record Save Succeed.',
						icon: Ext.MessageBox.INFO,
						buttons: Ext.Msg.OK
					});

				},
				failure: function(batch, options) {

					var msg = batch.proxy.reader.rawData.error;
					Ext.MessageBox.show({
						title: 'Error',
						msg: msg,
						icon: Ext.MessageBox.ERROR,
						buttons: Ext.Msg.OK
					});
				},
			});


		} else {
			Util.msg('Please entry require field');
		}
	}



})