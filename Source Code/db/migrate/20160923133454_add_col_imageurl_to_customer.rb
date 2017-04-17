class AddColImageurlToCustomer < ActiveRecord::Migration
  def up
  	add_column :customers , :passport_url , :string
  	add_column :customers , :national_id_url , :string
  end

  def down
  	remove_column :customers, :passport_url
  	remove_column :customers, :national_id_url
  end
end
