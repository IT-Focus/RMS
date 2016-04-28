class AddColAbbrAndChargeAmountToRoomServiceMaster < ActiveRecord::Migration
  def up
  	remove_column :room_service_masters, :indicatoer
  	add_column :room_service_masters , :abbr , :string , after: :service_name
  	add_column :room_service_masters , :charge_amount , :float , after: :abbr
  end
  def down
  	remove_column :room_service_masters, :abbr
  	remove_column :room_service_masters, :charge_amount
  end
end
