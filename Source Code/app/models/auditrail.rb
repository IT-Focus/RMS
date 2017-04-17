class Auditrail < ActiveRecord::Base
	 belongs_to :sys_user , foreign_key:'created_by'

end
