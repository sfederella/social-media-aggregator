package services

import models.User
import repositories.UserRepository
import scala.concurrent.Future
import javax.inject._
import models.AppUser
import models.Board
import scala.concurrent.ExecutionContext
import models.TwitterUser
import models.Result

@Singleton
class BoardService  @Inject() (userRepository: UserRepository)(implicit ec: ExecutionContext) {

	def listAllBoards(username: String): Future[Option[Set[Board]]] = {
	  userRepository.findByUsername(username).map(_.map(_.boards))
  }

	def findBoard(username: String, boardname: String): Future[Option[Board]] = {
		listAllBoards(username).map(_.flatMap(_.find(_.name.equalsIgnoreCase(boardname))))
	}

	def addBoard(username: String, boardname: String): Future[Result] = {
		userRepository.findByUsername(username).flatMap(_.map(user => {
		  user.addBoard(boardname)
	    userRepository.save(user)
		}).get)
	}
	
	def deleteBoard(username: String, boardname: String): Future[Result] = {
		userRepository.findByUsername(username).flatMap(_.map(user => {
		  user.removeBoard(boardname)
		  userRepository.save(user)
		}).get)
	}
	
	def editBoard(username: String, boardname: String, newBoardname: String): Future[Result] = {
		userRepository.findByUsername(username).flatMap(_.map(user => {
	    user.editBoard(boardname,newBoardname)
	    userRepository.save(user)
		}).get)
	}
  
	def followUser(username: String, boardname: String, twitterUser: TwitterUser): Future[Result] = {
	  userRepository.findByUsername(username).flatMap(_.map(user => {
		   val board = user.boards.find(_.name.equalsIgnoreCase(boardname)).get
		   board.followUser(twitterUser)
		   userRepository.save(user)
		}).get)
	}
	
	def unfollowUser(username: String, boardname: String, twitterUsername: String): Future[Result] = {
		userRepository.findByUsername(username).flatMap(_.map(user => {
			val board = user.boards.find(_.name.equalsIgnoreCase(boardname)).get
			board.unfollowUser(twitterUsername)
			userRepository.save(user)
		}).get)
	}
	
	def followSubject(username: String, boardname: String, subject: String): Future[Result] = {
		userRepository.findByUsername(username).flatMap(_.map(user => {
			val board = user.boards.find(_.name.equalsIgnoreCase(boardname)).get
			board.followSubject(subject)
			userRepository.save(user)
		}).get)
	}
	
	def unfollowSubject(username: String, boardname: String, subject: String): Future[Result] = {
		userRepository.findByUsername(username).flatMap(_.map(user => {
			val board = user.boards.find(_.name.equalsIgnoreCase(boardname)).get
			board.unfollowSubject(subject)
			userRepository.save(user)
		}).get)
	}
	
}