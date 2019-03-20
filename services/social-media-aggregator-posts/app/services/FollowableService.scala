package services

import scala.concurrent.ExecutionContext
import scala.concurrent.Future

import javax.inject.Inject
import javax.inject.Singleton
import models.Followable
import models.Result
import repositories.FollowableRepository

@Singleton
class FollowableService  @Inject() (followableRepository: FollowableRepository)(implicit ec: ExecutionContext) {
	
	def listAllFollowables: Future[Seq[Followable]] = {
		followableRepository.listAll
  }

  def addFollowable(followable: Followable): Future[Result] = {
		followableRepository.add(followable)
  }
  
  def saveFollowable(followable: Followable): Future[Result] = {
    followableRepository.save(followable)
  }
  
}