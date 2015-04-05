require File.expand_path('../boot', __FILE__)

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module MerlinsBoard
  class Application < Rails::Application
    config.autoload_paths += %W(#{config.root}/lib)
    
    config.paperclip_defaults = {
      :storage => :s3,
      :s3_credentials => {
        :bucket => "MerlinsBoard",
        :access_key_id => ENV["s3_access_key_id"],
        :secret_access_key => ENV["s3_secret_access_key"]
      }
    }
  end
end
