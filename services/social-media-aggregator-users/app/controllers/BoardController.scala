package controllers

import scala.concurrent.ExecutionContext
import scala.concurrent.Future

import javax.inject._
import models._
import models.Result
import play.api.libs.json._
import play.api.mvc._
import services.BoardService
import utils.WSSessionHelper
import play.api.libs.ws.WSClient
import services.PostService

@Singleton
class BoardController @Inject()(cc: ControllerComponents, boardService: BoardService, wssh: WSSessionHelper, postService: PostService)
  (implicit ec: ExecutionContext) extends AbstractController(cc) {
  
  def listAll(username: String) = Action.async { implicit request =>
	  boardService.listAllBoards(username) map { boards =>
	    Ok(Json.toJson(boards))
	  }
  }
  
  def find(username: String, boardname: String) = Action.async { implicit request =>
    boardService.findBoard(username,boardname) map { board =>
      Ok(Json.toJson(board))
    }
  }
  
  def add(username: String) = Action.async { implicit request =>
    wssh.withAuthCheck {
    	val body: AnyContent = request.body
			val jsonBody: JsValue = body.asJson.getOrElse(Json.obj())
			val boardnameResult: JsResult[String] = jsonBody.validate[String]
      boardnameResult match {
        case JsSuccess(boardname,_) => boardService.addBoard(username, boardname) map { result =>
            Created(Json.toJson(result))
          }
        case e: JsError => Future(BadRequest(Json.toJson(Result.error(e.toString()))))
      }		
    }
  }
  
  def delete(username: String, boardname: String) = Action.async { implicit request =>
    wssh.withAuthCheck {
      boardService.deleteBoard(username,boardname) map { result =>
        Ok(Json.toJson(result))
      }
    }
  }
  
  def edit(username: String, boardname: String) = Action.async { implicit request =>
    wssh.withAuthCheck {
      val body: AnyContent = request.body
      val jsonBody: JsValue = body.asJson.getOrElse(Json.obj())
      val newBoardnameResult: JsResult[String] = jsonBody.validate[String]
      newBoardnameResult match {
        case JsSuccess(newBoardname,_) => boardService.editBoard(username, boardname, newBoardname) map { result =>
            Ok(Json.toJson(result))
          }
        case e: JsError => Future(BadRequest(Json.toJson(Result.error(e.toString()))))
      }
    }
  }
  
  def followUser(username: String, boardname: String) = Action.async { implicit request =>
    wssh.withAuthCheck {
      val body: AnyContent = request.body
      val jsonBody: JsValue = body.asJson.getOrElse(Json.obj())
      val userResult: JsResult[TwitterUser] = jsonBody.validate[TwitterUser]
  
      userResult match {
        case JsSuccess(twitterUser:TwitterUser,_) => boardService.followUser(username, boardname, twitterUser) map { result =>
            postService.addUser(twitterUser)
            Created(Json.toJson(result))
          }
        case e: JsError => Future(BadRequest(Json.toJson(Result.error(e.toString()))))
      }
    }
  }

  def unfollowUser(username: String, boardname: String, twitterUsername: String) = Action.async { implicit request =>
    wssh.withAuthCheck {
      boardService.unfollowUser(username,boardname,twitterUsername) map { result =>
        Ok(Json.toJson(result))
      }
    }
  }
  
  def followSubject(username: String, boardname: String) = Action.async { implicit request =>
    wssh.withAuthCheck {
      val body: AnyContent = request.body
      val jsonBody: JsValue = body.asJson.getOrElse(Json.obj())
      val subjectResult: JsResult[String] = jsonBody.validate[String]
      subjectResult match {
        case JsSuccess(subject,_) => boardService.followSubject(username, boardname, subject) map { result =>
            postService.addSubject(subject)
            Created(Json.toJson(result))
          }
        case e: JsError => Future(BadRequest(Json.toJson(Result.error(e.toString()))))
      }
    }
  }
  
  def unfollowSubject(username: String, boardname: String, subject: String) = Action.async { implicit request =>
    wssh.withAuthCheck {
      boardService.unfollowSubject(username, boardname,subject) map { result =>
        Ok(Json.toJson(result))
      }
    }
  }

}
