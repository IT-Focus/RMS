# class SystemAuditrail::Auditrail

# 	def create_action(module_name, description, created_by)
# 		Auditrail.create module_name:module_name,action:"Create",description:description created_by:created_by
# 	end
	

# end

class ServiceAuditrail::TrackAuditrail
	def track_action(module_name,action,description, created_by)
		auditrail = Auditrail.new(
			module_name:module_name,
			action:action,
			description:description,
			created_by:created_by
		)
		auditrail.save

	end
end