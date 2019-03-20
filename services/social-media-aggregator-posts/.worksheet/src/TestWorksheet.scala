
object TestWorksheet {;import org.scalaide.worksheet.runtime.library.WorksheetSupport._; def main(args: Array[String])=$execute{;$skip(103); 
 	 	val tweet = "¡Hola, Twitter! #miprimerTweet blablablalba #nsnc #buenmartes";System.out.println("""tweet  : String = """ + $show(tweet ));$skip(162); 
 	 	
 	 	def getSubjects(message: String): Set[String] = {
 	 		val pattern = "#(\\w*)".r
 	 		pattern.findAllIn(message).toSet[String].map { s => s.tail }
 	 	};System.out.println("""getSubjects: (message: String)Set[String]""");$skip(28); val res$0 = 
 	 	
 	 	getSubjects(tweet);System.out.println("""res0: Set[String] = """ + $show(res$0))}
}
