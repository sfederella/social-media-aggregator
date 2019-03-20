package controllers

import scala.concurrent.ExecutionContext
import scala.concurrent.Future

import actors.SSEListener
import akka.actor.ActorSystem
import akka.actor.Props
import akka.stream.scaladsl.Source
import javax.inject.Inject
import javax.inject.Singleton
import models.Result
import models.SearchRequest
import play.api.http.ContentTypes
import play.api.libs.EventSource
import play.api.libs.iteratee.Concurrent
import play.api.libs.iteratee.streams.IterateeStreams
import play.api.libs.json.JsError
import play.api.libs.json.JsResult
import play.api.libs.json.JsSuccess
import play.api.libs.json.JsValue
import play.api.libs.json.Json
import play.api.mvc.AbstractController
import play.api.mvc.AnyContent
import play.api.mvc.ControllerComponents
import services.PostService
import actors.Listen
import play.api.libs.json.JsObject
import play.api.libs.json.JsString

@Singleton
class PostController @Inject()(cc: ControllerComponents, actorSystem: ActorSystem, postService: PostService)(implicit ec: ExecutionContext)
  extends AbstractController(cc) {
  
	private val (out, channel) = Concurrent.broadcast[JsValue]
	private val source: Source[JsValue,_] = Source.fromPublisher(IterateeStreams.enumeratorToPublisher(out))
	val sseListener = actorSystem.actorOf(Props[SSEListener], "sseListener")
	sseListener ! Listen(channel)
  
	def index = Action {
    Ok(Json.obj(
        "message" -> "Welcome to the Posts API"
    ))
  }
  
  def search = Action.async { implicit request =>
    val body: AnyContent = request.body
    val jsonBody: JsValue = body.asJson.getOrElse(Json.obj())
    val validationResult: JsResult[SearchRequest] = jsonBody.validate[SearchRequest]

    validationResult match {
      case JsSuccess(searchRequest: SearchRequest,_) => postService.searchPosts(searchRequest) map { posts =>
          Ok(Json.toJson(posts))
        }
      case e: JsError => Future(BadRequest(Json.toJson(Result.error(e.toString()))))
    }
  }

  def stream = Action { implicit req =>
    Ok.chunked(source via EventSource.flow).as(ContentTypes.EVENT_STREAM)
  }
  
}

