package models
import play.api.libs.json._
import scala.concurrent.Future
import com.danielasfregola.twitter4s.TwitterRestClient
import scala.concurrent.ExecutionContext

trait Followable {
  def search(restClient: TwitterRestClient)(implicit ec: ExecutionContext): Future[Seq[Post]]
  def setLastId(lastId: Long): Unit
  def selector: JsObject
}

object Followable {
	implicit val followableWrites = new OWrites[Followable] {
	  def writes(followable: Followable): JsObject = {
    	followable match {
        case User(username, lastId) =>
          Json.obj(
      		  "type" -> "u",
    				"username" -> username,
    				"lastId" -> lastId
    			)
        case Subject(description, lastId) =>
          Json.obj(
    				"type" -> "s",
    				"description" -> description,
    				"lastId" -> lastId
    			)
      }
    }
	  
  }
	
	implicit val followableReads = new Reads[Followable] {
		def reads(json: JsValue): JsResult[Followable] = {
			val followableType = 	(json \ "type").as[String]
		  val followable = followableType match {
			  case "u" =>
			    User(
		        (json \ "username").as[String],
        		(json \ "lastId").asOpt[Long]
		      )
			  case "s" =>
			    Subject(
		        (json \ "description").as[String],
		        (json \ "lastId").asOpt[Long]
	        )
			}
			JsSuccess(followable)
		}
	}
	
	implicit val followableFormat: OFormat[Followable] = OFormat(followableReads, followableWrites)
}