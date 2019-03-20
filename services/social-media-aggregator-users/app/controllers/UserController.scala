package controllers

import javax.inject._
import play.api.Logger
import play.api.libs.json._
import play.api.mvc._
import services.UserService
import models.User
import scala.concurrent.ExecutionContext
import scala.concurrent.Future
import play.api.libs.ws.WSClient
import play.api.Configuration
import play.api.libs.ws.DefaultWSCookie
import utils.WSSessionHelper
import models.AppUser


@Singleton
class UserController @Inject()(cc: ControllerComponents, config: Configuration, userService: UserService, wssh: WSSessionHelper)
  (implicit ec: ExecutionContext) extends AbstractController(cc) {
  
  def index = Action {
    Ok(Json.obj(
        "message" -> "Welcome to the Users API"
    ))
  }
  
  def listAll = Action.async { implicit request =>
	  userService.listAllUsers map { appUser =>
	    Ok(Json.toJson(appUser))
	  }
  }

  def find(username: String) = Action.async { implicit request =>
    userService.findUser(username) map { appUser =>
      Ok(Json.toJson(appUser))
    }
  }
  
  def getCurrent = Action.async { implicit request =>
    wssh.get(s"""${config.get[String]("microservices.security")}/userdata""") { result => 
      val _id = (result.json \ "_id").as[Long]
      val username = (result.json \ "username").as[String]
		  val name = (result.json \ "name").as[String]
		  val imageUrl = (result.json \ "imageUrl").as[String]
      
      val futureUser: Future[Option[AppUser]] = userService.findUser(username)
      futureUser map { o => 
        val appUser: AppUser = o.getOrElse({
          val newUser = AppUser(_id,username,name,imageUrl)
          userService.saveUser(newUser)
          newUser
        })
        Ok(Json.toJson(appUser))
      }
    }
  }
  
}
