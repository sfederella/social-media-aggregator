package models

import play.api.libs.json.Json
import scala.collection.immutable.SortedSet

case class Board(var name: String, 
                 var userFollowings: SortedSet[TwitterUser] = SortedSet.empty[TwitterUser],
                 var subjectFollowings: SortedSet[String] = SortedSet[String]()) extends Ordered [Board] {
  
  def compare (that: Board) = {
    if (this.name == that.name)
      0
    else if (this.name > that.name)
      1
    else
      -1
  }
  
  def newName(newName: String) = {
    name = newName
  }
  
  def followUser(user: TwitterUser) = {
    userFollowings += user
  }

  def followSubject(subject: String) = {
	  subjectFollowings += subject
  }

  def unfollowUser(username: String) = {
	  userFollowings = userFollowings.filterNot(_.username.equalsIgnoreCase(username))
  }
  
  def unfollowSubject(subject: String) = {
	  subjectFollowings = subjectFollowings.filterNot(_.equalsIgnoreCase(subject))
  }
  
  override def equals(that: Any): Boolean =
  that match {
    case that: Board => this.hashCode == that.hashCode
    case _ => false
  }
  
  override def hashCode: Int = {
    return this.name.hashCode()
  }
  
}

object Board {
  implicit val boardFormat = Json.format[Board]
}