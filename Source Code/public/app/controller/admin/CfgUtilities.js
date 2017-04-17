
Ext.define('App.controller.admin.CfgUtilities', {
	extend: 'Ext.app.Controller',
	views:[
		'admin.CfgUtilities.Index',
		'admin.CfgUtilities.NextCodeForm'

	],	
	model :[
		'admin.NextCode',
		'admin.CfgUtility',
	],
	stores:[
		'admin.CompanyProfile',
		'admin.CfgUtility',
		'admin.NextCode'

	],
	init: function() {
		
	    this.control({
	    	'CfgUtilitiesIndex filefield[name=image]': {
				change: this.uploadLogoImage
			},
			// 'CfgUtilitiesIndex filefield[name=image_background]': {
			// 	change: this.uploadLogoImage
			// },
			'CfgUtilitiesIndex button[action=save_company_profile]': {
				click: this.save
			},
			'CfgUtilitiesIndex button[action=Remove_logo]': {
				click: this.removeImage
			},
			'CfgUtilitiesIndex button[action=Remove_background]': {
				click: this.removeImage
			},
			'CfgUtilitiesIndex button[action=add_next_code]': {
				click: this.add_next_code
			},
			'nextCodetForm button[action=Save]': {
				click: this.save_next_code
			},
			'CfgUtilitiesIndex button[action=edit_next_code]': {
				click: this.edit_next_code
			},
			'CfgUtilitiesIndex textfield[name=Search_naxt_code]': {
				change: this.search_next_code
			},
			'nextCodetForm button[action=Cancel]': {
				click: this.cancel
			},
			'CfgUtilitiesIndex button[action=update_receipt]': {
				click: this.update_receipt
			},
			'CfgUtilitiesIndex button[action=update_vat]': {
				click: this.update_vat
			},
			'CfgUtilitiesIndex button[action=update_service_vat]': {
				click: this.update_service_vat
			},


	    });
	},

	update_receipt: function(btn) {
		debugger;
		// tabPanel = btn.up('tabpanel');
		form = btn.up('form[name=receiptForm]');
		receiptImage = form.down('checkbox[name=is_image]');
		receiptHeaderUrl = form.down('hiddenfield[name=image_url]');
		receiptHeaderText = form.down('textfield[name=recipt_header]');

		if (form.isValid()) {
			var store = this.getAdminCfgUtilityStore();
			store.load({
				scope: this,
				callback: function(record, operation, success) {
					for (var i = 0; i < record.length; i++) {
						switch (record[i].data.id) {
							case 7:
								record[i].set("util_boolean", receiptImage.getValue());
								break;
							case 8:
								record[i].set("util_string", receiptHeaderUrl.getValue());
								break;
							case 9:
								record[i].set("util_string", receiptHeaderText.getValue());
								break;

						}

					}
					if (store.getUpdatedRecords() == '') {
						Ext.Msg.alert('Save', 'Nothing Save!');
					}
					store.sync({
						success: function() {
							Ext.Msg.alert('Save', 'Record Has Been Saved');
							// location.reload();	
						},
						failure: function(batch, option) {
							Ext.MessageBox.hide();
							store.rejectChanges();
							var msg = option.batch.proxy.reader.rawData.message;
							Ext.MessageBox.show({
								title: 'Error',
								msg: msg,
								icon: Ext.MessageBox.ERROR,
								buttons: Ext.Msg.OK
							});
						}
					});
				}
			});
		} else {
			Util.msg("Please entry require field!");
		}
	},
	loadReceiptPrinting: function(t, eOpts) {
		form = t.down('form[name=receiptForm]');
		receiptImage = form.down('checkbox[name=is_image]');
		receiptHeaderUrl = form.down('hiddenfield[name=image_url]');
		image = form.down('image[name=recipte_image]');
		receiptHeaderText = form.down('textfield[name=recipt_header]');
		var store = this.getAdminCfgUtilityStore();
		store.load({
			scope: this,
			callback: function(record, operation, success) {
				for (var i = 0; i < record.length; i++) {
					switch (record[i].data.id) {
						case 7:
							receiptImage.setValue(record[i].data.util_boolean);
							break;
						case 8:
							// receiptHeaderUrl.setValue(record[i].data.util_string);
							image.setSrc(record[i].data.util_string);
							receiptHeaderUrl.setValue(record[i].data.util_string);

							break;
						case 9:
							receiptHeaderText.setValue(record[i].data.util_string);
							break;

					}
				}
			}
		});
	},

	update_vat: function(btn) {
		// tabPanel = btn.up('tabpanel');
		form = btn.up('form[name=vatForm]');
		VAT = form.down('radiofield[name=is_vat]');
		VATValue = form.down('numberfield[name=vatValue]');


		if (form.isValid()) {
			var store = this.getAdminCfgUtilityStore();
			store.load({
				scope: this,
				callback: function(record, operation, success) {
					for (var i = 0; i < record.length; i++) {
						switch (record[i].data.id) {
							case 13:
								record[i].set("util_boolean", VAT.getValue());
								break;
							case 14:
								record[i].set("util_int", VATValue.getValue());
								break;


						}

					}
					if (store.getUpdatedRecords() == '') {
						Ext.Msg.alert('Save', 'Nothing Save!');
					}
					store.sync({
						success: function() {
							Ext.Msg.alert('Save', 'Record Has Been Saved');
							// location.reload();	
						},
						failure: function(batch, option) {
							Ext.MessageBox.hide();
							store.rejectChanges();
							var msg = option.batch.proxy.reader.rawData.message;
							Ext.MessageBox.show({
								title: 'Error',
								msg: msg,
								icon: Ext.MessageBox.ERROR,
								buttons: Ext.Msg.OK
							});
						}
					});
				}
			});
		} else {
			Util.msg("Please entry require field!");
		}
	},
	update_service_vat: function(btn) {
		// tabPanel = btn.up('tabpanel');
		form = btn.up('form[name=vatForm1]');
		VAT = form.down('radiofield[name=is_service_vat]');
		VATValue = form.down('numberfield[name=ServiceTaxValue]');


		if (form.isValid()) {
			var store = this.getAdminCfgUtilityStore();
			store.load({
				scope: this,
				callback: function(record, operation, success) {
					for (var i = 0; i < record.length; i++) {
						switch (record[i].data.id) {
							case 16:
								record[i].set("util_boolean", VAT.getValue());
								break;
							case 17:
								record[i].set("util_int", VATValue.getValue());
								break;


						}

					}
					if (store.getUpdatedRecords() == '') {
						Ext.Msg.alert('Save', 'Nothing Save!');
					}
					store.sync({
						success: function() {
							Ext.Msg.alert('Save', 'Record Has Been Saved');
							// location.reload();	
						},
						failure: function(batch, option) {
							Ext.MessageBox.hide();
							store.rejectChanges();
							var msg = option.batch.proxy.reader.rawData.message;
							Ext.MessageBox.show({
								title: 'Error',
								msg: msg,
								icon: Ext.MessageBox.ERROR,
								buttons: Ext.Msg.OK
							});
						}
					});
				}
			});
		} else {
			Util.msg("Please entry require field!");
		}
	},
	loadVATToForm: function(t, eOpts) {
		form = t.down('form[name=vatForm]');
		VAT = form.down('radiofield[name=is_vat]');
		VATValue = form.down('numberfield[name=vatValue]');
		var store = this.getAdminCfgUtilityStore();
		store.load({
			scope: this,
			callback: function(record, operation, success) {
				for (var i = 0; i < record.length; i++) {
					switch (record[i].data.id) {
						case 13:
							VAT.setValue(record[i].data.util_boolean);
							break;
						case 14:
							VATValue.setValue(record[i].data.util_int);
							break;
					}
				}
			}
		});
	},

	loadServiceTaxToForm: function(t, eOpts) {
		form = t.down('form[name=vatForm1]');
		VAT = form.down('radiofield[name=is_service_vat]');
		VATValue = form.down('numberfield[name=ServiceTaxValue]');
		var store = this.getAdminCfgUtilityStore();
		store.load({
			scope: this,
			callback: function(record, operation, success) {
				for (var i = 0; i < record.length; i++) {
					switch (record[i].data.id) {
						case 16:
							VAT.setValue(record[i].data.util_boolean);
							break;
						case 17:
							VATValue.setValue(record[i].data.util_int);
							break;
					}
				}
			}
		});
	},
	

	search_next_code: function(field){
		var me = this,
			form = field.up('gridpanel'),
			searchString = form.down('textfield[name=Search_naxt_code]').getValue()
			store = me.getAdminNextCodeStore();

			Util.loadStore(store,{searchString:searchString});
	},
	add_next_code: function(btn){
		var win = Ext.create("App.view.admin.CfgUtilities.NextCodeForm");
		win.show();
		win.center();
	},

	save_next_code :function(btn){
		var store = this.getAdminNextCodeStore();
		var me = this ;
		Util.save(btn,store,'admin.NextCode');


	},
	edit_next_code :function(btn){
		var rec = Util.getRecord(btn,"Please select record for edit ");
		if (rec) {
			var win = Ext.create("App.view.admin.CfgUtilities.NextCodeForm");
			win.show();
			win.center();
			win.down('form').getForm().loadRecord(rec);
			win.down('textfield[name=module]').focus(true , 300 );
		};
	},
	cancel:function(btn){
		btn.up('window').close();
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
					form.down('hiddenfield').setValue(data.image_url);
				},
				failure: function(formPanel, action) {
					var data = Ext.decode(action.response.responseText);
					alert("Failure: " + data.data);
				}

			});
		}
	},
	uploadBackGroundImage: function(field) {
		var form = field.up('form');
		if (form.getForm().isValid()) {
			form.getForm().submit({
				url: '/Images/upload_image',
				waitMsg: 'Uploading Image ...',
				success: function(formPanel, action) {
					var data = Ext.decode(action.response.responseText);
					form.down('image').setSrc(data.image_url)
					form.down('hiddenfield').setValue(data.image_url);
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