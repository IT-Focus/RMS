class SysMenu < ActiveRecord::Base
    has_many :sys_menu , foreign_key:'parent_id'
    has_many :rel_menu_role, foreign_key:'menu_id'

end
