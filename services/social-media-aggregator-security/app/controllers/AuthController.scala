package controllers

import scala.concurrent.ExecutionContext

import javax.inject._
import play.api.mvc._
import play.api.libs.json._
import play.api.libs.functional.syntax._
import com.danielasfregola.twitter4s.TwitterRestClient
import scala.concurrent.Future
import play.api.libs.oauth._
import play.api.Configuration
import com.danielasfregola.twitter4s.entities.ConsumerToken
import com.danielasfregola.twitter4s.entities.AccessToken
import com.danielasfregola.twitter4s.entities.RatedData
import com.danielasfregola.twitter4s.entities.User

@Singleton
class AuthController @Inject()(cc: ControllerComponents, config: Configuration)(implicit ec: ExecutionContext)
  extends AbstractController(cc) {

  private val frontendURL = config.get[String]("frontendURL")
  private val KEY = ConsumerKey(config.get[String]("twitter.consumer.key"), config.get[String]("twitter.consumer.secret"))
  
  private val oauth = OAuth(ServiceInfo(
    "https://api.twitter.com/oauth/request_token",
    "https://api.twitter.com/oauth/access_token",
    "https://api.twitter.com/oauth/authorize", KEY),
    true)
  
  private def sessionTokenPair(implicit request: RequestHeader): Option[RequestToken] = {
    for {
      token <- request.session.get("token")
      secret <- request.session.get("secret")
    } yield {
      RequestToken(token, secret)
    }
  }
  
  def index = Action {
    Ok(Json.obj(
        "message" -> "Welcome to the Securityyy API"
    ))
  }
  
  def authenticate = Action { implicit request: Request[AnyContent] =>
    request.getQueryString("oauth_verifier").map { verifier =>
      val tokenPair = sessionTokenPair(request).get
      // We got the verifier; now get the access token, store it and back to index
      oauth.retrieveAccessToken(tokenPair, verifier) match {
        case Right(t) => {
          // We received the authorized tokens in the OAuth object - store it before we proceed
          Redirect(s"${frontendURL}/#/dashboard").withSession("token" -> t.token, "secret" -> t.secret)
        }
        case Left(e) => throw e
      }
    }.getOrElse(
      oauth.retrieveRequestToken("http://127.0.0.1:9000/authenticate") match {
        case Right(t) => {
          // We received the unauthorized tokens in the OAuth object - store it before we proceed
          Redirect(s"${frontendURL}/?redirect="+oauth.redirectUrl(t.token)).withSession("token" -> t.token, "secret" -> t.secret)
        }
        case Left(e) => throw e
      }
    )
  }
  
  private def verifyCredentials(callback: RatedData[User] => Result)(implicit request: RequestHeader): Future[Result] = {
    sessionTokenPair match {
      case Some(credentials) => {
        val consumerToken = ConsumerToken(KEY.key,KEY.secret)
        val accessToken = AccessToken(credentials.token,credentials.secret)  
        val restClient = TwitterRestClient(consumerToken, accessToken)
        restClient.verifyCredentials(false,false,false)
          .map { ratedData => callback(ratedData) }
      }
      case _ => Future(Forbidden("Missing session"))
    }
  }
  
  def isAuthenticated = Action.async { implicit request =>
    verifyCredentials { ratedData =>
      Ok(Json.obj("status" -> true))
    }
  }
  
  def getUserData = Action.async { implicit request =>
    verifyCredentials { ratedData =>
      val _id = ratedData.data.id
      val username = ratedData.data.screen_name.toLowerCase()
      val name = ratedData.data.name
      val imageUrl = ratedData.data.profile_image_url.default
      
      Ok(Json.obj(
          "_id" -> _id,
          "username" -> username,
          "name" -> name,
          "imageUrl" -> imageUrl
      ))
    }
  }
  
  def unauthenticate = Action {
    Redirect(s"${frontendURL}").withNewSession
  }
}