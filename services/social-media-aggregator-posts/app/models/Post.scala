package models

import play.api.libs.json._
import reactivemongo.bson.BSONObjectID
import reactivemongo.play.json._
import com.danielasfregola.twitter4s.entities.Tweet

case class Post (val _id: Long, val username: String, val name: String, val imageUrl: String,
                 val subjects: Set[String], val message: String) {
  
  def toJsRepresentation: PostJsRepresentation = {
    PostJsRepresentation(_id.toString(),username,name,imageUrl,subjects,message)
  }
}
                 
object Post {  
  implicit val postFormat = Json.format[Post]
  
  def fromTweet(tweet: Tweet): Post = {
    Post(tweet.id,
         tweet.user.get.screen_name,
         tweet.user.get.name,
         tweet.user.get.profile_image_url.default,
         Post.getSubjects(tweet.text),
         tweet.text)
  }
  
  def getSubjects(message: String): Set[String] = {
    val pattern = "#(\\w*)".r
 		pattern.findAllIn(message).toSet[String].map { s => s.tail }
  }
  
}