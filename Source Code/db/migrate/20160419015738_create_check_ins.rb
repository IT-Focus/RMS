class CreateCheckIns < ActiveRecord::Migration
  def up
    create_table :check_ins do |t|
    	t.string :code, limit:45
    	t.datetime :arrival_date
    	t.integer :no_person
    	t.integer :adult
    	t.integer :children
    	t.integer :male
    	t.integer :female
    	t.integer :no_days
    	t.float :balance
    	t.integer :room_master_id
    	t.integer :extra_person
    	t.float  :charge
    	t.datetime :check_in_time
    	t.date :dob
    	t.text :address
    	t.string :city, limit:45
    	t.string :phone, limit:45
    	t.string :mobile, limit:45
    	t.float :discount
    	t.datetime :hourly_check_in
    	t.datetime :monthly_check_out
    	t.float :estimated_check_out
    	t.string :created_by, limit:45
    	t.string :edited_by, limit:45
    	t.text :description
     	t.timestamps null: false
    	end
    
  end
  def down
  	drop_table :check_ins
  end
end
