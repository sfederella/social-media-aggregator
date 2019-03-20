package utils

import play.api.mvc.RequestHeader
import javax.inject._
import play.api.libs.ws._
import scala.concurrent.Future
import play.api.mvc.Result
import play.api.mvc.Results._
import scala.concurrent.ExecutionContext
import play.api.Configuration

@Singleton
class WSSessionHelper @Inject() (ws: WSClient, config: Configuration)(implicit ec: ExecutionContext) {
  
  def get(urlstr: String)(callback: WSResponse => Future[Result])(implicit request: RequestHeader): Future[Result] = {
    val wsCookie = DefaultWSCookie("PLAY_SESSION_SECURITY", request.cookies.get("PLAY_SESSION_SECURITY").map(c => c.value).getOrElse(""))
    ws.url(urlstr)
      .addCookies(wsCookie)
      .get
      .flatMap { result => 
        result.status match {
          case 401 => Future(Unauthorized("Invalid session"))
          case 403 => Future(Forbidden("Missing session"))
          case _ => callback(result)
        }
      }
  }
  
  def withAuthCheck(callback: => Future[Result])(implicit request: RequestHeader): Future[Result] = {
    get(s"""${config.get[String]("microservices.security")}/isauthenticated""") { result =>
      callback
    }
  }
  
}