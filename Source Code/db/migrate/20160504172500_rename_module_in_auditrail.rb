class RenameModuleInAuditrail < ActiveRecord::Migration
  def up
  	remove_column :auditrails , :module
  	add_column :auditrails , :module_name , :string , after: :id
  end
  
  def down
  	remove_column :auditrails , :module_name , :string , after: :id
  end
end
