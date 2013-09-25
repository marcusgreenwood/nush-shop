module.exports =
  { "development":
    { "driver":   "redis-hq"
    , "prefix":   "dev"
    , "database": 0
    , "url": "localhost"
    , "fulltext": {driver: 'solr'}
    , "session": {database: 10}
    }
  , "test":
    { "driver":   "redis-hq"
    , "prefix":   "test"
    , "database": 1
    , "fulltext": {database: 5}
    , "session": {database: 10}
    }
  , "production":
    { "driver":   "redis-hq"
    , "prefix":   "prod"
    , "database": 2
    , "fulltext": {
        driver: 'solr',
        host: 'index.websolr.com',
        port: 80,
        cores: {
            'prod-Content': '37963d1aa5c',
            'prod-Activity': 'de55defbcfd',
            'prod-User': '6351314a5df',
            'global': '3e73a2f2c7d'
        }
    }
    , "session": {database: 10}
    }
  };