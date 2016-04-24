Ext.define('App.view.admin.CfgUtilities.Index', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.CfgUtilitiesIndex',
    // bodyPadding: 10,
    // border: true,
    autoScroll:true,
    layout: {
                type: 'table',
                columns: 2
            },
    initComponent: function() {
        Ext.apply(this, {
           items: [{
                xtype: 'tabpanel',
                // bodyPadding: 10,
                items: [{
                    title: 'Company Profile',
                    items: [
                        this.CompanyProfile(),
                        this.formLogo()
                    ],
                },{
                    title: 'test Profile',
                    items: [
                        // this.CompanyProfile(),
                    ],
                }]
            }]
        });
        this.callParent(arguments);
    },
    CompanyProfile: function() {
        CompanyProfile = {
            xtype: 'fieldset',
            title: 'Company Profile',
            name: "companyProfileForm",
            layout: {
                type: 'table',
                columns: 2
            },
            // border: true,
            style: '  margin-top:2%; border-radius:5px',
            width: 900,
            height: 500,
            // height: '100%',
            // bodyPadding: 20,
            defaultType: 'textfield',
            defaults: {
                width: 400,
                style: 'margin-left:10px',
            },
            items: [

                {
                    name: 'legal_name',
                    fieldLabel: 'Legal Name<span style="color:red">*</span>',
                    allowBlank: false
                }, 
                // {
                //     xtype: 'form',
                //     style: 'margin-left:10px',
                //     width: 400,
                //     items: [{
                //         xtype: 'image',
                //         name: 'companyProfileImage',
                //         width: 300,
                //         height: 200,
                //         style: 'border: 1px solid gray; border-radius:10px',
                //     }, {
                //         xtype: 'hiddenfield',
                //         name: 'image_url'
                //     }],
                //     rowspan: 8,
                //     bbar: [{
                //         xtype: 'filefield',
                //         name: 'image',
                //         width: 50,
                //         buttonOnly: true,
                //     }, '->', {
                //         text: 'Remove',
                //         action: 'Remove',
                //     }],
                // }, 
                {
                    name: 'legal_name_khmer',
                    fieldLabel: 'Legal Name Kh<span style="color:red">*</span>',
                    allowBlank: false
                }, {
                    name: 'company_name',
                    fieldLabel: 'Company Name',
                }, {
                    name: 'company_name_khmer',
                    fieldLabel: 'Com Name kh',
                }, {
                    name: 'tax_no',
                    fieldLabel: 'Tax No.'
                }, {
                    name: 'mobile',
                    fieldLabel: 'Mobile'
                }, {
                    name: 'phone',
                    fieldLabel: 'Phone<span style="color:red">*</span>',
                    allowBlank: false
                }, {
                    name: 'email',
                    vtype: 'email',
                    fieldLabel: 'Email'
                }, {
                    name: 'website',
                    fieldLabel: 'Website'
                }, {
                    name: 'bank_name',
                    fieldLabel: 'Bank Name'
                }, {
                    name: 'account_name',
                    fieldLabel: "Account Name"
                }, {
                    name: 'account_no',
                    fieldLabel: 'Account No'
                }, {
                    name: "vatin",
                    fieldLabel: 'VAT TIN'
                }, {
                    xtype: 'textarea',
                    width: 400,
                    colspan: 1,
                    name: 'address',
                    fieldLabel: 'Address<span style="color:red">*</span>',
                    allowBlank: false
                }, {
                    xtype: 'textarea',
                    width: 400,
                    colspan: 1,
                    name: 'address_khmer',
                    fieldLabel: 'Address Kh<span style="color:red">*</span>',
                    allowBlank: false
                }

            ],
            buttons: [{
                text: 'Save',
                iconCls: 'icon-save',
                action: 'save_company_profile'
            }]
        }

        return CompanyProfile
    },

    formLogo: function(){
        logo = {
            xtype: 'fieldset',
            title: 'Company Logo',
            name: "companyProfileForm",
            // layout: {
            //     type: 'table',
            //     columns: 1
            // },
            // border: true,
            style: '  margin-top:2%; border-radius:5px',
            width: '100%',
            height:'100%',
            // height: '100%',
            // bodyPadding: 20,
            items: [

                {
                    xtype: 'form',
                    style: 'margin-left:10px',
                    width: 400,
                    items: [{
                        xtype: 'image',
                        name: 'companyProfileImage',
                        width: 300,
                        height: 200,
                        style: 'border: 1px solid gray; border-radius:10px',
                    }, {
                        xtype: 'hiddenfield',
                        name: 'image_url'
                    }],
                    rowspan: 8,
                    bbar: [{
                        xtype: 'filefield',
                        name: 'image',
                        width: 50,
                        buttonOnly: true,
                    }, '->', {
                        text: 'Remove',
                        action: 'Remove',
                    }],
                }, 

            ],
        }
        return logo
    },
    formBackground: function(){

    }


});