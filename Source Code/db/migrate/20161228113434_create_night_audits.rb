class CreateNightAudits < ActiveRecord::Migration
  def up
    create_table :night_audits do |t|
    	t.datetime :date 
    	t.integer :created_by 
    	t.text :comment
      t.timestamps null: false
    end
  end
end
