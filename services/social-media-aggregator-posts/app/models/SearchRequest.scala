package models

import play.api.libs.json._
import reactivemongo.bson.BSONObjectID
import reactivemongo.play.json._

case class SearchRequest (val users: Set[String], val subjects: Set[String], val from: Option[String])

object SearchRequest {  
  implicit val findRequestFormat = Json.format[SearchRequest]
}