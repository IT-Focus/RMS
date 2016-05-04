class CreateCancelCheckIns < ActiveRecord::Migration
  def up
    create_table :cancel_check_ins do |t|
    	t.string :code
    	t.string :check_in_code
    	t.datetime :check_in_date
    	t.string :room_no
    	t.datetime :cancel_date
    	t.string :reason
    	t.string :cancelled_by
      	t.timestamps null: false
    end
  end
  def down
  	drop_table :cancel_check_ins
  end
end
