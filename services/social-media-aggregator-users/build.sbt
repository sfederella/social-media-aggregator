name := """social-media-aggregator-users"""

version := "0.0.1"

lazy val root = (project in file(".")).enablePlugins(PlayScala, SwaggerPlugin)

swaggerDomainNameSpaces := Seq("models")

scalaVersion := "2.12.8"

libraryDependencies += guice
libraryDependencies += "org.reactivemongo" %% "play2-reactivemongo" % "0.16.2-play27"
libraryDependencies += "com.danielasfregola" %% "twitter4s" % "5.3"
libraryDependencies += specs2 % Test
libraryDependencies += ws
libraryDependencies += "org.webjars" % "swagger-ui" % "2.2.0"
libraryDependencies += "com.typesafe.play" %% "play-json" % "2.7.1"

scalacOptions ++= Seq(
  "-feature",
  "-deprecation",
  "-Xfatal-warnings"
)
