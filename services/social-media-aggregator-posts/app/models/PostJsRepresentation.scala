package models

import play.api.libs.json._

case class PostJsRepresentation (val _id: String, val username: String, val name: String, val imageUrl: String,
                 val subjects: Set[String], val message: String)
                 
object PostJsRepresentation {  
  implicit val postJsRepresentationFormat = Json.format[PostJsRepresentation]
}