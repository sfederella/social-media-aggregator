START "social-media-aggregator-security" /D social-media-aggregator-security sbt compile "run 9000"
START "social-media-aggregator-users" /D social-media-aggregator-users sbt compile "run 9001"
START "social-media-aggregator-posts" /D social-media-aggregator-posts sbt compile "run 9002"