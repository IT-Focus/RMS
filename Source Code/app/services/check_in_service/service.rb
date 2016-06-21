class CheckInService::Service
	def change_room_status room_master_id
		roomMaster = RoomMaster.find room_master_id
		roomMaster.update_attributes(status_id:3)
		roomMaster.save
	end
end