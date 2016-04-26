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

        {
            name: 'custom_name',
            convert: function(v, rec) {
                var custom = rec.get('first_name') + " : " + rec.get('last_name');
                return custom;
            }
        },
    ]

});