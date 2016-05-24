class AddIsdefaultToNationality < ActiveRecord::Migration
  def up
  	add_column :nationalities , :is_default , :boolean , after: :phonecode
  end
  def down
  	remove_column :nationalities, :is_default
  end
end
