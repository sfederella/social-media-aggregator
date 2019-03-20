package controllers

import scala.concurrent.ExecutionContext

import javax.inject._
import play.api.mvc._
import com.danielasfregola.twitter4s.TwitterRestClient
import models.TwitterUser
import play.api.libs.json.Json
import scala.concurrent.Future


@Singleton
class TwitterUserController @Inject()(cc: ControllerComponents)(implicit ec: ExecutionContext) extends AbstractController(cc) {
  
  def search(query: Option[String]) = Action.async { implicit request =>
    val restClient = TwitterRestClient()
    restClient.searchForUser(query.getOrElse("a")) map { ratedData =>
      val users: Seq[TwitterUser] = ratedData.data map { u =>
        TwitterUser(u.screen_name,u.name,u.profile_image_url.default)
      }
      Ok(Json.toJson(users))
    }
  }
  
}
