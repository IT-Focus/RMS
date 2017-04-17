class CreateAccountCategories < ActiveRecord::Migration
  def up
    create_table :account_categories do |t|
    	t.integer :code
    	t.string :category_name
    	t.string :main_group
      t.timestamps null: false
    end
  end

  def down
  	drop_table :account_categories
  end
end
