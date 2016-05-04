Ext.define('App.model.roomTransaction.CancelCheckin', {
    extend: 'Ext.data.Model',
    fields: [
      
      	'id',
      	'code',
      	'check_in_code',
      	'check_in_date',
      	'room_no',
      	'cancel_date',
      	'reason',
      	'cancelled_by',
      	'created_at',
      	'updated_at',

        'username'
    ]

});
