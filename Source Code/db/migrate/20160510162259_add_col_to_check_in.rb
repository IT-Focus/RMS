class AddColToCheckIn < ActiveRecord::Migration
  def up
  	add_column :check_ins , :customer_name , :string
  	add_column :check_ins , :national_id , :integer
  	add_column :check_ins , :status_code , :integer
  end
  def down
  	remove_column :check_ins , :customer_name , :string
  	remove_column :check_ins , :national_id , :integer 
  	remove_column :check_ins , :status_code , :integer 
  end
end
