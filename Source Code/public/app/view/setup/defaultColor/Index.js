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
            items: [{
                xtype: 'tabpanel',
                // bodyPadding: 10,
                autoWidth:true,
                height:'100%',
                items: [{
                    xtype: 'form',
                    title: 'Background Color',
                    name:'backgroundColor' ,
                    items: [
                        
                        this.BackgroundColorForm()
                    ],
                
                }, {
                    title: 'Text Color',
                    xtype:'form', 
                    name:'textColor', 
                    items: [
                        this.TextColorForm(),
                        Util.ajax("default_color", {}, me.loadTextValueToForm, me)
                    ]
                }]
            }]
        });
        this.callParent(arguments);
        
        Util.ajax("default_color", {}, me.loadValueToForm, me)
    },
loadValueToForm: function(obj, me) {
        if (obj.success) {
            var form = me.down('form[name=backgroundColor]');            
            form.removeAll(); 
            form.add(me.BackgroundColorForm(obj.data));
      
        }   
    },
loadTextValueToForm: function(obj, me){
    if (obj.success) {
            
            var form = me.down('form[name=textColor]');

            form.down("#text_reserved").setValue(obj.data.reserved_text_color)
            form.down("#text_occupied").setValue(obj.data.occupied_text_color)
            form.down("#text_late_checkout").setValue(obj.data.late_checkout_text_color)
            form.down("#text_free").setValue(obj.data.free_text_color)
            
        }   
},
BackgroundColorForm: function(data , me) {
    if (!data ) {data = {}}
        generalreturn = {
            // xtype: 'form',
            // name: 'color',
            title: 'Background Color',
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
                    value : data.reserved , 
                    fieldLabel: 'Reserved'
                }),
                Ext.create('Ext.ux.ColorPicker', {
                    luminanceImg: 'extjs6/Ext.ux.ColorPicker-master/luminance.png',
                    spectrumImg: 'extjs6/Ext.ux.ColorPicker-master/spectrum.png',
                    labelWidth: 120,
                    name: 'occupied',
                    itemId:'occupied',
                    value: data.occupied ,
                    fieldLabel: 'Occupied'
                }),
                Ext.create('Ext.ux.ColorPicker', {
                    luminanceImg: 'extjs6/Ext.ux.ColorPicker-master/luminance.png',
                    spectrumImg: 'extjs6/Ext.ux.ColorPicker-master/spectrum.png',
                    labelWidth: 120,
                    name: 'late_checkout',
                    itemId:'late_checkout',
                    value : data.late_checkout , 
                    fieldLabel: 'Late Checkout'
                }),
                Ext.create('Ext.ux.ColorPicker', {
                    luminanceImg: 'extjs6/Ext.ux.ColorPicker-master/luminance.png',
                    spectrumImg: 'extjs6/Ext.ux.ColorPicker-master/spectrum.png',
                    labelWidth: 120,
                    name: 'free',
                    value: data.free,
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
        // Ext.apply( me.items , generalreturn ); 
        return generalreturn;
    },
TextColorForm: function() {
        generalreturn = {
            // xtype: 'form',
            // name: 'textcolor',
            title: 'Text Color',
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
                    name: 'reserved_text_color',
                    itemId:'text_reserved',
                    fieldLabel: 'Reserved'
                }),
                Ext.create('Ext.ux.ColorPicker', {
                    luminanceImg: 'extjs6/Ext.ux.ColorPicker-master/luminance.png',
                    spectrumImg: 'extjs6/Ext.ux.ColorPicker-master/spectrum.png',
                    labelWidth: 120,
                    name: 'occupied_text_color',
                    itemId:'text_occupied',
                    fieldLabel: 'Occupied'
                }),
                Ext.create('Ext.ux.ColorPicker', {
                    luminanceImg: 'extjs6/Ext.ux.ColorPicker-master/luminance.png',
                    spectrumImg: 'extjs6/Ext.ux.ColorPicker-master/spectrum.png',
                    labelWidth: 120,
                    name: 'late_checkout_text_color',
                    itemId:'text_late_checkout',
                    fieldLabel: 'Late Checkout'
                }),
                Ext.create('Ext.ux.ColorPicker', {
                    luminanceImg: 'extjs6/Ext.ux.ColorPicker-master/luminance.png',
                    spectrumImg: 'extjs6/Ext.ux.ColorPicker-master/spectrum.png',
                    labelWidth: 120,
                    name: 'free_text_color',
                    itemId:'text_free',
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