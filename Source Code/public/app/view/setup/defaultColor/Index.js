Ext.define('App.view.setup.defaultColor.Index', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.defaultColorIndex',
    // bodyPadding: 10,
    border: false,
    modal: true,
    layout: 'hbox',
    initComponent: function() {
        var me = this
        Ext.apply(this, {
            items: [{
                    xtype: 'form',
                    width:'50%',
                    height: '100%',
                    name: 'backgroundColor',
                    items: [

                        this.BackgroundColorForm()
                    ]
                }, {
                    xtype: 'form',
                    width:'50%',
                    height: '100%',
                    name: 'textColor',
                    items: [
                        this.TextColorForm(),
                    ]
                }

                // {

                //     xtype: 'tabpanel',
                //     autoWidth:true,
                //     height:'100%',
                //     items: [{
                //         xtype: 'form',
                //         title: 'Background Color',
                //         name:'backgroundColor' ,
                //         items: [

                //             this.BackgroundColorForm()
                //         ],

                //     }, {
                //         title: 'Text Color',
                //         xtype:'form', 
                //         name:'textColor', 
                //         items: [
                //             this.TextColorForm(),
                //             Util.ajax("default_color", {}, me.loadTextValueToForm, me)
                //         ]
                //     }]
                // }
            ],
            // buttons: [{
            //         text: 'Update',
            //         iconCls: 'icon-save',
            //         action: 'update'
            //     }],

        });
        this.callParent(arguments);

        Util.ajax("default_color", {}, me.loadValueToForm, me)
    },
    loadValueToForm: function(obj, me) {
        if (obj.success) {
            var form = me.down('form[name=backgroundColor]');
            var formText = me.down('form[name=textColor]');
            form.removeAll();
            formText.removeAll();
            form.add(me.BackgroundColorForm(obj.data));
            formText.add(me.TextColorForm(obj.data));

        }
    },
    loadTextValueToForm: function(obj, me) {
        if (obj.success) {

            var form = me.down('form[name=textColor]');

            form.down("#text_reserved").setValue(obj.data.reserved_text_color)
            form.down("#text_occupied").setValue(obj.data.occupied_text_color)
            form.down("#text_late_checkout").setValue(obj.data.late_checkout_text_color)
            form.down("#text_free").setValue(obj.data.free_text_color)

        }
    },
    BackgroundColorForm: function(data, me) {
        if (!data) {
            data = {}
        }
        generalreturn = {
                // xtype: 'form',
                // name: 'color',
                title: 'Background Color',
                // style: 'border: 1px solid gray; margin-left:20%;margin-right:30%; margin-top:5%; margin-bottom:25%; border-radius:5px',
                style: 'border: 1px solid gray;',
                defaults: {
                    autoWidth:true,
                    style: 'margin-left:5px',
                },
                bodyPadding: 50,
                items: [Ext.create('Ext.ux.ColorPicker', {
                        luminanceImg: 'extjs6/Ext.ux.ColorPicker-master/luminance.png',
                        spectrumImg: 'extjs6/Ext.ux.ColorPicker-master/spectrum.png',
                        autoWidth:true,
                        name: 'reserved',
                        itemId: 'reserved',
                        value: data.reserved,
                        fieldLabel: 'Reserved'
                    }),
                    Ext.create('Ext.ux.ColorPicker', {
                        luminanceImg: 'extjs6/Ext.ux.ColorPicker-master/luminance.png',
                        spectrumImg: 'extjs6/Ext.ux.ColorPicker-master/spectrum.png',
                        autoWidth:true,
                        name: 'occupied',
                        itemId: 'occupied',
                        value: data.occupied,
                        fieldLabel: 'Occupied'
                    }),
                    Ext.create('Ext.ux.ColorPicker', {
                        luminanceImg: 'extjs6/Ext.ux.ColorPicker-master/luminance.png',
                        spectrumImg: 'extjs6/Ext.ux.ColorPicker-master/spectrum.png',
                        autoWidth:true,
                        name: 'late_checkout',
                        itemId: 'late_checkout',
                        value: data.late_checkout,
                        fieldLabel: 'Late Checkout'
                    }),
                    Ext.create('Ext.ux.ColorPicker', {
                        luminanceImg: 'extjs6/Ext.ux.ColorPicker-master/luminance.png',
                        spectrumImg: 'extjs6/Ext.ux.ColorPicker-master/spectrum.png',
                        autoWidth:true,
                        name: 'free',
                        value: data.free,
                        itemId: 'free',
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
    TextColorForm: function(data, me) {
        if (!data) {
            data = {}
        }
        generalreturn = {
            // xtype: 'form',
            // name: 'textcolor',
            title: 'Text Color',
            // style: 'border: 1px solid gray; margin-left:20%;margin-right:30%; margin-top:5%; margin-bottom:25%; border-radius:5px',
            style: 'border: 1px solid gray',
            defaults: {
                autoWidth:true,
                style: 'margin-left:5px;',
            },
            bodyPadding: 50,
            items: [Ext.create('Ext.ux.ColorPicker', {
                    luminanceImg: 'extjs6/Ext.ux.ColorPicker-master/luminance.png',
                    spectrumImg: 'extjs6/Ext.ux.ColorPicker-master/spectrum.png',
                    autoWidth:true,
                    name: 'reserved_text_color',
                    itemId: 'text_reserved',
                    value: data.reserved_text_color,
                    fieldLabel: 'Reserved'
                }),
                Ext.create('Ext.ux.ColorPicker', {
                    luminanceImg: 'extjs6/Ext.ux.ColorPicker-master/luminance.png',
                    spectrumImg: 'extjs6/Ext.ux.ColorPicker-master/spectrum.png',
                    autoWidth:true,
                    name: 'occupied_text_color',
                    itemId: 'text_occupied',
                    value: data.occupied_text_color,
                    fieldLabel: 'Occupied'
                }),
                Ext.create('Ext.ux.ColorPicker', {
                    luminanceImg: 'extjs6/Ext.ux.ColorPicker-master/luminance.png',
                    spectrumImg: 'extjs6/Ext.ux.ColorPicker-master/spectrum.png',
                    autoWidth:true,
                    name: 'late_checkout_text_color',
                    itemId: 'text_late_checkout',
                    value: data.late_checkout_text_color,
                    fieldLabel: 'Late Checkout'
                }),
                Ext.create('Ext.ux.ColorPicker', {
                    luminanceImg: 'extjs6/Ext.ux.ColorPicker-master/luminance.png',
                    spectrumImg: 'extjs6/Ext.ux.ColorPicker-master/spectrum.png',
                    autoWidth:true,
                    name: 'free_text_color',
                    itemId: 'text_free',
                    value: data.free_text_color,
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


    defaultColor: function(data, me) {

    }

});