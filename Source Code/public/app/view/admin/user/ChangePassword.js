Ext.define('App.view.admin.user.ChangePassword', {
    extend: 'Ext.window.Window',
    alias: 'widget.userChangePassword',
    bodyPadding: 20,
    border: true,
    title: 'Change Password',
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
            defaults: {
                width: 350,
                labelWidth: 120,
                // style:'margin-left:5px',
            },
            items: [{
                    xtype: 'textfield',
                    name: 'new_password',
                    allowBlank: false,
                    inputType: 'password',
                    fieldLabel: 'New Password'
                }, {
                    xtype: 'textfield',
                    inputType: 'password',
                    name: 'confirm_password',
                    allowBlank: false,
                    fieldLabel: 'Confirm Password',
                    invalidText: 'Incorrect Confirm Password',
                    validator: function(value) {
                        field= this
                        newPssField = field.up('form').down('textfield[name=new_password]')
                        cnfValue = value
                        newPassword = newPssField.getValue()
                        if ( newPassword == cnfValue ) {
                            return true
                        }
                        return false
                    },
                    validateOnBlur: true
                }

            ]
        }

    ]



});
