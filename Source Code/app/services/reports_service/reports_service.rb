class ReportsService::ReportsService
	def auditrail_report from_date, to_date, user_id
		if !from_date.nil? && !to_date.nil?
			auditril = Auditrail.find_by_sql get_query(from_date,to_date,user_id)
		elsif !from_date.nil? && !to_date.nil? && !user_id.nil?
			auditril = Auditrail.find_by_sql get_query_all_params(from_date,to_date,user_id)
		else
			auditril = Auditrail.find_by_sql get_all(from_date,to_date,user_id)
		end
		return auditril
	end

	def get_query(from_date,to_date,user)
		query = "
		SELECT 
		    au.module_name AS module_name,
		    au.action AS action,
		    au.description AS description,
    		CONCAT(su.first_name, '  ', su.last_name) AS user_name,
    		Date(au.created_at) as created_at
		FROM
		    auditrails au
		        INNER JOIN
		    sys_users su ON su.id = au.created_by
		WHERE
		    (DATE(au.created_at) BETWEEN '#{from_date}' AND '#{to_date}')
		"
		return query
	end

	def get_query_all_params(from_date,to_date,user)
		query = "
		SELECT 
		    au.module_name AS module_name,
		    au.action AS action,
		    au.description AS description,
    		CONCAT(su.first_name, '  ', su.last_name) AS user_name
    		Date(au.created_at) as created_at
		FROM
		    auditrails au
		        INNER JOIN
		    sys_users su ON su.id = au.created_by
		WHERE
		    (DATE(au.created_at) BETWEEN '#{from_date}' AND '#{to_date}')
		        AND au.created_by = '#{user}'
		"
		return query
	end

	def get_all(from_date,to_date,user)
		query = "
		SELECT 
		    au.module_name AS module_name,
		    au.action AS action,
		    au.description AS description,
		    CONCAT(su.first_name, '  ', su.last_name) AS user_name
		FROM
		    auditrails au
		        INNER JOIN
		    sys_users su ON su.id = au.created_by
		"
		return query
	end

	


end