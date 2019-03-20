package models

import play.api.libs.json._
import reactivemongo.bson.BSONObjectID
import reactivemongo.play.json._
import scala.collection.immutable.SortedSet

case class AppUser(val _id: Long, val username: String, val name: String, imageUrl: String,
                   var boards: SortedSet[Board] = SortedSet.empty[Board]) extends User {
  
  def addBoard(boardname: String) = {
    boards += Board(boardname)
  }
  
  def removeBoard(boardname: String) = {
	  boards = boards.filterNot(_.name.equalsIgnoreCase(boardname))
  }

  def editBoard(boardname: String, newBoardname: String) = {
	  boards.find(_.name.equalsIgnoreCase(boardname)).map(b => b.newName(newBoardname))
  }
  
}

object AppUser {
  implicit val appUserFormat = Json.using[Json.WithDefaultValues].format[AppUser]
}