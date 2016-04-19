class RelMenuRole < ActiveRecord::Base
    belongs_to :sys_menu , foreign_key:'menu_id'
end
