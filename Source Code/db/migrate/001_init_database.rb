class InitDatabase < ActiveRecord::Migration
	# System Administrator
	create_table "sys_users", force: :cascade do |t|
    t.integer  "role_id",            limit: 4
    t.integer  "department_id",      limit: 4
    t.string   "code",               limit: 255
    t.date     "date_join"
    t.string   "first_name",         limit: 255
    t.string   "last_name",          limit: 255
    t.string   "phone",              limit: 255
    t.string   "email",              limit: 255
    t.string   "username",           limit: 255
    t.string   "encrypted_password", limit: 255
    t.string   "pin_code",            limit: 6
    t.boolean  "is_active"
    t.boolean  "is_admin"
    t.string   "address",            limit: 255
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
  end
  add_index "sys_users", ["department_id"], name: "fk_users_departments_idx", using: :btree
  add_index "sys_users", ["role_id"], name: "fk_users_roles1_idx", using: :btree

  create_table "sys_menus", force: :cascade do |t|
    t.string   "menu",       limit: 255
    t.string   "icon_cls",   limit: 255
    t.boolean  "expand"
    t.boolean  "is_leaf"
    t.integer  "parent_id",  limit: 4
    t.string   "action",     limit: 255
    t.boolean  "is_active"
    t.string   "view_index", limit: 255
    t.string   "controller", limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

   create_table "roles", force: :cascade do |t|
    t.string   "name",        limit: 255
    t.text     "description", limit: 65535
    t.boolean  "is_active"
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
  end
  create_table "rel_menu_roles", force: :cascade do |t|
    t.integer  "menu_id",    limit: 4
    t.integer  "role_id",    limit: 4
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
  end

  create_table "departments", force: :cascade do |t|
    t.string   "name",        limit: 255
    t.string   "description", limit: 255
    t.boolean  "is_active", null:false
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  create_table "cfg_utilities", force: :cascade do |t|
    t.string   "util_name",    limit: 255
    t.integer  "util_int",     limit: 4
    t.string   "util_string",  limit: 255
    t.boolean  "util_boolean"
    t.datetime "util_date"
    t.text     "description",  limit: 65535
  end

  create_table "cfg_companies", force: :cascade do |t|
    t.string "legal_name",   limit: 255
    t.string "legal_name_khmer", limit: 255
    t.string "company_name", limit: 255
    t.string "company_name_khmer", limit: 255
    t.string "tax_no",       limit: 45
    t.string "phone",        limit: 200
    t.string "mobile",       limit: 200
    t.string "website",      limit: 100
    t.string "address",      limit: 255
    t.string "address_khmer",      limit: 255
    t.string "logo_url",     limit: 255
    t.string "account_no",   limit: 200
    t.string "account_name", limit: 100
    t.string "bank_name",    limit: 100
    t.string "vatin",        limit: 45
  end

  create_table "sys_auditrails", force: :cascade do |t|
    t.integer  "auditrail_type_id", limit: 4
    t.text     "description",       limit: 65535
    t.integer  "user_id",           limit: 4
    t.datetime "created_at"
    t.datetime "updated_at"
  end
  add_index "sys_auditrails", ["auditrail_type_id"], name: "fk_auditrail_auditrail_type1_idx", using: :btree

  create_table "cfg_auditrail_types", force: :cascade do |t|
    t.string "name",        limit: 45
    t.text   "description", limit: 65535
  end


end