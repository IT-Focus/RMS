Ext.define('App.controller.setup.CategoryMaster', {
	extend: 'Ext.app.Controller',
	views: [
		'setup.categoryMaster.Index',
		'setup.categoryMaster.Form',
		'setup.categoryPrice.Form'

	],
	stores: [
		'setup.CategoryMaster',
		'setup.CategoryPrice',
		'combo.Categories'
	],
	init: function() {

		this.control({
			'categoryMasterIndex button[action=Add]': {
				click: this.add
			},
			'categoryMasterIndex button[action=Edit]': {
				click: this.edit
			},
			'categoryMasterForm button[action=Save]': {
				click: this.save
			},
			'categoryMasterForm button[action=Cancel]': {
				click: this.cancel
			},
			'categoryMasterIndex combo[name=searchBy]': {
				change: this.advanceSearch
			},
			'categoryMasterIndex textfield[name=string]': {
				change: this.advanceSearch
			},
			'categoryMasterForm button[action=Add_category_price]': {
				click: this.add_category_price
			},
			'categoryMasterForm button[action=Edit_Category_Price]':{
				click: this.edit_Category_Price
			},

			'categoryPriceForm button[action=Cancel]': {
				click: this.cancel_window
			},
			'categoryPriceForm button[action=Save]': {
				click: this.save_category_price
			},



		});
	},
	// Event Form Category Price
	add_category_price: function(btn) {
		var win = Ext.create("App.view.setup.categoryPrice.Form");
		win.show();
		win.center();
		win.down('textfield[name=name]').focus(true, 300);
	},
	edit_Category_Price: function(btn){
		var rec = Util.getRecord(btn,"Please select record for edit ");
		if (rec) {
			var win = Ext.create("App.view.setup.categoryPrice.Form");
			duration_time = Ext.util.Format.dateRenderer('H:i')(rec.data.duration_time);
			allow_late = Ext.util.Format.dateRenderer('H:i')(rec.data.allow_late);
			exd = Ext.util.Format.dateRenderer('H:i')(rec.data.exd);
			
			win.show();
			win.center();
			win.down('form').getForm().loadRecord(rec);
			win.down("timefield[name=allow_late]").setValue(allow_late);
			win.down("timefield[name=duration_time]").setValue(duration_time);
			win.down("timefield[name=exd]").setValue(exd);
			win.down('textfield[name=name]').focus(true , 300 );
		};

	},
	cancel_window: function(btn) {
		btn.up('window').close();
	},
	save_category_price: function(btn) {
		var me = this;
		var win = btn.up('window'),
			form = win.down('form'),
			record = form.getRecord(),
			store = me.getSetupCategoryPriceStore(),
			values = form.getValues();
		if (form.getForm().isValid()) {
			if (!record) {
				var model = Ext.create('App.model.setup.CategoryPrice');
				model.set(values);
				store.add(model);
				me.cancel_window(btn);
			} else {
				record.set(values);
				me.cancel_window(btn);



			};
		}
		/*var me = this ;
		var store = me.getSetupCategoryPriceStore();
		Util.save(btn,store,'setup.CategoryPrice');*/
	},
	// end
	advanceSearch: function(field) {
		var me = this,
			form = field.up('gridpanel'),
			searchBy = form.down('combo[name=searchBy]').getValue(),
			searchString = form.down('textfield[name=string]').getValue()
		store = me.getSetupCategoryMasterStore();

		Util.loadStore(store, {
			searchString: searchString,
			searchBy: searchBy
		});
	},

	cancel: function(btn) {
		var conatiner = btn.up('categoryMasterIndex');
		var grid = conatiner.down('grid[name=index]');
		conatiner.setActiveItem(grid);
	},
	edit: function(btn) {
		var rec = Util.getRecord(btn, "Please select record for edit ");
		if (rec) {
			var conatiner = btn.up('categoryMasterIndex');
			var form = conatiner.down('categoryMasterForm');
			var category_id = rec.data.id;
			var store = this.getSetupCategoryPriceStore();
			Util.loadStore(store, {
				category_id: category_id,
			});
			form.getForm().loadRecord(rec);
			conatiner.setActiveItem(form);
		};

	},
	add: function(btn) {
		var conatiner = btn.up('categoryMasterIndex');
		var form = conatiner.down('categoryMasterForm');
		var store = this.getSetupCategoryPriceStore();
		store.removeAll();
		form.getForm().reset();
		conatiner.setActiveItem(form);



	},

	// save: function(btn) {
	// 	var store = this.getSetupCategoryMasterStore();
	// 	var me = this;
	// 	Util.saveForm(btn, store, 'setup.CategoryMaster', me);



	// },

	save: function(btn) {
		me = this
		var form = btn.up('form'),
			record = form.getRecord(),
			values = form.getValues();
		store = this.getSetupCategoryMasterStore();
		var category_price_store = me.getSetupCategoryPriceStore();
		values["category_price_attributes"] = Util.getItemStore(category_price_store)

		if (form.isValid()) {
			if (record) {

				record.set(values);
			} else {
				var model = Ext.create('App.model.setup.CategoryMaster');
				model.set(values);
				store.add(model);


			};
			Ext.MessageBox.wait("Please wait while system is processing.........", "Get Data");
			store.sync({
				success: function() {
					Ext.MessageBox.hide();
					me.cancel(btn);
					store.load();


					setTimeout(function() {
						store.load();
					}, 1000);

					Ext.MessageBox.show({
						title: 'Saved',
						msg: 'Record Save Succeed.',
						icon: Ext.MessageBox.INFO,
						buttons: Ext.Msg.OK
					});


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



		} else {
			Util.msg("Please entry require field!");
		}
	},



})