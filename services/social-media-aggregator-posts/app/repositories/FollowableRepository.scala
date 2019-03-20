package repositories

import scala.concurrent.ExecutionContext
import scala.concurrent.Future

import javax.inject.Inject
import javax.inject.Singleton
import models._
import play.api.libs.json._
import play.modules.reactivemongo.ReactiveMongoApi
import reactivemongo.api._
import reactivemongo.api.commands.WriteResult
import reactivemongo.play.json._
import reactivemongo.play.json.collection._
import reactivemongo.api.commands.UpdateWriteResult

@Singleton
class FollowableRepository @Inject() (defaultApi: ReactiveMongoApi)(implicit ec: ExecutionContext){

  def database = defaultApi.database
  def followingsCollection: Future[JSONCollection] =
    database.map(_.collection[JSONCollection]("followings"))
    
  def listAll: Future[Seq[Followable]] = {
		val cursor: Future[Cursor[Followable]] = followingsCollection.map {
  	  _.find(Json.obj(),Option(Json.obj()))
  	   .cursor[Followable]()
    }
	  cursor.flatMap(_.collect[Seq](-1, Cursor.FailOnError[Seq[Followable]]()))
  }
  
  def find(followable: Followable): Future[Option[Followable]] = {
    val cursor: Future[Cursor[Followable]] = followingsCollection.map {
      _.find(followable.selector,Option(Json.obj()))
       .cursor[Followable]()
    }

    cursor.flatMap(_.headOption)
  }
  
  def add(followable: Followable): Future[Result] = {
		find(followable).flatMap { ofollowable =>
  		if (ofollowable.isEmpty) {
  			val res: Future[WriteResult] = followingsCollection flatMap { _.insert.one(followable) }
  		  res.map(res => if(res.ok) Result.success(s"Rows affected: ${res.n.toString()}") else Result.error(res.writeErrors.toString()))
  		} else {
  			Future(Result.success("Already exists"))
  		}
		}
  }
  
  def save(followable: Followable): Future[Result] = {
    val res: Future[UpdateWriteResult] = followingsCollection flatMap { _.update(ordered=false).one(followable.selector, followable, upsert=true, multi=false) }
    res.map(res => if(res.ok) Result.success(s"Rows affected: ${res.nModified.toString()}") else Result.error(res.errmsg.getOrElse("")))
  }
  
}
