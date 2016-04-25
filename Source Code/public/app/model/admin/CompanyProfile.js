Ext.define('App.model.admin.CompanyProfile', {
    extend: 'Ext.data.Model',
    fields: [ 
	
		'id',
		'legal_name',
		'legal_name_khmer',
		'company_name',
		'company_name_khmer',
		'tax_no',
		'phone',
		'mobile',
		'website',
		'address',
		'address_khmer',
		'logo_url',
		'background_url',
		'account_no',
		'account_name',
		'bank_name',
		'vatin',
		'email'
    ]
    
});