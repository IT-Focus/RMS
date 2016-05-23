class CreateNationalities < ActiveRecord::Migration
  def up
    create_table :nationalities do |t|
    	  t.string :iso, limit:2
        t.string :name, limit:80
        t.string :nicename,limit:80
        t.string :iso3,limit:3
        t.integer :numcode, limit:6
      	t.integer :phonecode, limit:5
      	t.timestamps null: false
    end
  end
  
  def down
  	drop_table :nationalities
  end

end
