class License::LicenseSv
	 @@filename = "app/assets/license.json"
	def check_license
		result = true 
		if check_file_exist ==true 
			secret_key = File.read(@@filename )
			if check_correct_mac_address(secret_key) == true
				if check_correct_key(secret_key) == true 
					if check_correct_date(secret_key) != true 						
					
						result = false 
					end
				else 
					result = false 
				end
			else
				result = false
			end

		else 
			result = false 	
		end

		return result 
	end
	def check_correct_date secret_key
		license_date = get_date_from_secret_key secret_key 
		if license_date == "never_expire"
			return true 
		else
			if (license_date.to_date ) > (Date.today)
				return true 
			else
				return false 
			end			
		end
		
	end
	def check_correct_key secret_key
		if get_key() == get_key_from_secret_key(secret_key)
			return true 
		else	
			return false 
		end
	end
	def check_correct_mac_address secret_key		
		
		mac_pc = get_mac
		mac_address = get_macadr_from_key secret_key

		if mac_pc == mac_address
			return true 
		else
			return false
		end
	end
	def check_file_exist 
		is_exist  = File.file? @@filename
		is_exist 
	end
	def check_secret_key secrete_key
		# 1- compare mac address 
		# 2- compare key 
		mac_address = get_macadr_from_key secrete_key
		pc_mac_address = get_mac
		if mac_address == pc_mac_address 
			if get_key_from_secret_key(secrete_key) == get_key()				
				return true 	
			else 
				return false 
			end

		else 
			return false 
		end
	end
	def write_license_key secret_key 
		File.write(@@filename, secret_key) 		
	end

	def get_key_code
		key_code = get_mac()+"/"+get_key()
		encrypt_text key_code
	end


	def get_key
		key ="softexpert"
	end
	def get_mac
		mac_address = MacAddress.address
		return mac_address
	end
	def get_date_from_secret_key key_code
		string_decrypted = decrypt(key_code)
		split_key = string_decrypted.split("/")
		split_key[2]
	end
	def get_key_from_secret_key key_code
		string_decrypted = decrypt(key_code)
		split_key = string_decrypted.split("/")
		split_key[1]
	end
	def get_macadr_from_key key_code
		string_decrypted = decrypt(key_code)
		split_key = string_decrypted.split("/")
		split_key[0]
	end
	def encrypt_text text
		AESCrypt.encrypt(text,get_key() )
	end
    def decrypt(encrypted_data)
        begin
            if !encrypted_data.empty?
                decrypted_back =AESCrypt.decrypt(encrypted_data, get_key() )
                decrypted_back
            else
                return ""
            end

        rescue Exception => e
            puts "========= error decrypt #{encrypted_data}: #{e.message}"
            return ''

        end
    end
end