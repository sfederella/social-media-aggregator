package services

import scala.concurrent.Future
import javax.inject._
import models.Result
import scala.concurrent.ExecutionContext
import play.api.libs.ws.WSClient
import play.api.Configuration
import models.TwitterUser
import play.api.libs.json.Json

@Singleton
class PostService  @Inject() (ws: WSClient, config: Configuration)(implicit ec: ExecutionContext) {
	
  val postServiceUrl = config.get[String]("microservices.posts");
  
  def addUser(user: TwitterUser): Unit = {
    ws.url(s"${postServiceUrl}/followings")
      .post(Json.obj(
          "type" -> "u",
          "username" -> user.username
      ))
  }
  
  def addSubject(subject: String): Unit = {
    ws.url(s"${postServiceUrl}/followings")
		  .post(Json.obj(
			  "type" -> "s",
			  "description" -> subject
		  ))
  }
  
}