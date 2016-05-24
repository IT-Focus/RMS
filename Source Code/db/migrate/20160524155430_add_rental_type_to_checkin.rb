class AddRentalTypeToCheckin < ActiveRecord::Migration
  def up
  	add_column :check_ins , :rental_type , :string , after: :discount
  end
  def down
  	remove_column :check_ins, :rental_type
  end
end
