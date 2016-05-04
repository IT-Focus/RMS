class CheckInDetail < ActiveRecord::Base
self.table_name = "check_in_details"
belongs_to :RoomMaster, foreign_key: "room_no"
belongs_to :CheckIn, foreign_key: "check_in_id"
end
