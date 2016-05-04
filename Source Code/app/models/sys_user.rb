class SysUser < ActiveRecord::Base
   	has_many :cashier,  foreign_key: "user_id"
   	has_many :cancel_check_in,  foreign_key: "Cancelled_by"
    attr_encrypted :password, :key => 'encrypt password for softexpert!!'
end
