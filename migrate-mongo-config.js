const config = {
  mongodb: {
    url: 'mongodb://localhost:27017',
    databaseName: 'crawler',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  migrationsDir: 'scripts/migrations',
  changelogCollectionName: 'changelog',
  migrationFileExtension: '.js',
  useFileHash: true,
};

module.exports = config;
