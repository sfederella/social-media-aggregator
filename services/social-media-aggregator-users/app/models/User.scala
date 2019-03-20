package models

import play.api.libs.json._

trait User {
  def username: String
  def name: String
  def imageUrl: String
  
  override def equals(that: Any): Boolean =
  that match {
    case that: User => this.hashCode == that.hashCode
    case _ => false
  }
  
  override def hashCode: Int = {
    return this.username.hashCode()
  }
} 
