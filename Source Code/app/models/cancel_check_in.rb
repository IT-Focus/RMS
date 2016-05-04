class CancelCheckIn < ActiveRecord::Base
belongs_to :sys_user , foreign_key:'Cancelled_by'
belongs_to :room_master, foreign_key: "room_no"
end
