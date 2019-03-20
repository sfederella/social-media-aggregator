import play.api.Logger
import actors.TwitterFeedTask
import play.api.inject.{SimpleModule, _}

class Module extends SimpleModule(bind[TwitterFeedTask].toSelf.eagerly())