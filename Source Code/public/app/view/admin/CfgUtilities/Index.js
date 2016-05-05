Ext.define('App.view.admin.CfgUtilities.Index', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.CfgUtilitiesIndex',
    bodyPadding: 10,
    border: true,
    autoScroll: true,
    layout: {
        type: 'table',
        columns: 3
    },
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
                    title: 'Hotel Profile',
                    items: [
                        this.CompanyProfile(),
                        this.formLogo(),
                        // this.formBackground()
                    ],
                    buttons: [{
                        text: 'Update',
                        iconCls: 'icon-save',
                        action: 'save_company_profile'
                    }]
                }, {
                    title: 'Next Code',
                    items: [
                        this.newCodeForm()
                    ]
                }]
            }]
        });
        this.callParent(arguments);

        me.down("textfield").focus(true, 200);
        Util.ajax("cfg_company", {}, me.loadValueToForm, me)
    },
    CompanyProfile: function() {
        CompanyProfile = {

            title: 'Hotel Profile',
            // name: "companyProfileForm",
            layout: {
                type: 'table',
                columns: 2
            },

            style: '  margin-top:2%; border-radius:5px',
            // width: '100%',
            defaultType: 'textfield',
            defaults: {
                // autoWidth:true,
                style: 'margin-left:10px;margin-top:5%',
            },
            items: [

                {
                    name: 'legal_name',
                    fieldLabel: 'Legal Name<span style="color:red">*</span>',
                    allowBlank: false
                }, {
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
                    fieldLabel: 'VAT TIN',
                }, {
                    xtype: 'textarea',
                   
                    // colspan: 1,
                    name: 'address',
                    fieldLabel: 'Address<span style="color:red">*</span>',
                    allowBlank: false
                }, {
                    xtype: 'textarea',
                    colspan:2,
                    width: 565,
                    name: 'address_khmer',
                    fieldLabel: 'Address Kh<span style="color:red">*</span>',
                    allowBlank: true
                }

            ],

        }

        return CompanyProfile
    },

    formLogo: function() {
        logo = {
            layout: {
                type: 'table',
                columns: 2
            },
            style: '  margin-top:2%; border-radius:5px',
            items: [

                {

                    xtype: 'form',
                    name: 'companyImage',
                    title: 'Hotel Logo',
                    // style: 'margin-left:10px;',
                    height: '100%',
                    width: '100%',
                    items: [{
                        xtype: 'image',
                        name: 'companyProfileImage',
                        width: 300,
                        height: 200,
                        style: 'border: 1px solid gray; border-radius:10px',
                    }, {
                        xtype: 'hiddenfield',
                        name: 'logo_url'
                    }],
                    bbar: [{
                        xtype: 'filefield',
                        name: 'image',
                        width: 50,
                        buttonOnly: true,
                    }, {
                        style: 'margin-left:130px',
                        text: 'Remove',
                        action: 'Remove_logo',
                    }],
                }, {
                    xtype: 'form',
                    height: '100%',
                    width: '100%',
                    name:'background',
                    title: 'Hotel Background',
                    style: 'margin-left:8px',

                    items: [{
                        xtype: 'image',
                        name: 'companyBacgroundImage',
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
                        action: 'Remove_background',
                    }],
                },

            ],
        }
        return logo
    },

    loadValueToForm: function(obj, me) {
        if (obj.success) {
            var form = me.down('form');
            // var form  = me.down('form[name=companyProfileForm]')
            form.getForm().setValues(obj.data);
            //debugger;
            form.down('image[name=companyProfileImage]').setSrc(obj.data.logo_url);
            form.down('hiddenfield[name=logo_url]').setValue(obj.data.logo_url);
            form.down('image[name=companyBacgroundImage]').setSrc(obj.data.background_url);
            form.down('hiddenfield[name=background_url]').setValue(obj.data.background_url);
        }
    },

    newCodeForm: function() {
        PosNextCode = {
            tools: [{
                    fieldLabel: 'Search',
                    xtype: 'textfield',
                    name: 'Search_naxt_code',
                    emptyText: '-- Search Record --'
                },
                // '->',
                {
                    action: 'add_next_code',
                    xtype: 'button',
                    style: 'margin-left:5px',
                    iconCls: 'icon-add',
                    tooltip: 'Add New '
                }, {
                    xtype: 'button',
                    action: 'edit_next_code',
                    tooltip: 'Edit Next Code',
                    style: 'margin-left:5px',
                    iconCls: 'icon-edit'
                }
            ],
            xtype: 'grid',
            border: true,
            name: 'index',
            height: 500,
            width: '100%',
            title: 'Next Code',
            style: 'margin-top:2%; border-radius:5px;border:1px solid silver;',
            store: 'admin.NextCode',
            columns: [{
                    header: 'NO',
                    xtype: 'rownumberer',
                    width: 50,
                    align: 'center'
                }, {
                    header: 'Module',
                    flex: 1,
                    dataIndex: 'module'
                }, {
                    header: 'Code Inclue Tax',
                    flex: 1,
                    dataIndex: 'cit'
                }, {
                    header: 'Code Exclude Tax',
                    flex: 1,
                    dataIndex: 'cet'
                }, {
                    header: 'Prefix ',
                    flex: 1,
                    dataIndex: 'prefix'
                }, {
                    header: 'Suffix ',
                    flex: 1,
                    dataIndex: 'suffix'
                },


            ],
            bbar: Ext.create('Ext.PagingToolbar', {
                store: 'admin.NextCode',
                displayInfo: true,
                displayMsg: 'view {0} - {1} of {2}',
                emptyMsg: "view 0"
            })

        }
        return PosNextCode;
    }



});