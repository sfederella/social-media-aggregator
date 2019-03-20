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
import services.FollowableService
import models.Followable

@Singleton
class FollowableController @Inject()(cc: ControllerComponents, followableService: FollowableService)(implicit ec: ExecutionContext)
  extends AbstractController(cc) {
  
  def add = Action.async { implicit request =>
  	val body: AnyContent = request.body
  	val jsonBody: JsValue = body.asJson.getOrElse(Json.obj())
  	val followableResult: JsResult[Followable] = jsonBody.validate[Followable]
    followableResult match {
      case JsSuccess(followable,_) => followableService.addFollowable(followable) map { result =>
          Created(Json.toJson(result))
        }
      case e: JsError => Future(BadRequest(Json.toJson(Result.error(e.toString()))))
    }
  }
  
}

