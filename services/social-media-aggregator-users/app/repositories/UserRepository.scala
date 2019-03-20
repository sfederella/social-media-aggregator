package repositories

import javax.inject.{ Inject, Singleton }
import scala.concurrent.{ Future, ExecutionContext }
import play.api.libs.json._
import reactivemongo.api._
import play.modules.reactivemongo.{ ReactiveMongoApi }
import reactivemongo.play.json._
import collection._
import reactivemongo.api.commands.UpdateWriteResult
import models.AppUser
import models.Result
import play.api.libs.json.Json.toJsFieldJsValueWrapper

@Singleton
class UserRepository @Inject() (defaultApi: ReactiveMongoApi)(implicit ec: ExecutionContext){

  def database = defaultApi.database
  def usersCollection: Future[JSONCollection] =
    database.map(_.collection[JSONCollection]("users"))
    
  def listAll: Future[List[AppUser]] = {
		val cursor: Future[Cursor[AppUser]] = usersCollection.map {
  	  _.find(Json.obj(),Option(Json.obj()))
  	   .sort(Json.obj("_id" -> -1))
  	   .cursor[AppUser]()
    }
	  cursor.flatMap(_.collect[List](-1, Cursor.FailOnError[List[AppUser]]()))
  }
  
  def findByUsername(username: String): Future[Option[AppUser]] = {
    val cursor: Future[Cursor[AppUser]] = usersCollection.map {
      _.find(Json.obj("username" -> username),Option(Json.obj()))
       .cursor[AppUser]()
    }

    cursor.flatMap(_.headOption)
  }
  
  def save(user: AppUser): Future[Result] = {
    val selector = Json.obj("username" -> user.username)
    val res: Future[UpdateWriteResult] = usersCollection flatMap { _.update(ordered=false).one(selector, user, upsert=true, multi=false) }
    res.map(res => if(res.ok) Result.success(s"Rows affected: ${res.nModified.toString()}") else Result.error(res.errmsg.getOrElse("")))
  }
  
}
