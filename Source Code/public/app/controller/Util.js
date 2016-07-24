var me, myVar;

Ext.define('App.controller.Util', {
	extend: 'Ext.app.Controller',
	//stores: ['Leads','Nationals','LeadSources','Cities'],
	//model:['Lead'],

	init: function() {

		this.control({

		});
	},
	msg: function(message) {
		var title = "Warning";

		var win = Ext.create('Ext.window.Window', {
			// layout:'hbox',
			header: false,
			// width:'90%',
			style: " background-color: antiquewhite;text-align: center;border: 2px solid gray;   border-radius: 10px;",
			bodyStyle: 'border-radius:10px',
			items: [{
				style: 'border-radius:10px; ',
				html: " <div style=' padding: 10px 30px 10px 30px;font-size: 15px ; font-weight:bold;color:crimson;'><center>  " + title + "</center></div> <div style='color:gray;padding:10px; font-size: 12px '> <center><b> " + message + "</b></center> </div> "
			}]

		});
		win.show();
		win.alignTo(Ext.getBody(), "tr-tr", ['-10%', 20]);


		setTimeout(function() {
			win.close();
		}, 5000);


	},
	msgSave: function(message) {
		$("<div />", {
			'class': 'topBarSave',
			text: message
		}).hide().prependTo("body").slideDown('fast').delay(3000).slideUp(function() {
			$(this).remove();
		});
	},

	openMask: function() {
		this.mask.show();
	},
	closeMask: function() {
		this.mask.hide();
	},
	// -================= USING IT FOR AUTO SELECT FIRST ITEM IN COMBO
	// HOW TO USE
	//listeners:Util.firstSelect
	firstSelect: function() {
		return {
			boxready: function() {
				var me = this;
				var count = 0;
				if (!me.value) {
					afterLoadStore();
				}

				function afterLoadStore() {

					if (me.getStore().totalCount > 0) {
						me.setValue(me.getStore().getAt(0).get(me.valueField), true);
						me.fireEvent('select', me);
					} else {
						if (count == 1) {
							me.store.load();
						}

						if (count < 3) setTimeout(function() {
							afterLoadStore();
							count++;
						}, 1000);
					}

				}



				// fire the select event ( Event in extjs )

			}
		};
	},
	mask: function() {
		return new Ext.LoadMask(Ext.getBody(), {
			msg: "Please wait..."
		})
	},
	ajaxSave: function(url, params, btn) {
		var objReturn;
		me = this;
		me.openMask();
		Ext.Ajax.request({
			url: url,
			params: params,

			success: function(response, success) {
				objReturn = Ext.decode(response.responseText);
				me.closeMask();
				if (objReturn['success'] == true) {
					var win = btn.up('window');
					if (win) win.close();
					me.msgSave(objReturn['message']);

				} else {
					me.msg(objReturn['message']);
				}
			},
			failure: function(response, opts) {
				me.closeMask();
				me.msg('Error Connection');
				console.log('server-side failure with status code ' + response.status);
			}

		});

	},

	ajax: function(url, params, nextFunction, paramater) {
		var objReturn;
		var me = this;
		Ext.Ajax.request({
			url: url,
			params: params,
			success: function(response, success) {
				objReturn = Ext.decode(response.responseText);
				if (objReturn.success) {
					if (nextFunction) {
						if (paramater) {
							nextFunction(objReturn, paramater);
						} else {
							nextFunction(objReturn);
						}
					}
				} else {
					me.msg(objReturn.message);
				}

			},
			failure: function(response, opts) {
				console.log('server-side failure with status code ' + response.status);
			}

		});

	},

	getRecord: function(btn, message) {
		var grid = btn.up("gridpanel");
		var row = grid.getSelectionModel().getSelection();
		if (row.length) {
			var record = row[0];
			console.log(record);
			return record;
		} else {
			if (message) {

				this.msg(message);
			};
			return null;
		}
	},
	selectGridName: function(btn, gridName, fileName, widget, formName, message) {
		var grid = btn.up(widget).down("gridpanel[name=" + gridName + "]");
		var row = grid.getSelectionModel().getSelection();
		if (row.length) {
			var win = Ext.create(fileName);
			var form = win.down('form[name=' + formName + ']');
			var record = row[0];
			form.loadRecord(record);
			win.show();
			win.center();
		} else {
			this.msg(message);
		}
	},
	save: function(btn, store, model) {
		var me = this;
		var win = btn.up('window'),
			form = win.down('form'),
			record = form.getRecord(),
			values = form.getValues();

		var model = Ext.create('App.model.' + model);
		if (form.getForm().isValid()) {

			if (!record) {
				model.set(values);
				store.add(model);
			} else {
				record.set(values);
			}
			Ext.MessageBox.wait("Please wait system is processing.........", "Saving Data")

			store.sync({

				success: function() {
					Ext.MessageBox.hide();
					win.close();
					store.load();

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
				},
				scope: this
			});


		} else {
			me.msg("Incorrect Data Entry!");
		}
	},
	saveForm: function(btn, stor, model, ctr) {
		var me = this;
		var form = btn.up('form'),
			record = form.getRecord(),
			values = form.getValues();

		var model = Ext.create('App.model.' + model);
		if (form.getForm().isValid()) {

			if (!record) {
				model.set(values);
				stor.add(model);
			} else {
				record.set(values);
			}

			stor.sync();
			setTimeout(function() {
				stor.load();
			}, 1000);

			Ext.MessageBox.show({
				title: 'Saved',
				msg: 'Record Save Succeed.',
				icon: Ext.MessageBox.INFO,
				buttons: Ext.Msg.OK
			});

			if (ctr.cancel) {
				ctr.cancel(btn);
			}

		} else {
			me.msg("Incorrect Data Entry!");
		}
	},
	deleteRecord: function(btn, widget, store) {
		var grid = btn.up(widget).down("gridpanel");
		var row = grid.getSelectionModel().getSelection();
		if (row.length) {
			var record = row[0];
			Ext.MessageBox.confirm('Confirm', 'Are you sure you want to Delete ?', function(btn) {
				if (btn == 'yes') {
					store.remove(record);
					Ext.Msg.alert("Deleted", 'Record Has Been Deleted.');
				}
			});

		} else {
			this.msg("Please Select Record To Delete.");
		}
	},
	closeForm: function(btn) {
		var win = btn.up('window');
		Ext.MessageBox.confirm('Confirm', 'Are you sure you want cancel without save?', function(btn) {
			if (btn == 'yes') {
				win.close();
			}
		});
	},

	loadStore: function(store, param) {
		clearTimeout(myVar);
		if (param.string == "") {
			store.proxy.extraParams = {};
			store.load();
		} else {
			myVar = setTimeout(function() {
				show()
			}, 1000);
		}

		function show() {
			store.proxy.extraParams = param;
			store.load();
			store.loadPage(1);
		}
	},
	search: function(field) {
		var form = field.up('gridpanel'),
			string = form.down('textfield[name=string]').getValue(),
			searchBy = form.down('combo[name=searchBy]').getValue();
		var store = form.getStore();
		Util.loadStoreSearch(store, {
			string: string,
			searchBy: searchBy
		});
	},
	loadStoreSearch: function(store, param) {
		clearTimeout(myVar);
		if (param.string == "") {
			delete store.proxy.extraParams['string'];
			delete store.proxy.extraParams['searchBy'];
			store.load();
		} else {
			myVar = setTimeout(function() {
				show()
			}, 1000);
		}

		function show() {
			store.proxy.extraParams = param;

			store.loadPage(1);
		}
	},
	closeWindow: function(btn) {
		var win = btn.up('window');
		win.close();
	},
	loadStores: function(controller) {

		controller.stores.forEach(function(store) {

			controller.getStore(store).load();
		})
	},
	// function use for load store when first load 
	loadControllerStore: function(controllerName) {
		var controller = App.app.getController(controllerName);
		var stores = controller.stores;

		stores.forEach(function(storeName) {

			
			var store = controller.getStore(storeName.replace("App.store.",""));
			
			
			if (store.autoLoad == false  && store.isControllerLoad == undefined  ) {				
				store.load();
			};

		});
	},

	// synconize store with waiting message box
	storeSync: function(store, win) {
		var recs = store.getUpdatedRecords();
		if (recs.length > 0) {

			Ext.MessageBox.wait("Please System Proccessing Data.....", "Please Wait")
		};
		store.sync({
			success: function(batch, options) {
				Ext.MessageBox.hide();
				if (win) {
					win.close();
				};
				store.load();
			},
			failure: function(batch, options) {
				store.rejectChanges();
				var msg = options.batch.proxy.reader.rawData.message;
				Ext.MessageBox.show({
					title: 'Error',
					msg: msg,
					icon: Ext.MessageBox.ERROR,
					buttons: Ext.Msg.OK
				});
			},
			scope: this
		});
	},

	// get item from store to json data
	getItemStore: function(store) {

		// clear id that generate by extjs
		store.each(function(rec) {
			if (!(rec.get("id") > 0)) {
				rec.data.id = null;
			}
		});

		var storeDetail = store.data.items;
		return Ext.pluck(storeDetail, 'data');
	},
	getTitle: function(text) {
		return '<font style="font-size: 18px;font-weight: bold;color: darkgoldenrod;text-decoration: underline;" >' + text + '</font>'

	}

});
window.Util = Ext.create('App.controller.Util');
