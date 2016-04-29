class AddEmailToCfgCompanyProfile < ActiveRecord::Migration
  def change
  	add_column :cfg_companies , :email , :string
  end
end
