package main.test;

import java.text.Collator;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import main.dominio.Autorizacion;
import main.dominio.Empleado;
import main.dominio.Equipo;
import main.dominio.Jornada;
import main.dominio.JornadaDiaDelMesExcepcional;
import main.dominio.JornadaDiasDelMes;
import main.dominio.JornadaDiasPuntuales;
import main.servicios.ServicioVerificadorDisponibilidad;
import main.servicios.TurnoACubrir;

public class ServicioVerificadorDisponibilidadTest {

	private ServicioVerificadorDisponibilidad servicioDisponiblidad = new ServicioVerificadorDisponibilidad();
	private Map<String, Empleado> listadoEmpleados = new HashMap<String, Empleado>();

	@Before
	public void SetUp() throws CloneNotSupportedException {

		// se instancian empleados y cada uno con su jornada particular
		// Margarita puede trabajar los Miércoles y los fines de semana, una
		// disponibilidad
		// combinada de día puntual y fin de semana
		Empleado margarita = new Empleado("margarita");
		List<Jornada> listaJornadasMargarita = new ArrayList<Jornada>();
		Jornada jornadaDiasPuntualesMargarita = new JornadaDiasPuntuales();
		List<String> diasLaboralesDiasPuntualesMargarita = new ArrayList<>();
		diasLaboralesDiasPuntualesMargarita.add(JornadaDiasPuntuales.MIERCOLES);
		diasLaboralesDiasPuntualesMargarita.add(JornadaDiasPuntuales.SABADO);
		diasLaboralesDiasPuntualesMargarita.add(JornadaDiasPuntuales.DOMINGO);
		jornadaDiasPuntualesMargarita.asignarDiasLaborales(diasLaboralesDiasPuntualesMargarita);
		listaJornadasMargarita.add(jornadaDiasPuntualesMargarita);
		margarita.asignarJornadaLaboral(listaJornadasMargarita);

		// Gregorio y Esteban pueden trabajar solamente los fines de semana
		Empleado gregorio = new Empleado("gregorio");
		Empleado esteban = new Empleado("esteban");
		List<Jornada> listaJornadasGregorioEsteban = new ArrayList<Jornada>();
		Jornada jornadaDiasPuntualesGregorioEsteban = new JornadaDiasPuntuales();
		List<String> diasLaboralesDiasPuntualesGregorioEsteban = new ArrayList<>();
		diasLaboralesDiasPuntualesGregorioEsteban.add(JornadaDiasPuntuales.SABADO);
		diasLaboralesDiasPuntualesGregorioEsteban.add(JornadaDiasPuntuales.DOMINGO);
		jornadaDiasPuntualesGregorioEsteban.asignarDiasLaborales(diasLaboralesDiasPuntualesGregorioEsteban);
		listaJornadasGregorioEsteban.add(jornadaDiasPuntualesGregorioEsteban);
		gregorio.asignarJornadaLaboral(listaJornadasGregorioEsteban);
		esteban.asignarJornadaLaboral(listaJornadasGregorioEsteban);

		// Jazmín tiene disponibilidad de Lunes a Viernes, que se considera la
		// disponibilidad default
		Empleado jazmin = new Empleado("jazmin");
		List<Jornada> listaJornadasJazmin = new ArrayList<Jornada>();
		Jornada jornadaDiasPuntualesJazmin = new JornadaDiasPuntuales();
		List<String> diasLaboralesDiasPuntualesJazmin = new ArrayList<>();
		diasLaboralesDiasPuntualesJazmin.add(JornadaDiasPuntuales.LUNES);
		diasLaboralesDiasPuntualesJazmin.add(JornadaDiasPuntuales.MARTES);
		diasLaboralesDiasPuntualesJazmin.add(JornadaDiasPuntuales.MIERCOLES);
		diasLaboralesDiasPuntualesJazmin.add(JornadaDiasPuntuales.JUEVES);
		diasLaboralesDiasPuntualesJazmin.add(JornadaDiasPuntuales.VIERNES);
		jornadaDiasPuntualesJazmin.asignarDiasLaborales(diasLaboralesDiasPuntualesJazmin);
		listaJornadasJazmin.add(jornadaDiasPuntualesJazmin);
		jazmin.asignarJornadaLaboral(listaJornadasJazmin);

		// Fanny y Benicio trabajan todos los jueves y los días 2, 3, 5, 7 y
		// del 20 al 28, es decir una combinación de días puntuales y días del mes
		Empleado fanny = new Empleado("fanny");
		Empleado benicio = new Empleado("benicio");

		// primero agregamos la jornada de día puntual: lunes, martes, etc.
		List<Jornada> jornadasFannyBenicio = new ArrayList<Jornada>();

		Jornada jornadaDiasPuntualesFannyBenicio = new JornadaDiasPuntuales();

		ArrayList<Object> diasLaboralesDiasPuntualesFannyBenicio = new ArrayList<>();
		diasLaboralesDiasPuntualesFannyBenicio.add(JornadaDiasPuntuales.JUEVES);

		jornadaDiasPuntualesFannyBenicio.asignarDiasLaborales(diasLaboralesDiasPuntualesFannyBenicio);

		jornadasFannyBenicio.add(jornadaDiasPuntualesFannyBenicio);

		// ahora agragamos la jornada de dias del mes 1,2,3, etc.
		Jornada jornadaDiasDelMesFannyBenicio = new JornadaDiasDelMes();

		List<Integer> diasLaboralesDiasDelMesFannyBenicio = new ArrayList<>();
		diasLaboralesDiasDelMesFannyBenicio.add(2);
		diasLaboralesDiasDelMesFannyBenicio.add(3);
		diasLaboralesDiasDelMesFannyBenicio.add(5);
		diasLaboralesDiasDelMesFannyBenicio.add(7);
		List<Integer> listaDiasRango20a28 = new ArrayList<Integer>();
		for (int i = 20; i < 29; i++) {
			listaDiasRango20a28.add(i);
		}
		diasLaboralesDiasDelMesFannyBenicio.addAll(listaDiasRango20a28);

		jornadaDiasDelMesFannyBenicio.asignarDiasLaborales(diasLaboralesDiasDelMesFannyBenicio);

		jornadasFannyBenicio.add(jornadaDiasDelMesFannyBenicio);

		fanny.asignarJornadaLaboral(jornadasFannyBenicio);
		benicio.asignarJornadaLaboral(jornadasFannyBenicio);

		// se instancia un equipo
		Equipo equipo = new Equipo("ALFA");
		equipo.agregarNuevoIntegrante(jazmin);
		equipo.agregarNuevoIntegrante(fanny);
		equipo.agregarNuevoIntegrante(benicio);

		jazmin.setEquipoDeTrabajo(equipo);
		fanny.setEquipoDeTrabajo(equipo);
		benicio.setEquipoDeTrabajo(equipo);

		this.listadoEmpleados.put("margarita", margarita);
		this.listadoEmpleados.put("gregorio", gregorio);
		this.listadoEmpleados.put("esteban", esteban);
		this.listadoEmpleados.put("fanny", fanny);
		this.listadoEmpleados.put("benicio", benicio);
		this.listadoEmpleados.put("jazmin", jazmin);

		this.servicioDisponiblidad.agregarListaEmpleados(this.listadoEmpleados);
	}

