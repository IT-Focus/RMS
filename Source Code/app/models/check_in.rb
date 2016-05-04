class CheckIn < ActiveRecord::Base
self.table_name = "check_ins"
has_many :CheckInDetail,  foreign_key: "check_in_id"
end
