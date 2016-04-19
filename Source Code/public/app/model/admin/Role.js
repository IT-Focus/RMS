Ext.define('App.model.admin.Role', {
    extend: 'Ext.data.Model',
    fields: [
        "id",
        "name",
        "description",
        "is_active",
        "created_at",
        "updated_at",

        "rel_menu_role_attributes"
    ]

});
