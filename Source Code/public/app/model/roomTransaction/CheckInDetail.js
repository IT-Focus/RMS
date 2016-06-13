Ext.define('App.model.roomTransaction.CheckInDetail', {
    extend: 'Ext.data.Model',
    fields: [
        'id',
        'check_in_id',
        'service_id',
        'room_master_id',
        'categroy_price_id',
        'room_no',
        'check_in_date',
        'check_out_date',
        'description',
        'qty',
        'unit_price',
        'total_amount',
        'discount',
        'discount_amount',
        'tax',
        'tax_amount',
        'grand_total_amount',
        'created_by',
        'edited_by',
        'tran_type',
        'created_at',
        'updated_at',
        
        'category_price_name'
    ]

});
