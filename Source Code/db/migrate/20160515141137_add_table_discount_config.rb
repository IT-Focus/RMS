class AddTableDiscountConfig < ActiveRecord::Migration
  def up
    create_table :discount_config do |t|
    	t.string :code
    	t.string :remark
    	t.string :created_by
    	t.string :edited_by
    	t.string :deleted_by
    	t.boolean :is_delete
      	t.timestamps null: false
    end
  end
  def down
  	drop_table :discount_config
  end
end
