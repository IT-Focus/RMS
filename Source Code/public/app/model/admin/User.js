Ext.define('App.model.admin.User', {
    extend: 'Ext.data.Model',
    fields: [
        "id",
        "code",
        "date_join",
        "first_name",
        "last_name",
        "phone",
        "email",
        "username",
        "password",
        "is_active",
        "is_admin",
        "role_id",
        "department_id",
        "address",
        "created_at",
        "updated_at",
    ]

});
