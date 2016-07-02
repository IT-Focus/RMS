class CreateRoomTransactions < ActiveRecord::Migration
  def up
    create_table :room_transactions do |t|
    	t.integer :room_master_id
    	t.string :reference_no
    	t.datetime :transaction_date
    	t.string :status_code
    	t.integer :user_id
      t.timestamps null: false
    end
  end

  def down
  	drop_table :room_transactions
  end
end
