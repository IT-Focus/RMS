class CreateCurrencies < ActiveRecord::Migration
  def up
    create_table :currencies do |t|
      t.string :currency_name
      t.string :currencysyb
      t.float :rate
      t.float :exchange_rate
      t.integer :seq_num
      t.timestamps null: false
    end
  end
  def down
  	drop_table :currencies
  end
end
