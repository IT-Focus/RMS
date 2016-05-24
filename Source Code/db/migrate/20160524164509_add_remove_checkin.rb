class AddRemoveCheckin < ActiveRecord::Migration
  def up
  	remove_column :check_ins, :estimated_check_out
  	remove_column :check_ins, :monthly_check_out
  	add_column :check_ins , :monthly_check_in , :datetime , after: :hourly_check_in
  	add_column :check_ins , :estimated_check_out_time , :time , after: :monthly_check_in
	add_column :check_ins , :estimated_check_out_date , :date , after: :estimated_check_out_time
  	add_column :check_ins , :purpose_of_visit , :text , after: :estimated_check_out_date
  	add_column :check_ins , :paid_booking , :float , after: :purpose_of_visit

  end
  def down
  	remove_column :check_ins, :monthly_check_in
  	remove_column :check_ins, :estimated_check_out_time
  	remove_column :check_ins, :estimated_check_out_date
  	remove_column :check_ins, :purpose_of_visit
  	remove_column :check_ins, :paid_booking
  end
end
