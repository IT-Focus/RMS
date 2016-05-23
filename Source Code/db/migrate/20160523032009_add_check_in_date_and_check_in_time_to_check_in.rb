class AddCheckInDateAndCheckInTimeToCheckIn < ActiveRecord::Migration
  def up
  	remove_column :check_ins, :check_in_time
  	add_column :check_ins , :check_in_time , :time , after: :charge
  	add_column :check_ins , :check_in_date , :date , after: :check_in_time
  end
  def down
  	remove_column :check_ins, :check_in_time
  	remove_column :check_ins, :check_in_date
  end
end
