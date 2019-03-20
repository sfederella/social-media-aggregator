package models

import com.danielasfregola.twitter4s._
import com.danielasfregola.twitter4s.entities.enums.ResultType
import scala.concurrent.Future
import scala.concurrent.ExecutionContext
import play.api.libs.json.JsObject
import play.api.libs.json.Json

case class Subject (val description: String, var lastId: Option[Long] = None) extends Followable {
  
  def search(restClient: TwitterRestClient)(implicit ec: ExecutionContext): Future[Seq[Post]] = { 
    restClient.searchTweet(s"#${description}", count=18, include_entities=true, result_type=ResultType.Recent, since_id=lastId).map { ratedData =>
      val result    = ratedData.data
      val tweets    = result.statuses
      if (tweets!=Nil) tweets.map(tweet => Post.fromTweet(tweet)).sortBy(_._id)
      else Seq.empty
    }
  }
  
  def setLastId(lastId: Long): Unit = {
    this.lastId = Some(lastId)
  }
  
  def selector: JsObject = {
    Json.obj("description" -> description)
  }
  
}