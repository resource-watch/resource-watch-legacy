# Resource Watch

TODO: Write a project description

## Installation

Requirements:

* Ruby 2.3.0 [How to install](https://gorails.com/setup/osx/10.10-yosemite)
* PostgreSQL 9+ [How to install](http://exponential.io/blog/2015/02/21/install-postgresql-on-mac-os-x-via-brew/)

Install global dependencies:

    gem install bundler

Install project dependencies:

    bundle install


Set up environment variables using .env.sample

## Usage

To run application:

    bundle exec rails server

To manage localisation texts:

    i18n-tasks 'comand'

    Useful commands
    'health' (check the status)
    'normalize' (sort by name)
    'add-missing' (add to file.yml the missing keys)

    More info in https://github.com/glebm/i18n-tasks


## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request :D
