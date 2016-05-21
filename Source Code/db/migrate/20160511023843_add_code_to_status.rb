class AddCodeToStatus < ActiveRecord::Migration
  def up
  	add_column :statuses , :code , :integer, after: :id
  end
  def down
  	remove_column :statuses , :code , :integer, after: :id
  end
end
