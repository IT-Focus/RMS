class AddColBacgroundUrlToCfgCompany < ActiveRecord::Migration
  def up
  	add_column :cfg_companies , :background_url , :string , after: :logo_url
  end
  def down
  	remove_column :cfg_companies, :background_url
  end
end
