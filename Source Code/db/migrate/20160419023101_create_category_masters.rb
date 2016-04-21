class CreateCategoryMasters < ActiveRecord::Migration
  def up
    create_table :category_masters do |t|
      t.string :code,limit:45
      t.string :name,limit:45
      t.boolean :is_include_tax
      t.float :tariff
      t.float :tax
      t.integer :no_persons
      t.float :rent_for_single
      t.float :tax_for_single
      t.float :extra_person_charge
      t.float :tariff_hour
      t.float :tax_hour
      t.float :rent_for_single_hour
      t.float :tax_for_single_hour
      t.float :tariff_month
      t.float :tax_month
      t.float :rent_for_single_month
      t.float :tax_for_single_month
      t.float :extra_person_charge_month
      t.integer :user_id
      t.string :created_by, limit:45
      t.string :edited_by, limit:45
      t.timestamps null: false
    end
  end
  def down
    
  end
end
