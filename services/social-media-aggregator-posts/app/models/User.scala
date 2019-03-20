package models

import com.danielasfregola.twitter4s._
import com.danielasfregola.twitter4s.entities.enums.ResultType
import scala.concurrent.Future
import scala.concurrent.ExecutionContext
import play.api.libs.json.JsObject
import play.api.libs.json.Json
import scala.concurrent.duration.Duration
import scala.concurrent.Await



case class User (val username: String, var lastId: Option[Long] = None) extends Followable {
  
  def search(restClient: TwitterRestClient)(implicit ec: ExecutionContext): Future[Seq[Post]] = { 
    restClient.userTimelineForUser(username, since_id=lastId, count=18) map { ratedData =>
      val username = this.username;
      val tweets = ratedData.data
      if (tweets!=Nil) tweets.map(tweet => Post.fromTweet(tweet)).sortBy(_._id)
      else Seq.empty
    }
  }
  
  def setLastId(lastId: Long): Unit = {
    this.lastId = Some(lastId)
  }
  
  def selector: JsObject = {
    Json.obj("username" -> username)
  }
  
}