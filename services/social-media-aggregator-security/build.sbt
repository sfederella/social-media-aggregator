name := """social-media-aggregator-security"""

version := "0.0.1"

lazy val root = (project in file(".")).enablePlugins(PlayScala, SwaggerPlugin)

swaggerDomainNameSpaces := Seq("models")

scalaVersion := "2.12.8"

libraryDependencies += guice
libraryDependencies += "com.danielasfregola" %% "twitter4s" % "5.3"
libraryDependencies += specs2 % Test
libraryDependencies += ws
libraryDependencies += "org.webjars" % "swagger-ui" % "2.2.0"

scalacOptions ++= Seq(
  "-feature",
  "-deprecation",
  "-Xfatal-warnings"
)
