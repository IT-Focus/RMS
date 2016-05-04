class CreateCheckInDetails < ActiveRecord::Migration
  def up
    create_table :check_in_details do |t|
    	t.integer :check_in_id 
    	t.string :room_no
    	t.datetime :check_in_date
    	t.datetime :check_out_date
    	t.string :description
    	t.integer :qty
    	t.float :unit_price
    	t.float :total_amount
    	t.float :discount
    	t.float :discount_amount
    	t.float :tax
    	t.float :tax_amount
    	t.float :grand_total_amount
    	t.string :created_by
    	t.string :edited_by
    	t.string :tran_type
      	t.timestamps null: false
    end
  end

  def down
  	drop_table :check_in_details
  end
end
