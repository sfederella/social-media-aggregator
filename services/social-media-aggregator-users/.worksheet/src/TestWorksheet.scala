
object TestWorksheet {;import org.scalaide.worksheet.runtime.library.WorksheetSupport._; def main(args: Array[String])=$execute{;$skip(58); 
 	 	val ej = new Ejemplo(1,"Ejem");System.out.println("""ej  : Ejemplo = """ + $show(ej ));$skip(27); 
 	 	println(Ejemplo.hello)}
}

object Ejemplo {
	def hello = {
		"Hello"
	}
}

class Ejemplo(num: Integer, str: String) {
	def show(): String = {
		num + str
	}
}
