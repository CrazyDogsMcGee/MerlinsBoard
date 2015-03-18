source 'https://rubygems.org'


# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.1.7'
# Use postgresql as the database for Active Record
gem 'pg'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 4.0.3'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Use CoffeeScript for .js.coffee assets and views
gem 'coffee-rails', '~> 4.0.0'
# See https://github.com/sstephenson/execjs#readme for more supported runtimes
# gem 'therubyracer',  platforms: :ruby

# Use jquery as the JavaScript library
gem 'jquery-rails'
# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
# gem 'turbolinks'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.0'
# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 0.4.0',          group: :doc

# Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
gem 'spring',        group: :development

# Use ActiveModel has_secure_password
gem 'bcrypt', '~> 3.1.7'


# Use unicorn as the app server
# gem 'unicorn'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

# Use debugger
# gem 'debugger', group: [:development, :test]

gem "backbone-on-rails"
gem "faker"
gem "paperclip", "~> 4.2"
gem 'aws-sdk', '~> 1.5.7'

group :development do
  gem 'pry-rails'
  gem 'binding_of_caller'
  gem 'quiet_assets'
  gem 'better_errors'
end

group :test, :development do
  gem "rspec-rails", ">= 3.2.1"
  gem "factory_girl_rails", "~> 4.0"
end

# To poke selective holes in this security mechanism, you can add a line like this to your startup (for example, on Rails it would be config/environments/development.rb)

# BetterErrors::Middleware.allow_ip! ENV['TRUSTED_IP'] if ENV['TRUSTED_IP']
# Then run Rails like this:

# TRUSTED_IP=172.17.42.1 rails s
# Note that the allow_ip! is actually backed by a Set, so you can add more than one IP address or subnet.

# Tip: You can find your apparent IP by hitting the old error page's "Show env dump" and looking at "REMOTE_ADDR".

group :production do
  gem 'rails_12factor'
end
