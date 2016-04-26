Ext.define('App.model.account.Cashier', {
	extend: 'Ext.data.Model',
	fields: [
		'id',
		'user_id',
		'workshift_id',
		'start_time',
		'obda',
		'is_active',
		'created_at',
		'updated_at',

		'username',
		'workshift_name'
	]

});