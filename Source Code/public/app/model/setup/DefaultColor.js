Ext.define('App.model.setup.DefaultColor', {
    extend: 'Ext.data.Model',
    fields: [
       
        'id',
        'reserved',
        'occupied',
        'late_checkout',
        'free',
        'edited_by',
        'created_at',
        'updated_at',
        'reserved_text_color',
        'occupied_text_color',
        'late_checkout_text_color',
        'free_text_color',
    ]

});
