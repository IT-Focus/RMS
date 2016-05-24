class AddNoroomsToCheckin < ActiveRecord::Migration
  def up
  	add_column :check_ins , :no_room , :integer , after: :balance
  end
  def down
  	remove_column :check_ins, :no_room
  end
end
