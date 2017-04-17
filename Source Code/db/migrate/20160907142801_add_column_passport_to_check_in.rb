class AddColumnPassportToCheckIn < ActiveRecord::Migration
   def up
  	add_column :check_ins , :passport , :string
  	add_column :check_ins , :passport_url , :string
  	add_column :check_ins , :national_id_url , :string
  end

  def down
  	remove_column :check_ins, :passport
  	remove_column :check_ins, :passport_url
  	remove_column :check_ins, :national_id_url
  end
end