	@Test
	public void TC01_buscarDisponibilidadParaCubrirAsignacion_02_02_2019_Test() {

		List<String> empleadosDisponiblesExpected = new ArrayList<String>();
		empleadosDisponiblesExpected.add("margarita");
		empleadosDisponiblesExpected.add("jazmin");
		empleadosDisponiblesExpected.add("fanny");
		empleadosDisponiblesExpected.add("benicio");

		TurnoACubrir asignacionACubrir = new TurnoACubrir();
		asignacionACubrir.asignarDescripcion("Ejemplo de asignación a cubrir.");
		asignacionACubrir.asignarDia("02/01/2019"); // miercoles

		List<String> empleadosDisponiblesActual = this.servicioDisponiblidad
				.buscarDisponibilidadParaCubrirAsignacion(asignacionACubrir);

		java.util.Collections.sort(empleadosDisponiblesExpected, Collator.getInstance());
		java.util.Collections.sort(empleadosDisponiblesActual, Collator.getInstance());

		Assert.assertEquals(empleadosDisponiblesExpected, empleadosDisponiblesActual);
	}

	@Test
	public void TC02_buscarDisponibilidadParaCubrirAsignacion_18_02_2019_Test() {

		// sin empleados disponibles.
		List<String> empleadosDisponiblesExpected = new ArrayList<String>();

		TurnoACubrir asignacionACubrir = new TurnoACubrir();
		asignacionACubrir.asignarDescripcion("Ejemplo de asignación a cubrir.");
		asignacionACubrir.asignarDia("18/01/2019"); // viernes

		List<String> empleadosDisponiblesActual = this.servicioDisponiblidad
				.buscarDisponibilidadParaCubrirAsignacion(asignacionACubrir);

		Assert.assertEquals(empleadosDisponiblesExpected, empleadosDisponiblesActual);
	}

