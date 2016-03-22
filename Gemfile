source 'https://rubygems.org'

ruby '2.3.0'

gem 'rails', '>= 5.0.0.beta1', '< 5.1'

# Rails plugins
gem 'puma'
gem 'jbuilder', '~> 2.0'
gem 'dotenv-rails', '2.1.0'

# Assets pipeline
gem 'uglifier', '>= 1.3.0'
gem 'coffee-rails', '~> 4.1.0'
gem 'jquery-rails'
gem 'sass-rails'
gem 'autoprefixer-rails'
gem 'bourbon'
gem 'handlebars_assets'

source 'https://rails-assets.org' do
  gem 'rails-assets-normalize-css'
  gem 'rails-assets-underscore'
  gem 'rails-assets-backbone'
  gem 'rails-assets-d3'
  gem 'rails-assets-vega'
  gem 'rails-assets-leaflet'
end

# Active record
gem 'pg', '~> 0.18'

group :development, :test do
  gem 'teaspoon-mocha', github: 'modeset/teaspoon', branch: 'rails_5'
  gem 'hirb'
  gem 'awesome_print'
  gem 'faker'
  gem 'spring-commands-rspec'
  gem 'rspec_api_documentation'
  gem 'json_spec'
  gem 'bullet'
end

group :development do
  gem 'web-console', '~> 3.0'
  gem 'spring'
  gem 'better_errors'
  gem 'binding_of_caller'
  gem 'annotate'
  gem 'quiet_assets'
  gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
end

group :test do
  gem 'factory_girl_rails'
  gem 'rspec-rails'
  gem 'database_cleaner'
end

group :production do
  gem 'rails_12factor'
end
