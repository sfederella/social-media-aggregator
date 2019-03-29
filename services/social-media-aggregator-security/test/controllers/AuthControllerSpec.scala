package controllers

import org.junit.runner.RunWith
import org.specs2.runner.JUnitRunner
import scala.concurrent.Future
import play.api.mvc._
import play.api.test._
import play.api.inject.guice.GuiceApplicationBuilder
import org.specs2.mock.Mockito

@RunWith(classOf[JUnitRunner])
class AuthControllerSpec extends PlaySpecification with Results {
  
  val authController = new GuiceApplicationBuilder()
        .build()
        .injector
        .instanceOf[AuthController]
  
  "AuthController #isAuthenticated" should {
    
    "be forbidden" in {
      val request = FakeRequest()
      val result: Future[Result] = authController.isAuthenticated.apply(request)
      status(result) must be equalTo FORBIDDEN
    }
    
    "be unauthorized" in {
      val request = FakeRequest().withSession(
          ("token", "fakeToken"),
          ("secret", "fakeSecret")
      )
			val result: Future[Result] = authController.isAuthenticated.apply(request)
			status(result) must be equalTo UNAUTHORIZED
    }
    
    "be valid" in {
      val request = FakeRequest().withSession(
          ("token", "469020897-3esVEjnDsxI2opZXDtndn1IPrghtc706FevpJawC"),
          ("secret", "R6tyrK5doP1JUB0Adxv8SyLEMpUj42VR794ENMdZSWLJf")
      )
			val result: Future[Result] = authController.isAuthenticated.apply(request)
			status(result) must be equalTo OK
    }
    
  }
  
}