	@Test
	public void TC03_buscarDisponibilidadParaCubrirAsignacion_27_02_2019_Test() {

		List<String> empleadosDisponiblesExpected = new ArrayList<String>();
		empleadosDisponiblesExpected.add("margarita");
		empleadosDisponiblesExpected.add("gregorio");
		empleadosDisponiblesExpected.add("esteban");

		TurnoACubrir asignacionACubrir = new TurnoACubrir();
		asignacionACubrir.asignarDescripcion("Ejemplo de asignación a cubrir.");
		asignacionACubrir.asignarDia("27/01/2019"); // Domingo

		List<String> empleadosDisponiblesActual = this.servicioDisponiblidad
				.buscarDisponibilidadParaCubrirAsignacion(asignacionACubrir);

		java.util.Collections.sort(empleadosDisponiblesExpected, Collator.getInstance());
		java.util.Collections.sort(empleadosDisponiblesActual, Collator.getInstance());

		Assert.assertEquals(empleadosDisponiblesExpected, empleadosDisponiblesActual);
	}

	@Test
	public void TC04_buscarDisponibilidadParaCubrirAsignacion_06_09_2021_Test() throws CloneNotSupportedException {
		boolean seTrabaja = true;
		List<String> empleadosDisponiblesExpected = new ArrayList<String>();
		empleadosDisponiblesExpected.add("esteban");

		TurnoACubrir nuevoTurnoACubrir = new TurnoACubrir();
		nuevoTurnoACubrir.asignarDescripcion("otra vez, un turno para cubrir turno en reemplazo de Pepe");
		nuevoTurnoACubrir.asignarDia("06/09/2019");

		Empleado esteban = this.listadoEmpleados.get("esteban");
		// ahora agragamos la jornada de dias del mes 06/09
		JornadaDiaDelMesExcepcional jornadaDiasDelMesDisponible = new JornadaDiaDelMesExcepcional();
		jornadaDiasDelMesDisponible.asignarAutorizacion(
				new Autorizacion(" si necesitás el Miércoles 06/09 puedo venir (no tengo clases)", seTrabaja));

		List<Integer> diasLaboralesDiasDelMesEsteban = new ArrayList<>();
		diasLaboralesDiasDelMesEsteban.add(06);
		jornadaDiasDelMesDisponible.asignarDiasLaborales(diasLaboralesDiasDelMesEsteban);
		List<Jornada> nuevaJornadaEspecial = new ArrayList<Jornada>();
		nuevaJornadaEspecial.add(jornadaDiasDelMesDisponible);
		esteban.asignarJornadaLaboral(nuevaJornadaEspecial);

		List<String> empleadosDisponiblesActual = this.servicioDisponiblidad
				.buscarDisponibilidadParaCubrirAsignacion(nuevoTurnoACubrir);

		java.util.Collections.sort(empleadosDisponiblesExpected, Collator.getInstance());
		java.util.Collections.sort(empleadosDisponiblesActual, Collator.getInstance());

		Assert.assertEquals(empleadosDisponiblesExpected, empleadosDisponiblesActual);
	}

