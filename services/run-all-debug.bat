START "social-media-aggregator-security" /D social-media-aggregator-security sbt compile "run 9000" -jvm-debug 9999
START "social-media-aggregator-users" /D social-media-aggregator-users sbt compile "run 9001" -jvm-debug 10000
START "social-media-aggregator-posts" /D social-media-aggregator-posts sbt compile "run 9002" -jvm-debug 10001