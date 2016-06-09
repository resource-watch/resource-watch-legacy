# Resource Watch

The world's resources are becoming scarce; at the same time, we aren't providing enough for everyone to live well and prosper. But with trends in mobile phone use, big data processing and global citizenship, we have never been in such a good position to tackle these interrelated issues head on. We just need a way to listen to our planet's signals, together, and broadcast what we learn to those who can use it.

Resource Watch is an open platform for everyone to explore accurate, up-to-date insights about our planet. Anyone can create visualisations or apps, using data from satellites, sensors and social media, to tell stories about the state of our planet. Then, with seamless sharing tools, show the world what you've learnt and inspire action.

For more information visit [resourcewatch.org](http://resourcewatch.org/)

## Installation

Requirements:

* Ruby 2.3.0 [How to install](https://gorails.com/setup/osx/10.10-yosemite)
* PostgreSQL 9+ [How to install](http://exponential.io/blog/2015/02/21/install-postgresql-on-mac-os-x-via-brew/)

Install global dependencies:

    gem install bundler

Install project dependencies:

    bundle install

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