	@Test
	public void TC05_buscarDisponibilidadParaCubrirAsignacion_15_09_2021_Test() throws CloneNotSupportedException {
		boolean noSeTrabaja = false;
		List<String> empleadosDisponiblesExpected = new ArrayList<String>();
		empleadosDisponiblesExpected.add("margarita");
		empleadosDisponiblesExpected.add("esteban");

		TurnoACubrir nuevoTurnoACubrir = new TurnoACubrir();
		nuevoTurnoACubrir.asignarDescripcion("otra vez, un turno para cubrir turno en reemplazo de Pepe");
		nuevoTurnoACubrir.asignarDia("15/09/2019");

		Empleado gregorio = this.listadoEmpleados.get("gregorio");
		// ahora agragamos la jornada de dias del mes 15/09
		JornadaDiaDelMesExcepcional jornadaDiasDelMesExcepcional = new JornadaDiaDelMesExcepcional();
		jornadaDiasDelMesExcepcional.asignarAutorizacion(new Autorizacion(
				"no puedo trabajar el Domingo 15/09 (es el bautismo de mi sobrino y soy el padrino)", noSeTrabaja));

		List<Jornada> nuevaJornadaEspecial = new ArrayList<Jornada>();

		List<Integer> diasLaboralesDiasDelMesGregorio = new ArrayList<>();
		diasLaboralesDiasDelMesGregorio.add(15);

		jornadaDiasDelMesExcepcional.asignarDiasLaborales(diasLaboralesDiasDelMesGregorio);
		nuevaJornadaEspecial.add(jornadaDiasDelMesExcepcional);
		gregorio.asignarJornadaLaboral(nuevaJornadaEspecial);

		List<String> empleadosDisponiblesActual = this.servicioDisponiblidad
				.buscarDisponibilidadParaCubrirAsignacion(nuevoTurnoACubrir);

		java.util.Collections.sort(empleadosDisponiblesExpected, Collator.getInstance());
		java.util.Collections.sort(empleadosDisponiblesActual, Collator.getInstance());

		Assert.assertEquals(empleadosDisponiblesExpected, empleadosDisponiblesActual);
	}

	@Test
	public void TC06_buscarDisponibilidadParaCubrirAsignacion_08_09_2021_Test() throws CloneNotSupportedException {
		boolean seTrabaja = true;
		List<String> empleadosDisponiblesExpected = new ArrayList<String>();
		empleadosDisponiblesExpected.add("margarita");
		empleadosDisponiblesExpected.add("gregorio");
		empleadosDisponiblesExpected.add("esteban");

		TurnoACubrir nuevoTurnoACubrir = new TurnoACubrir();
		nuevoTurnoACubrir.asignarDescripcion("otra vez, un turno para cubrir turno en reemplazo de Pepe");
		nuevoTurnoACubrir.asignarDia("08/09/2019");

		// ahora agragamos la jornada de dias del mes 08/09
		JornadaDiaDelMesExcepcional jornadaDiasDelMesDisponible = new JornadaDiaDelMesExcepcional();
		jornadaDiasDelMesDisponible.asignarAutorizacion(new Autorizacion(
				"Asado. Comentario del gerente de sucursal: Chicos no podemos cerrar la sucursal, hablémoslo",
				seTrabaja));

		List<Integer> diasLaboralesDiasDelMes = new ArrayList<>();
		diasLaboralesDiasDelMes.add(8);
		jornadaDiasDelMesDisponible.asignarDiasLaborales(diasLaboralesDiasDelMes);
		List<Jornada> nuevaJornadaEspecial = new ArrayList<Jornada>();
		nuevaJornadaEspecial.add(jornadaDiasDelMesDisponible);

		// los unicos 3 que necesitan la autorizacion para esos dìas laborales.
		Empleado margarita = this.listadoEmpleados.get("margarita");
		margarita.asignarJornadaLaboral(nuevaJornadaEspecial);
		Empleado gregorio = this.listadoEmpleados.get("gregorio");
		gregorio.asignarJornadaLaboral(nuevaJornadaEspecial);
		Empleado esteban = this.listadoEmpleados.get("esteban");
		esteban.asignarJornadaLaboral(nuevaJornadaEspecial);

		List<String> empleadosDisponiblesActual = this.servicioDisponiblidad
				.buscarDisponibilidadParaCubrirAsignacion(nuevoTurnoACubrir);

		java.util.Collections.sort(empleadosDisponiblesExpected, Collator.getInstance());
		java.util.Collections.sort(empleadosDisponiblesActual, Collator.getInstance());

		Assert.assertEquals(empleadosDisponiblesExpected, empleadosDisponiblesActual);
	}
}
