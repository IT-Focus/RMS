class SysUser < ActiveRecord::Base
   	has_many :cashier,  foreign_key: "user_id"
    attr_encrypted :password, :key => 'encrypt password for softexpert!!'
end
