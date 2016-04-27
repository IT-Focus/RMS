# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160427080727) do

  create_table "auditrails", force: :cascade do |t|
    t.string   "module",      limit: 45
    t.text     "action",      limit: 65535
    t.text     "description", limit: 65535
    t.string   "created_by",  limit: 45
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
  end

  create_table "cashier_balances", force: :cascade do |t|
    t.integer  "cashier_id",    limit: 4
    t.datetime "opened_date"
    t.datetime "closed_date"
    t.float    "open_balance",  limit: 24
    t.float    "close_balance", limit: 24
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
  end

  create_table "cashiers", force: :cascade do |t|
    t.integer  "user_id",      limit: 4
    t.integer  "workshift_id", limit: 4
    t.time     "start_time"
    t.float    "obda",         limit: 24
    t.boolean  "is_active"
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  create_table "category_masters", force: :cascade do |t|
    t.string   "code",                      limit: 45
    t.string   "name",                      limit: 45
    t.boolean  "is_include_tax"
    t.float    "tariff",                    limit: 24
    t.float    "tax",                       limit: 24
    t.integer  "no_persons",                limit: 4
    t.float    "rent_for_single",           limit: 24
    t.float    "tax_for_single",            limit: 24
    t.float    "extra_person_charge",       limit: 24
    t.float    "tariff_hour",               limit: 24
    t.float    "tax_hour",                  limit: 24
    t.float    "rent_for_single_hour",      limit: 24
    t.float    "tax_for_single_hour",       limit: 24
    t.float    "tariff_month",              limit: 24
    t.float    "tax_month",                 limit: 24
    t.float    "rent_for_single_month",     limit: 24
    t.float    "tax_for_single_month",      limit: 24
    t.float    "extra_person_charge_month", limit: 24
    t.integer  "user_id",                   limit: 4
    t.string   "created_by",                limit: 45
    t.string   "edited_by",                 limit: 45
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
  end

  create_table "cfg_auditrail_types", force: :cascade do |t|
    t.string "name",        limit: 45
    t.text   "description", limit: 65535
  end

  create_table "cfg_companies", force: :cascade do |t|
    t.string "legal_name",         limit: 255
    t.string "legal_name_khmer",   limit: 255
    t.string "company_name",       limit: 255
    t.string "company_name_khmer", limit: 255
    t.string "tax_no",             limit: 45
    t.string "phone",              limit: 200
    t.string "mobile",             limit: 200
    t.string "website",            limit: 100
    t.string "address",            limit: 255
    t.string "address_khmer",      limit: 255
    t.string "logo_url",           limit: 255
    t.string "background_url",     limit: 255
    t.string "account_no",         limit: 200
    t.string "account_name",       limit: 100
    t.string "bank_name",          limit: 100
    t.string "vatin",              limit: 45
  end

  create_table "cfg_utilities", force: :cascade do |t|
    t.string   "util_name",    limit: 255
    t.integer  "util_int",     limit: 4
    t.string   "util_string",  limit: 255
    t.boolean  "util_boolean"
    t.datetime "util_date"
    t.text     "description",  limit: 65535
  end

  create_table "check_ins", force: :cascade do |t|
    t.string   "code",                limit: 45
    t.datetime "arrival_date"
    t.integer  "no_person",           limit: 4
    t.integer  "adult",               limit: 4
    t.integer  "children",            limit: 4
    t.integer  "male",                limit: 4
    t.integer  "female",              limit: 4
    t.integer  "no_days",             limit: 4
    t.float    "balance",             limit: 24
    t.integer  "room_master_id",      limit: 4
    t.integer  "extra_person",        limit: 4
    t.float    "charge",              limit: 24
    t.datetime "check_in_time"
    t.date     "dob"
    t.text     "address",             limit: 65535
    t.string   "city",                limit: 45
    t.string   "phone",               limit: 45
    t.string   "mobile",              limit: 45
    t.float    "discount",            limit: 24
    t.datetime "hourly_check_in"
    t.datetime "monthly_check_out"
    t.float    "estimated_check_out", limit: 24
    t.string   "created_by",          limit: 45
    t.string   "edited_by",           limit: 45
    t.text     "description",         limit: 65535
    t.datetime "created_at",                        null: false
    t.datetime "updated_at",                        null: false
  end

  create_table "cities", force: :cascade do |t|
    t.string   "city",       limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "currencies", force: :cascade do |t|
    t.string   "currency_name", limit: 255
    t.string   "currencysyb",   limit: 255
    t.float    "rate",          limit: 24
    t.float    "exchange_rate", limit: 24
    t.integer  "seq_num",       limit: 4
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
  end

  create_table "day_ends", force: :cascade do |t|
    t.datetime "day_end"
    t.string   "created_by", limit: 45
    t.string   "edited_by",  limit: 45
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
  end

  create_table "default_colors", force: :cascade do |t|
    t.string   "reserved",      limit: 45
    t.string   "occupied",      limit: 45
    t.string   "late_checkout", limit: 45
    t.string   "free",          limit: 45
    t.string   "edited_by",     limit: 45
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
  end

  create_table "departments", force: :cascade do |t|
    t.string   "name",        limit: 255
    t.string   "description", limit: 255
    t.boolean  "is_active",               null: false
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  create_table "floors", force: :cascade do |t|
    t.string   "code",        limit: 45
    t.string   "name",        limit: 45
    t.text     "description", limit: 65535
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
  end

  create_table "images", force: :cascade do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "image_file_name",    limit: 255
    t.string   "image_content_type", limit: 255
    t.integer  "image_file_size",    limit: 4
    t.datetime "image_updated_at"
  end

  create_table "next_codes", force: :cascade do |t|
    t.integer  "module",     limit: 4
    t.integer  "cit",        limit: 4
    t.integer  "cet",        limit: 4
    t.string   "prefix",     limit: 255
    t.string   "suffix",     limit: 255
    t.integer  "length",     limit: 4
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "rel_menu_roles", force: :cascade do |t|
    t.integer  "menu_id",    limit: 4
    t.integer  "role_id",    limit: 4
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
  end

  create_table "roles", force: :cascade do |t|
    t.string   "name",        limit: 255
    t.text     "description", limit: 65535
    t.boolean  "is_active"
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
  end

  create_table "room_masters", force: :cascade do |t|
    t.string   "room_no",     limit: 45
    t.integer  "category_id", limit: 4
    t.integer  "floor_id",    limit: 4
    t.integer  "status_id",   limit: 4
    t.string   "extn_no",     limit: 45
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "room_service_masters", force: :cascade do |t|
    t.integer  "code",           limit: 4
    t.string   "service_name",   limit: 45
    t.string   "indicatoer",     limit: 45
    t.boolean  "is_include_tax"
    t.float    "tax",            limit: 24
    t.string   "created_by",     limit: 45
    t.string   "edited_by",      limit: 45
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
  end

  create_table "statuses", force: :cascade do |t|
    t.string   "status_type", limit: 255
    t.string   "name",        limit: 255
    t.integer  "seq_num",     limit: 4
    t.string   "description", limit: 255
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  create_table "sys_auditrails", force: :cascade do |t|
    t.integer  "auditrail_type_id", limit: 4
    t.text     "description",       limit: 65535
    t.integer  "user_id",           limit: 4
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "sys_auditrails", ["auditrail_type_id"], name: "fk_auditrail_auditrail_type1_idx", using: :btree

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
    t.string   "pin_code",           limit: 6
    t.boolean  "is_active"
    t.boolean  "is_admin"
    t.string   "address",            limit: 255
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
  end

  add_index "sys_users", ["department_id"], name: "fk_users_departments_idx", using: :btree
  add_index "sys_users", ["role_id"], name: "fk_users_roles1_idx", using: :btree

  create_table "workshifts", force: :cascade do |t|
    t.string   "abbr",        limit: 255
    t.string   "name",        limit: 255
    t.time     "start_time"
    t.time     "end_time"
    t.text     "description", limit: 65535
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
  end

end
