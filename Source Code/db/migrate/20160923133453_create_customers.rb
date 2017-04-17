class CreateCustomers < ActiveRecord::Migration
  def up
    create_table :customers do |t|
    	t.string :customer_name
    	t.string :email
    	t.text :address
    	t.date :dob 
    	t.string :city
    	t.string :phone
    	t.string :mobile 
    	t.string :national_no
    	t.string :passport_no
    	t.text :description
      t.timestamps null: false
    end
  end
  def down
  	
  end
end
