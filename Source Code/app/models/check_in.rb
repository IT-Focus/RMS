class CheckIn < ActiveRecord::Base
self.table_name = "check_ins"
has_many :check_in_detail,  foreign_key: "check_in_id"
accepts_nested_attributes_for :check_in_detail, :allow_destroy => true
end
