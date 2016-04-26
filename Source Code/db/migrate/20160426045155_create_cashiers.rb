class CreateCashiers < ActiveRecord::Migration
  def up
    create_table :cashiers do |t|
      t.integer :user_id
      t.integer :workshift_id
      t.time :start_time
      t.float :obda
      t.boolean :is_active
      t.timestamps null: false
    end
  end

  def down
  	drop_table :cashiers
  end
end
