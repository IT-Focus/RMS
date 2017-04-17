Ext.define('App.controller.roomTransaction.Customer', {
    extend: 'Ext.app.Controller',
    views: [
        'roomTransaction.customer.Index',
        'roomTransaction.customer.Form',

    ],
    stores: [
        'roomTransaction.Customer',
        'combo.Nationality'
    ],
    init: function() {
        var me = this;
        me.control({
            'CustomerIndex button[action=Add]': {
                click: this.add
            },
            'CustomerIndex button[action=Edit]': {
                click: this.edit
            },
            'CustomerForm button[action=Save]': {
                click: this.save
            },
            'CustomerForm button[action=cancel]': {
                click: this.cancel
            },
            'CustomerIndex combo[name=searchBy]' : {
                change: this.advanceSearch
            },
            'CustomerIndex textfield[name=string]' : {
                change: this.advanceSearch
            },

            // Attachment
            'CustomerForm button[action=add_NID_attachment]': {
                click: this.add_NID_image
            },
            'CustomerForm button[action=add_attachment]': {
                click: this.add_NID_image
            },
            'CustomerForm filefield[name=image]': {
                change: this.uploadNIDImage
            },
            'CustomerForm button[action=Remove_nid]': {
                click: this.removeImage
            },


        });
    },

    advanceSearch: function(field){
        var me = this,
            form = field.up('gridpanel'),
            searchBy = form.down('combo[name=searchBy]').getValue(),
            searchString = form.down('textfield[name=string]').getValue()
            store = me.getRoomTransactionCustomerStore();

            Util.loadStore(store,{searchString:searchString,searchBy:searchBy});
    },

    add: function(btn) {

        var conatiner = btn.up('CustomerIndex'),
            form = conatiner.down('CustomerForm');
        form.getForm().reset();
        conatiner.setActiveItem(form);


    },

    cancel: function(btn) {
        var conatiner = btn.up('CustomerIndex'),
            grid = conatiner.down('grid[name=index]');
        conatiner.setActiveItem(grid);
    },
    edit: function(btn) {
        var rec = Util.getRecord(btn, "Please select record for edit ");
        if (rec) {
            debugger;
            var conatiner = btn.up('CustomerIndex');
            var form = conatiner.down('CustomerForm');
            nid_image_url = form.down('hiddenfield[name=national_id_url]');
            nid_image = form.down('image[name=nID_Image]');
            passport_image_url = form.down('hiddenfield[name=passport_url]');
            passport_image = form.down('image[name=BackgroundImage]');

            nid_image.setSrc(rec.data.national_id_url);
            nid_image_url.setValue(rec.data.national_id_url);
            passport_image.setSrc(rec.data.passport_url);
            passport_image_url.setValue(rec.data.passport_url);

            form.getForm().loadRecord(rec);
            conatiner.setActiveItem(form);



        };

    },
    save: function(btn) {
        var me = this;
        store = me.getRoomTransactionCustomerStore(),
            conatiner = btn.up('CustomerIndex'),
            grid = conatiner.down('grid[name=index]');

        Util.saveForm(btn, store, 'roomTransaction.Customer', me);
        conatiner.setActiveItem(grid);
    },


    add_NID_image: function(btn) {
        var form = btn.up('form'),
            values = form.getValues(),
            record = form.getRecord();
        checkInFormTmp = btn.up('form');

        var win = Ext.create("App.view.roomTransaction.checkIn.WinNIDImage");
        win.show();
        win.center();
    },

    uploadNIDImage: function(field) {
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



})