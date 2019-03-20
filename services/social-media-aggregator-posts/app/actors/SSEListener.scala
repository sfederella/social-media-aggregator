package actors

import play.api.libs.json.JsValue
import play.api.libs.iteratee.Concurrent
import akka.actor.Actor

class SSEListener extends Actor {
  var out: Option[Concurrent.Channel[JsValue]] = None
  
  def receive = {
    case Listen(out)  => this.out = Some(out)
    case json: JsValue => {
      this.out.map(_.push(json))
    }
  }
}

case class Listen(out: Concurrent.Channel[JsValue])