class ImagesController < ApplicationController
	 def upload_image
      		begin
       			data =Image.new(permit_data_image)
            puts "===== data before save"
            data.save 
            @@image_url = data.image.url 
          

            if data.valid?
              
         			render json:{ image_url:@@image_url , success:true}
            else
              render json:{ success:false , message:data.errors }
            end


      		rescue Exception => e
       			puts e
       			render json:{  success:false , message:e.message}
       
      		end
     end
    
    private
    def permit_data_image
  		params.permit(
  		:image
  		)
  	end
end
