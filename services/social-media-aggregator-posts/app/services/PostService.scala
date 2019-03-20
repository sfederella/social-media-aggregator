package services

import scala.concurrent.Future
import javax.inject._
import models.Result
import models.Post
import repositories.PostRepository
import scala.concurrent.ExecutionContext
import models.SearchRequest
import models.PostJsRepresentation

@Singleton
class PostService  @Inject() (postRepository: PostRepository)(implicit ec: ExecutionContext) {
	
  def savePosts(posts: Seq[Post]): Future[Result] = {
    postRepository.save(posts)
  }

  def searchPosts(searchRequest: SearchRequest): Future[Seq[PostJsRepresentation]] = {
	  postRepository.search(searchRequest) map { posts => 
	    posts map { post => 
	      post.toJsRepresentation	      
	    }
	  }
	}
  
}