package models

import play.api.libs.json._

case class TwitterUser(val username: String, val name: String, val imageUrl: String) extends User with Ordered [TwitterUser] {
  def compare (that: TwitterUser) = {
    if (this.username == that.username)
      0
    else if (this.username > that.username)
      1
    else
      -1
  }
}

object TwitterUser {
  implicit val twitterUserFormat = Json.format[TwitterUser]
}