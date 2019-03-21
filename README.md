# Social Media Aggregator

Keep things **organized**. Never miss **anything**.

This is a multitenant application, where you can create different Boards and follow different users and topics from twitter in each one.

## Overall architecture

![Social Media Aggregator Architecture](https://github.com/sfederella/social-media-aggregator/blob/master/docs/architecture.svg)

## Get started

#### Step 1

Start one or more mongo dabases. You can use one database per API or have both APIs using the same database. Then configure the database uri in the respective ``application.conf``
```
   mongodb.uri = "mongodb://admin:admin@localhost:27017/social-media-aggregator-api"
```

#### Step 2

Start the services with the script ``run-all.bat`` or start them individually:
1. social-media-aggregator-security: ``sbt "run 9000"``
2. social-media-aggregator-users: ``sbt "run 9001"``
3. social-media-aggregator-posts: ``sbt "run 9002"``

#### Step 3

Start the client with ``yarn start`` and after loading it will start running in the browser automatically.

## Documentation

There is a swagger available in the three APIs which you can use as documentation. For example, the security swagger will be in:
```
   http://127.0.0.1:9000/swagger
```

