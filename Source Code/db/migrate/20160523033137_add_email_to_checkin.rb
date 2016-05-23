class AddEmailToCheckin < ActiveRecord::Migration
  def up
  	add_column :check_ins , :email , :string , after: :check_in_time
  end
  def down
  	remove_column :check_ins, :check_in_time
  end
end
