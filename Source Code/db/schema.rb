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

ActiveRecord::Schema.define(version: 20161228113434) do

  create_table "account_categories", force: :cascade do |t|
    t.integer  "code",          limit: 4
    t.string   "category_name", limit: 255
    t.string   "main_group",    limit: 255
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
  end

  create_table "auditrails", force: :cascade do |t|
    t.string   "module_name", limit: 255
    t.text     "action",      limit: 65535
    t.text     "description", limit: 65535
    t.string   "created_by",  limit: 45
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
  end

  create_table "cancel_check_ins", force: :cascade do |t|
    t.string   "code",          limit: 255
    t.string   "check_in_code", limit: 255
    t.datetime "check_in_date"
    t.string   "room_no",       limit: 255
    t.datetime "cancel_date"
    t.string   "reason",        limit: 255
    t.string   "cancelled_by",  limit: 255
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
  end

  create_table "cashier_balances", force: :cascade do |t|
    t.integer  "cashier_id",    limit: 4
    t.datetime "opened_date"
    t.datetime "closed_date"
    t.float    "open_balance",  limit: 24
    t.float    "close_balance", limit: 24
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
    t.string   "close_by",      limit: 255
    t.integer  "status",        limit: 4
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
    t.string   "code",                 limit: 45
    t.string   "name",                 limit: 45
    t.boolean  "is_include_tax"
    t.float    "tariff",               limit: 24
    t.integer  "no_persons",           limit: 4
    t.float    "extra_person_charge",  limit: 24
    t.float    "tariff_hour",          limit: 24
    t.boolean  "is_include_tax_hour"
    t.float    "tariff_month",         limit: 24
    t.boolean  "is_include_tax_month"
    t.string   "created_by",           limit: 45
    t.string   "edited_by",            limit: 45
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
  end

  create_table "category_prices", force: :cascade do |t|
    t.integer  "category_id",    limit: 4
    t.string   "name",           limit: 255
    t.decimal  "charge_amount",              precision: 10
    t.time     "duration_time"
    t.integer  "duration_day",   limit: 4
    t.time     "allow_late"
    t.decimal  "extra_charge",               precision: 10
    t.time     "exd"
    t.boolean  "is_active"
    t.integer  "seq_no",         limit: 4
    t.string   "remark",         limit: 255
    t.boolean  "is_include_tax"
    t.boolean  "is_charge_rate"
    t.datetime "created_at",                                null: false
    t.datetime "updated_at",                                null: false
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
    t.string "email",              limit: 255
  end

  create_table "cfg_utilities", force: :cascade do |t|
    t.string   "util_name",    limit: 255
    t.integer  "util_int",     limit: 4
    t.string   "util_string",  limit: 255
    t.boolean  "util_boolean"
    t.datetime "util_date"
    t.text     "description",  limit: 65535
  end

  create_table "check_in_details", force: :cascade do |t|
    t.integer  "check_in_id",        limit: 4
    t.integer  "room_master_id",     limit: 4
    t.string   "rental_type",        limit: 1
    t.integer  "categroy_price_id",  limit: 4
    t.datetime "check_in_date"
    t.datetime "check_out_date"
    t.string   "description",        limit: 255
    t.integer  "adults",             limit: 4
    t.integer  "childrens",          limit: 4
    t.integer  "qty",                limit: 4
    t.float    "unit_price",         limit: 24
    t.float    "total_amount",       limit: 24
    t.float    "discount",           limit: 24
    t.float    "discount_amount",    limit: 24
    t.float    "tax",                limit: 24
    t.float    "tax_amount",         limit: 24
    t.float    "grand_total_amount", limit: 24
    t.string   "created_by",         limit: 255
    t.string   "edited_by",          limit: 255
    t.string   "tran_type",          limit: 255
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
    t.integer  "extra_charge",       limit: 4
    t.integer  "service_id",         limit: 4
  end

  create_table "check_ins", force: :cascade do |t|
    t.string   "code",                     limit: 45
    t.datetime "arrival_date"
    t.integer  "customers_id",             limit: 4
    t.float    "balance",                  limit: 24
    t.time     "check_in_time"
    t.date     "check_in_date"
    t.float    "discount",                 limit: 24
    t.string   "rental_type",              limit: 255
    t.datetime "monthly_check_in"
    t.time     "estimated_check_out_time"
    t.date     "estimated_check_out_date"
    t.text     "purpose_of_visit",         limit: 65535
    t.float    "paid_booking",             limit: 24
    t.text     "description",              limit: 65535
    t.integer  "status_code",              limit: 4
    t.decimal  "total_amount",                           precision: 10
    t.integer  "discount_percentage",      limit: 4
    t.decimal  "discount_amount",                        precision: 10
    t.integer  "tax_percentage",           limit: 4
    t.decimal  "tax_amount",                             precision: 10
    t.decimal  "grand_total_amount",                     precision: 10
    t.string   "created_by",               limit: 45
    t.string   "edited_by",                limit: 45
    t.datetime "created_at",                                            null: false
    t.datetime "updated_at",                                            null: false
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

  create_table "customer_payment_details", force: :cascade do |t|
    t.integer  "customer_payment_id", limit: 4
    t.integer  "check_in_id",         limit: 4
    t.decimal  "amount",                        precision: 10
    t.datetime "created_at",                                   null: false
    t.datetime "updated_at",                                   null: false
  end

  create_table "customer_payments", force: :cascade do |t|
    t.string   "receipt_no",           limit: 255
    t.date     "transaction_date"
    t.decimal  "base_currency_amount",               precision: 10
    t.decimal  "change_rate",                        precision: 10
    t.decimal  "total_amount",                       precision: 10
    t.integer  "payment_method",       limit: 4
    t.string   "status_code",          limit: 255
    t.integer  "created_by",           limit: 4
    t.text     "remark",               limit: 65535
    t.integer  "eod_id",               limit: 4
    t.integer  "cashier_id",           limit: 4
    t.datetime "created_at",                                        null: false
    t.datetime "updated_at",                                        null: false
  end

  create_table "customers", force: :cascade do |t|
    t.integer  "national_id",     limit: 4
    t.string   "customer_name",   limit: 255
    t.string   "email",           limit: 255
    t.text     "address",         limit: 65535
    t.date     "dob"
    t.string   "city",            limit: 255
    t.string   "phone",           limit: 255
    t.string   "mobile",          limit: 255
    t.string   "national_no",     limit: 255
    t.string   "passport_no",     limit: 255
    t.text     "description",     limit: 65535
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
    t.string   "passport_url",    limit: 255
    t.string   "national_id_url", limit: 255
  end

  create_table "day_ends", force: :cascade do |t|
    t.datetime "day_end"
    t.string   "created_by", limit: 45
    t.string   "edited_by",  limit: 45
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
  end

  create_table "default_colors", force: :cascade do |t|
    t.string   "reserved",                 limit: 45
    t.string   "occupied",                 limit: 45
    t.string   "late_checkout",            limit: 45
    t.string   "free",                     limit: 45
    t.string   "edited_by",                limit: 45
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "reserved_text_color",      limit: 255
    t.string   "occupied_text_color",      limit: 255
    t.string   "late_checkout_text_color", limit: 255
    t.string   "free_text_color",          limit: 255
  end

  create_table "departments", force: :cascade do |t|
    t.string   "name",        limit: 255
    t.string   "description", limit: 255
    t.boolean  "is_active",               null: false
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  create_table "discount_config", force: :cascade do |t|
    t.float    "discount_percentage", limit: 24
    t.string   "code",                limit: 255
    t.string   "remark",              limit: 255
    t.string   "created_by",          limit: 255
    t.string   "edited_by",           limit: 255
    t.string   "deleted_by",          limit: 255
    t.boolean  "is_delete"
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
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

  create_table "nationalities", force: :cascade do |t|
    t.string   "iso",        limit: 2
    t.string   "name",       limit: 80
    t.string   "nicename",   limit: 80
    t.string   "iso3",       limit: 3
    t.integer  "numcode",    limit: 8
    t.integer  "phonecode",  limit: 8
    t.boolean  "is_default"
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
  end

  create_table "next_codes", force: :cascade do |t|
    t.string   "module",     limit: 255
    t.integer  "cit",        limit: 4
    t.integer  "cet",        limit: 4
    t.string   "prefix",     limit: 255
    t.string   "suffix",     limit: 255
    t.integer  "length",     limit: 4
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.boolean  "is_manaul"
  end

  create_table "night_audits", force: :cascade do |t|
    t.datetime "date"
    t.integer  "created_by", limit: 4
    t.text     "comment",    limit: 65535
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
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
    t.string   "abbr",           limit: 255
    t.float    "charge_amount",  limit: 24
    t.boolean  "is_include_tax"
    t.float    "tax",            limit: 24
    t.string   "created_by",     limit: 45
    t.string   "edited_by",      limit: 45
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
  end

  create_table "room_transactions", force: :cascade do |t|
    t.integer  "room_master_id",   limit: 4
    t.string   "reference_no",     limit: 255
    t.datetime "transaction_date"
    t.string   "status_code",      limit: 255
    t.integer  "user_id",          limit: 4
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
  end

  create_table "statuses", force: :cascade do |t|
    t.integer  "code",        limit: 4
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
