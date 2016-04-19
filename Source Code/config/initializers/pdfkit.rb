PDFKit.configure do |config|
  config.wkhtmltopdf = 'C:\wkhtmltopdf\bin\wkhtmltopdf.exe'

  config.default_options = { 
  	:page_size => 'A4', 
  	:margin_top => 10,
  	:margin_left => 5,
  	:margin_right => 5,
    :encoding => 'UTF-8',
    :print_media_type => true }
end