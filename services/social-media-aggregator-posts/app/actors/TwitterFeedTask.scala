package actors

import akka.actor.ActorSystem
import scala.concurrent.ExecutionContext
import scala.concurrent.duration._
import javax.inject.Inject
import javax.inject.Singleton
import play.api.Logger
import controllers.PostController
import play.api.libs.json.Json
import com.danielasfregola.twitter4s.TwitterRestClient
import services.PostService
import com.danielasfregola.twitter4s.entities.enums.ResultType
import scala.concurrent.Future
import services.FollowableService

@Singleton
class TwitterFeedTask @Inject()(actorSystem: ActorSystem, postController: PostController, 
                                followableService: FollowableService, postService: PostService) (implicit ec: ExecutionContext) {

  actorSystem.scheduler.schedule(initialDelay = 1.minutes, interval = 1.minutes) {
    process()
  }

  def process(): Unit = {
    Logger("application").debug("processing")
    val restClient = TwitterRestClient()
    followableService.listAllFollowables foreach { followableSeq =>  
      followableSeq foreach { followable =>
        followable.search(restClient) foreach { postSeq =>
          postService.savePosts(postSeq)
          postController.sseListener ! Json.toJson(postSeq)
          postSeq.lastOption foreach { post =>
        	  followable.setLastId(post._id.toLong)
        	  followableService.saveFollowable(followable)
          }
        }
      }
    }
  }
  
}