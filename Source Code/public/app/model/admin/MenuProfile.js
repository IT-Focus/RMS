Ext.define('App.model.admin.MenuProfile', {
    extend: 'Ext.data.Model',
    fields: [
		"id",
		"menu",
		"icon_cls",
		"expand",
		"is_leaf",
		"parent_id",
		"action",
		"is_active",
		"view_index",
		"controller",
		"created_at",
		"updated_at",
		"parent_menu_name"
    ]

});
