class AddColumnNextCode < ActiveRecord::Migration
  def up
  	add_column :next_codes , :is_manaul , :boolean
  end
end
