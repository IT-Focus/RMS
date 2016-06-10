class CreateCategoryPrices < ActiveRecord::Migration
  def up
    create_table :category_prices do |t|
    	t.integer :category_id
    	t.string :name
    	t.decimal :charge_amount
    	t.time :duration_time
    	t.integer :duration_day
    	t.time :allow_late
    	t.decimal :extra_charge
    	t.time :exd
    	t.boolean :is_active
    	t.integer :seq_no
    	t.string :remark
    	t.boolean :is_include_tax
      	t.timestamps null: false
    end
  end
  def down
  	drop_table :category_prices
  end
end
