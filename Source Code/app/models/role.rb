class Role < ActiveRecord::Base
	has_many :rel_menu_role , foreign_key:"role_id"
    accepts_nested_attributes_for :rel_menu_role  , :allow_destroy => true
end
