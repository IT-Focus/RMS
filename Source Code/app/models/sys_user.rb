class SysUser < ActiveRecord::Base
    attr_encrypted :password, :key => 'encrypt password for softexpert!!'
end
