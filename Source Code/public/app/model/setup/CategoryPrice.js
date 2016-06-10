Ext.define('App.model.setup.CategoryPrice', {
    extend: 'Ext.data.Model',
    fields: [

        'id',
        'category_id',
        'name',
        'charge_amount',
        'duration_time',
        'duration_day',
        'allow_late',
        'extra_charge',
        'exd',
        'is_active',
        'seq_no',
        'remark',
        'is_include_tax',
        'created_at',
        'updated_at',
    ]

});
