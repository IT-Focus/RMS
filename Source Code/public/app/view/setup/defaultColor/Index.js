Ext.define('App.view.setup.defaultColor.Index', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.defaultColorIndex',
    // bodyPadding: 10,
    border: true,
    modal:true,
    // layout: 'card',
    initComponent: function() {
        var me = this
        Ext.apply(this, {
            
            items: [
                this.defaultColorForm()
            ]
        });
        this.callParent(arguments);
        me.down("#reserved").focus(true, 200);
        Util.ajax("default_color", {}, me.loadValueToForm, me)
    },
  loadValueToForm: function(obj, me) {
        if (obj.success) {
            var form = me.down('form[name=color]');

            form.down("#reserved").setValue(obj.data.reserved)
            form.down("#occupied").setValue(obj.data.occupied)
            form.down("#late_checkout").setValue(obj.data.late_checkout)
            form.down("#free").setValue(obj.data.free)
            
            var win = Ext.create("App.view.setup.defaultColor.Form");
            win.down("#reserved").setValue(obj.data.reserved)
            win.down("#occupied").setValue(obj.data.occupied)
            win.down("#late_checkout").setValue(obj.data.late_checkout)
            win.down("#free").setValue(obj.data.free)
            win.show();
            win.center();
            
        }   
    },
 defaultColorForm: function() {
        generalreturn = {
            xtype: 'form',
            name: 'color',
            title: 'Default Color',
            style: 'border: 1px solid gray; margin-left:20%;margin-right:30%; margin-top:5%; margin-bottom:25%; border-radius:5px',
            // style: 'border:1px solid blue; margin-left:50%',
            defaults:{
                width:350,
                style:'margin-left:5px',
            },
            bodyPadding: 50,
            items: [Ext.create('Ext.ux.ColorPicker', {
                    luminanceImg: 'extjs6/Ext.ux.ColorPicker-master/luminance.png',
                    spectrumImg: 'extjs6/Ext.ux.ColorPicker-master/spectrum.png',
                    labelWidth: 120,
                    name: 'reserved',
                    itemId:'reserved',
                    fieldLabel: 'Reserved'
                }),
                Ext.create('Ext.ux.ColorPicker', {
                    luminanceImg: 'extjs6/Ext.ux.ColorPicker-master/luminance.png',
                    spectrumImg: 'extjs6/Ext.ux.ColorPicker-master/spectrum.png',
                    labelWidth: 120,
                    name: 'occupied',
                    itemId:'occupied',
                    fieldLabel: 'Occupied'
                }),
                Ext.create('Ext.ux.ColorPicker', {
                    luminanceImg: 'extjs6/Ext.ux.ColorPicker-master/luminance.png',
                    spectrumImg: 'extjs6/Ext.ux.ColorPicker-master/spectrum.png',
                    labelWidth: 120,
                    name: 'late_checkout',
                    itemId:'late_checkout',
                    fieldLabel: 'Late Checkout'
                }),
                Ext.create('Ext.ux.ColorPicker', {
                    luminanceImg: 'extjs6/Ext.ux.ColorPicker-master/luminance.png',
                    spectrumImg: 'extjs6/Ext.ux.ColorPicker-master/spectrum.png',
                    labelWidth: 120,
                    name: 'free',
                    itemId:'free',
                    fieldLabel: 'Free'
                })
            ],
            buttons: [{
                text: 'Update',
                iconCls: 'icon-save',
                action: 'update'
                }],
        }
        return generalreturn;
    },

});