Ext.define('App.view.roomTransaction.checkIn.WinNIDImage', {
    extend: 'Ext.window.Window',
    alias: 'widget.NIDForm',
    bodyPadding: 20,
    border: true,
    title: 'National ID Attachment Form',
    modal: true,
    buttons: [

        {
            text: 'Save',
            iconCls: 'icon-save',
            action: 'Save'
        }, {
            text: 'Cancel',
            action: 'Cancel',
            iconCls: 'icon-cancel'
        }
    ],

    items: [{
            xtype: 'form',
            layout: {
                type: 'table',
                columns: 1
            },
            defaults: {
                width: 350,
                style: 'margin-left:5px',
            },
            items: [
               {
                    xtype: 'form',
                    height: '100%',
                    width: '100%',
                    name:'background',
                    // title: 'Hotel Background',
                    style: 'margin-left:8px',

                    items: [{
                        xtype: 'image',
                        name: 'nID_Image',
                        width: 300,
                        height: 200,
                        style: 'border: 1px solid gray; border-radius:10px',
                    }, {
                        xtype: 'hiddenfield',
                        name: 'background_url'
                    }],
                    // rowspan: 8,
                    bbar: [{
                        xtype: 'filefield',
                        name: 'image',
                        width: 50,
                        buttonOnly: true,
                    }, '->', {
                        text: 'Remove',
                        action: 'Remove_nid',
                    }],
                },
            ]
        }

    ]



});