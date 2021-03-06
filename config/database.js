module.exports =
  { "development":
    { "driver":   "redis-hq"
    , "prefix":   "dev"
    , "database": 4
    , "url": "localhost"
    , "fulltext": {database: 5}
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
    , "database": 0
    , "fulltext": {database: 5}
    , "session": {database: 10}
    }
  };
