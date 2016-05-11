class AddColumnTexstColorToDefaultColor < ActiveRecord::Migration
  def up
  	add_column :default_colors , :reserved_text_color , :string 
  	add_column :default_colors , :occupied_text_color , :string 
  	add_column :default_colors , :late_checkout_text_color , :string 
  	add_column :default_colors , :free_text_color , :string 
  end
  def down
  	remove_column :default_colors , :reserved_text_color , :string
  	remove_column :default_colors , :occupied_text_color , :string 
  	remove_column :default_colors , :late_checkout_text_color , :string 
  	remove_column :default_colors , :free_text_color , :string 
  end
end
