class Y5netLicense
# Created by: Sary Monydara (23-July-2015)
    #
    # process check license key
    # 1- Check file license
    #   1.1 check pc must be not defferent
    #   1.2 ativation key must be not expire
    # 2- create file license
    #   2.1 This licencse base on mac address and the string input to
    #       system must be encrypt with company format
    #   2.2 key formart is "macaddress/activatedate"

# ============ start function licencse

    @@message = ""
    @@filename = "app/assets/license.xml"
    @@company = 'y5net'

    def self.check_license
        begin
            filename =  @@filename
            contain_file = create_file filename
            message = ""

            if contain_file  == false
                #write mac address to license file
                message = "System require is licsence .
                   <br><b>
                     Your key is:</u><span style='color:black;'> <u> #{ encrypt get('key') }
                    </u></b> </span>"
                    puts '___________1.0'
            elsif check_license_key(filename) == false  # for licence not valid

                message = "System require is licsence .
                <br><b>Your key is:</u><span style='color:black;'> <u> #{ encrypt get('key') } </u></b> </span> "
                    puts '___________2.0'

            elsif  check_valid_date(filename) == false # for licence is expire

                message = "Your license is already expire,
                 <br><b>Your key is:</u><span style='color:black;'> <u> #{ encrypt get('key') } </u></b> </span>"
                    puts '___________3.0'

            else
                 message = true
            end
            message
        rescue Exception => e
             puts "===Error : #{e.message}"
             false
        end
    end

    def self.activate_license(serail)
        begin
            result = ''
            key =decrypt(serail)

            if !key.empty?
                 arr_key = key.split("/")
                    # compare key
                    l_key = get("key").split('/')
                    if arr_key[0].to_s == l_key[0].to_s
                        if  arr_key[1].to_s == "Unlimit" || arr_key[1].to_date > Date.today
                            set('mac',l_key[0] )
                            set("seriel-no" , serail )
                            set("ativated-date", Date.today )
                            set("valid-date" ,arr_key[1] )
                            set("is-expired" , false )
                            result = "Key activated"
                        else
                            result = "Date in license key is expire. "
                        end

                       else
                       result = "Invalid license key  "
                    end

                else
                    result = "Ivalid Serial"
            end
        rescue Exception => e
           return "fail activation: #{e.message}"

        end


    end


private



    def self.check_valid_date(filename)
        begin
            activate_date = get("ativated-date")
            result = true
            if activate_date == '' || !activate_date.nil?

                today = Date.today
                valid_date = get("valid-date")

                if get("is-expired") == true

                    result = false
                elsif valid_date == "Unlimit"

                    # this condition no expire date
                elsif today.to_date > valid_date.to_date

                    set("is-expired" , true )
                    result = false
                end
            end
            result
        rescue Exception => e
            puts "========== Error: #{e.message}"
            false
        end



    end


    def self.check_license_key(filename)
        # check key
        result = true

        mac_address = Mac.addr

        if get('mac') == mac_address

            result =true
        else
            #set new key to file
            key = get("key")
            if key.empty?
                result = false
            else
                key_arr = key.split("/")
                mac = key_arr[0]
                date = key_arr[1]

                if mac == mac_address

                else
                    set("key" , "#{mac_address}/#{ Date.today}" )
                end

                result =false
            end
        end

        result
    end
    def self.write_key_to_file(filename)
        # write key generate with mac address to file
    end


    def self.create_file(filename)
        begin
            # for check file exist in system
            result = File.file? filename
            if result == false
                # create file if dosn't have
                FileUtils.touch(filename)
                write_text_to_file()
            else
                result = true
            end
            result
        rescue Exception => e
            puts "==========Error: "+e.message
            false
        end

    end


    # sub function ==============================
    def self.write_text_to_file
        begin
             @text = Nokogiri::HTML::DocumentFragment.parse <<-EOHTML
            <root>
                <key> </key>
                <mac> </mac>
                <seriel-no> </seriel-no>
                <ativated-date> </ativated-date>
                <valid-date> </valid-date>
                <is-expired> </is-expired>
            </root>
            EOHTML
         File.write(@@filename, @text.to_xml)
         mac_address = Mac.addr
         # write key

         set("key" , "#{mac_address}/#{ Date.today}" )
         set("is-expired" , false )
         set("ativated-date" , Date.today )

        rescue Exception => e
            puts "======== error write_text_to_file : #{e.message}"
        end

    end



    def self.decrypt(encrypted_data)
        begin
            if !encrypted_data.empty?
                decrypted_back =AESCrypt.decrypt(encrypted_data, @@company)
                # @@crypt.decrypt_and_verify(encrypted_data)
                decrypted_back
            else
                return ""
            end

        rescue Exception => e
            puts "========= error decrypt #{encrypted_data}: #{e.message}"
            return ''

        end
    end
    def self.encrypt(text)
        begin

                encrypted_data = AESCrypt.encrypt(text,@@company)
                encrypted_data


        rescue Exception => e
            puts "========= error encrypt : #{e.message}"
            return " "
        end
    end


    def self.get(attribute)
        begin
            @doc = Nokogiri::XML(File.open(@@filename))
            att = @doc.at_css attribute

            decrypt att.content
        rescue Exception => e
            puts "==== Error get #{attribute} : e.message"
        end

    end
    def self.set(attribute , value)
        begin
            @doc = Nokogiri::XML(File.open(@@filename))
            att = @doc.at_css attribute
            att.content =encrypt(value)
            File.write(@@filename, @doc.to_xml)


            true
        rescue Exception => e
            puts "============ Error on funcion set:#{e.message}"
            false
        end

    end
# =========== end function licencse

end
