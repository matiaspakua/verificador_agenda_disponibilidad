# VerificadorDisponibilidad
Proyecto JAVA para probar TDD con JUnit

## Consiga

### Condiciones para la resolución:
Modelar una solución Orientada a Objetos
Se recomienda desarrollarlo usando TDD
No es necesario implementar persistencia, ni interfaz de usuario. Alcanza con los tests necesarios para verificar que la funcionalidad está correctamente implementada.
No subir el código a un repositorio público, como GitHub. Podés enviarlo en un zip, o compartirnos un repositorio privado.
Asignaciones de horarios

### Parte 1
Últimamente estamos teniendo problemas de staffing en nuestras sucursales, nosotros siempre tuvimos como política: horarios flexibles a medida que la persona lo necesite.
Esto siempre lo logramos respetando las disponibilidades de nuestros empleados.

También con el pasar del tiempo nos dimos cuenta de que hay personas que funcionan mejor como un equipo y una vez que logramos armar equipo tomamos como política: equipo que funciona no se toca. Con lo cual los equipos se asignan en conjunto o no se asignan en absoluto. La disponibilidad de un equipo es la consecuencia de las disponibilidades de sus integrantes, es decir un equipo puede cubrir el turno de un día determinado (por ejemplo, el 02/01/2019) si y sólo si todos sus integrantes pueden.

El tema es que estamos creciendo, y lo que antes era simple porque éramos pocos y nos conocíamos, ahora ya no lo es y se cometen muchos errores a la hora de asignar los horarios. Ya perdimos varias personas clave para nosotros por esto y no puede seguir pasando así que necesitamos que nos ayudes a desarrollar un sistema que automatice la respuesta a la pregunta ¿Quienes estarían disponibles para cubrir la asignación?

Después de buscar varios ejemplos de disponibilidades notamos que muchas veces se caen en los siguientes patrones:
Fines de semana: Sábado y Domingo
Entre semana Lunes a Viernes
Día puntual (Martes, o Jueves)
Día del mes (1, 5 ó 10)

También, las disponibilidades suelen ser combinaciones de todas las situaciones anteriores, por ejemplo:
Margarita puede trabajar los Miércoles y los fines de semana, una disponibilidad combinada de día puntual y fin de semana
Gregorio y Esteban pueden trabajar solamente los fines de semana
Jazmín tiene disponibilidad de Lunes a Viernes, que se considera la disponibilidad default
Fanny y Benicio trabajan todos los jueves y los días 2, 3, 5, 7 y del 20 al 28, es decir una combinación de días puntuales y días del mes


### Parte 2
Nos dimos cuenta que hay algo que nadie avisa al principio pero que también se hace:
¡Excepciones por días puntuales! En un principio, estaban resignados a hacerlo manualmente ya que en todas las sucursales tienen un cuaderno azul con pedidos de horarios, pero viendo todo lo que se podía hacer ¡nos pidieron que lo agreguemos!
Básicamente nos comentaron de que las excepciones son para especificar que ahora en una fecha puntual se tiene una cierta disponibilidad o que no se la tiene.


Esto pasa mucho por ejemplo durante las fiestas, independientemente los días que caiga Jazmín (como su familia es del Chaltén) va a pasar las fiestas allá con lo cual no puede trabajar desde el 23 de Diciembre hasta el 2 de Enero (a veces se toma vacaciones, pero otras veces no lo hace y le acomodan los horarios para que pueda hacer ese viaje, esto es una atención que se tiene con Jazmín porque tiene esa disponibilidad tan amplia).


No nos pidieron incluir en el sistema el criterio por el cual estos pedidos de excepciones se aprueban o no, pero si quieren que sea posible que una persona solicite una excepción, esa excepción sea aprobada o rechazada y en el caso de estar aprobada se respete para la asignación.
Les dejamos ejemplos de pedidos que vimos en el cuaderno azul:
Gregorio: no puedo trabajar el Domingo 10/09 (es el bautismo de mi sobrino y soy el padrino)
Comentario del gerente de sucursal: OK
Esteban: si necesitás el Miércoles 06/09 puedo venir (no tengo clases)
No tiene comentario del gerente porque cuando amplían la disponibilidad no suele haber problemas
Todos (escrito por cada uno): el viernes 08/09 queremos hacer un asado en lo de Jazmín
Comentario del gerente de sucursal: Chicos no podemos cerrar la sucursal, hablémoslo
