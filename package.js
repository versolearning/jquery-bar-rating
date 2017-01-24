Package.describe({
  name: 'npvn:jquery-bar-rating',
  version: '0.0.2',
  // Brief, one-line summary of the package.
  summary: 'jquery-bar-rating packaged for Meteor',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/npvn/jquery-bar-rating',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md',
});

Package.on_use(function(api) {
  api.add_files([
    'dist/jquery.barrating.min.js',
    'dist/themes/fontawesome-stars.css',
  ], 'client');
});


