package services

import models.User
import repositories.UserRepository
import scala.concurrent.Future
import javax.inject._
import models.AppUser
import models.Result

@Singleton
class UserService  @Inject() (userRepository: UserRepository) {

  def saveUser(user: AppUser): Future[Result] = {
    userRepository.save(user)
  }
  
  def listAllUsers: Future[List[AppUser]] = {
    userRepository.listAll
  }
  
  def findUser(username: String): Future[Option[AppUser]] = {
		userRepository.findByUsername(username)
  }
  
}