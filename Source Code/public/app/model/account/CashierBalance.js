Ext.define('App.model.account.CashierBalance', {
	extend: 'Ext.data.Model',
	fields: [
	
		'id',
		'cashier_id',
		'opened_date',
		'closed_date',
		'open_balance',
		'close_balance',
		'created_at',
		'updated_at',
	]

});