class User::ChangePassword
    @message = ""
    def change_password params,user_id
        result = true
        new_pss = params[:newPassword]
        cnf_pss = params[:confirmPassword]
        if new_pss == cnf_pss
            userObj = SysUser.find user_id
            userObj.update_attributes(password:new_pss)
        else
            set_msg "Password not correct the same "
            result = false
        end

        result
    end

    def set_msg msg
        @message = msg
    end

    def get_msg
        @message
    end

    def check_PIN params
        pos_pin = params[:pos_pin]
        puts "===============pos_pin=#{pos_pin}"
        user = SysUser.where pos_pin:pos_pin
        if user.count > 0 
            return false
        else
            return true
        end
    end

end
