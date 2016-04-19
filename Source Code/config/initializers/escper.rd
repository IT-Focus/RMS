Escper.setup do |config|
  config.codepage_file = File.join('config', 'codepages.yml')
  config.use_safe_device_path = false
  config.safe_device_path = File.join('path', 'to', 'outputdir')
end
