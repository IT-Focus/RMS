Ext.define('App.model.setup.CategoryMaster', {
    extend: 'Ext.data.Model',
    fields: [
      
      
      'id',
      'code',
      'name',
      'is_include_tax',
      'tariff',
      'no_persons',
      'extra_person_charge',
      'tariff_hour',
      'is_include_tax_hour',
      'tariff_month',
      'is_include_tax_month',
      'created_by',
      'edited_by',
      'created_at',
      'updated_at',

      "category_price_attributes"
    ]

});
