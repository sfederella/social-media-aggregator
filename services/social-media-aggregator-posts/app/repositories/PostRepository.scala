package repositories

import javax.inject.{ Inject, Singleton }
import scala.concurrent.{ Future, ExecutionContext }
import play.api.libs.json._
import reactivemongo.api._
import play.modules.reactivemongo.{ ReactiveMongoApi }
import reactivemongo.play.json._
import collection._
import play.api.libs.json.Json.toJsFieldJsValueWrapper
import models.Post
import models.Result
import reactivemongo.api.commands.MultiBulkWriteResult
import reactivemongo.bson.BSONObjectID
import models.SearchRequest

@Singleton
class PostRepository @Inject() (defaultApi: ReactiveMongoApi)(implicit ec: ExecutionContext){

  def database = defaultApi.database
  def postsCollection: Future[JSONCollection] =
    database.map(_.collection[JSONCollection]("posts"))
    
  def listAll: Future[Seq[Post]] = {
		val cursor: Future[Cursor[Post]] = postsCollection.map {
  	  _.find(Json.obj(),Option(Json.obj()))
  	   .sort(Json.obj("_id" -> -1))
  	   .cursor[Post]()
    }
	  cursor.flatMap(_.collect[Seq](-1, Cursor.FailOnError[Seq[Post]]()))
  }
  
  def save(posts: Seq[Post]): Future[Result] = {
    val res: Future[MultiBulkWriteResult] = postsCollection.flatMap(_.insert.many(posts))
    res.map(res => if(res.ok) Result.success(s"Rows affected: ${res.totalN.toString()}") else Result.error(res.errmsg.getOrElse("")))
  }
  
  def search(searchRequest: SearchRequest): Future[List[Post]]= {
    var selector = Json.obj( "$or" -> Json.arr(
        Json.obj("username" -> Json.obj("$in" -> Json.toJson(searchRequest.users))),
        Json.obj("subjects" -> Json.obj("$in" -> Json.toJson(searchRequest.subjects))),
    ))
    
    searchRequest.from map {f => 
      selector = Json.obj( "$and" -> Json.arr(
          selector,
          Json.obj("_id" -> Json.obj("$lt" -> f.toLong))
      )) 
    }
    
    val cursor: Future[Cursor[Post]] = postsCollection.map {
  	  _.find(selector,Option(Json.obj()))
  	   .sort(Json.obj("_id" -> -1))
  	   .cursor[Post]()
    }
	  cursor.flatMap(_.collect[List](18, Cursor.FailOnError[List[Post]]()))
  }
  
}
