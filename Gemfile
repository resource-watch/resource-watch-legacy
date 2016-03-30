source 'https://rubygems.org'

ruby '2.3.0'

gem 'rails', '>= 5.0.0.beta3', '< 5.1'

# Rails plugins
gem 'puma'
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]

# Assets pipeline
gem 'uglifier', '>= 1.3.0'
gem 'coffee-rails', '~> 4.1.0'
gem 'jquery-rails'
gem 'sass-rails', '~> 5.0'
gem 'autoprefixer-rails'
gem 'bourbon'
gem 'handlebars_assets'

source 'https://rails-assets.org' do
  gem 'rails-assets-normalize-css'
  gem 'rails-assets-underscore'
  gem 'rails-assets-backbone'
  gem 'rails-assets-d3'
  gem 'rails-assets-vega'
  gem 'rails-assets-three.js'
end

group :development, :test do
  gem 'teaspoon-mocha', github: 'modeset/teaspoon', branch: 'rails_5'
end

group :development do
  gem 'spring'
  gem 'quiet_assets'
end

group :production do
  gem 'rails_12factor'
end
