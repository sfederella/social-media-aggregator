package models

import play.api.libs.json._

case class Result (val status: String, val message: String = "")

object Result {  
	implicit val resultFormat = Json.format[Result]

	def success = Result("ok")	
	def success(message: String) = Result("ok",message)	
	
	def error = Result("error")
  def error(message: String) = Result("error",message)
}
