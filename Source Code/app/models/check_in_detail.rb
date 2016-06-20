class CheckInDetail < ActiveRecord::Base
self.table_name = "check_in_details"
belongs_to :room_master, foreign_key: "room_no"
belongs_to :check_in, foreign_key: "check_in_id"
end
