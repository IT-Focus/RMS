
Ext.define('App.view.setup.defaultColor.Form', {
    extend:'Ext.window.Window',
    alias:'widget.defaultColorForm' ,
    bodyPadding:20 ,
    // border:true,
    title:'Default Color Form',
    modal:true ,
    buttons:[

        {
            text:'Update',
            iconCls:'icon-save',
            action:'update'
        },{
            text:'Cancel',
            action:'Cancel',
            iconCls:'icon-cancel'
        }
    ],

    items:[
        {
            xtype:'form',
            layout:{
                type:'table',
                columns:1
            },
            defaults:{
                width:350,
                style:'margin-left:5px',
            },
            items:[
                Ext.create('Ext.ux.ColorPicker', {
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


            ]
        }

    ]




});
