package main.test;

import java.util.ArrayList;
import java.util.List;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import main.dominio.Empleado;
import main.dominio.Equipo;
import main.dominio.Jornada;
import main.dominio.JornadaDiasDelMes;
import main.dominio.JornadaDiasPuntuales;

public class EmpleadoTest {

	private Empleado margarita;

	@Before
	public void SetUp() {
		this.margarita = new Empleado("margarita");
		this.margarita.setEquipoDeTrabajo(new Equipo("ALFA"));
	}

	@Test
	public void creacionEmpleadoTest() {
		String expextedResult = "margarita";
		Assert.assertEquals(this.margarita.getNombre(), expextedResult);
	}

	@Test
	public void asignarJornadaLaboralDiasPuntualesTest() throws CloneNotSupportedException {
		/*
		 * Margarita puede trabajar los Miércoles y los fines de semana, una
		 * disponibilidad combinada de día puntual y fin de semana
		 */
		List<Jornada> listaJornadas = new ArrayList<>();
		Jornada jornadaDiasPuntualesMargarita = new JornadaDiasPuntuales();

		List<String> diasLaborales = new ArrayList<>();
		diasLaborales.add(JornadaDiasPuntuales.MIERCOLES);
		diasLaborales.add(JornadaDiasPuntuales.SABADO);
		diasLaborales.add(JornadaDiasPuntuales.DOMINGO);

		jornadaDiasPuntualesMargarita.asignarDiasLaborales(diasLaborales);
		listaJornadas.add(jornadaDiasPuntualesMargarita);

		Boolean resultado = this.margarita.asignarJornadaLaboral(listaJornadas);

		Assert.assertTrue(resultado);
	}

	@Test
	public void asignarJornadaLaboralDiasDelMesTest() throws CloneNotSupportedException {
		List<Jornada> listaJornadas = new ArrayList<>();
		Jornada jornadaDiasPuntualesMargarita = new JornadaDiasDelMes();

		List<Integer> diasLaborales = new ArrayList<>();
		diasLaborales.add(1);
		diasLaborales.add(7);
		diasLaborales.add(14);
		diasLaborales.add(22);
		diasLaborales.add(30);

		jornadaDiasPuntualesMargarita.asignarDiasLaborales(diasLaborales);
		listaJornadas.add(jornadaDiasPuntualesMargarita);

		boolean resultado = this.margarita.asignarJornadaLaboral(listaJornadas);

		Assert.assertTrue(resultado);
	}

	@Test
	public void consultarJornadaLaboralDiasPuntualesTest() throws CloneNotSupportedException {
		List<String> jornadaDiasPuntualesMargarita = new ArrayList<>();
		List<Jornada> jornadaLaboralMargarita = new ArrayList<>();
		Jornada jornadaDiasPuntuales = new JornadaDiasPuntuales();

		jornadaDiasPuntualesMargarita.add(JornadaDiasPuntuales.MIERCOLES);
		jornadaDiasPuntualesMargarita.add(JornadaDiasPuntuales.SABADO);
		jornadaDiasPuntualesMargarita.add(JornadaDiasPuntuales.DOMINGO);

		jornadaDiasPuntuales.asignarDiasLaborales(jornadaDiasPuntualesMargarita);

		jornadaLaboralMargarita.add(jornadaDiasPuntuales);

		boolean resultado = this.margarita.asignarJornadaLaboral(jornadaLaboralMargarita);

		Assert.assertTrue(resultado);

		List<Jornada> jornadaMargaritaActual = this.margarita.consultarJornadaLaboral();

		for (Jornada jornada : jornadaMargaritaActual) {
			Assert.assertEquals(jornada.obtenerListaDiasJornada(), jornadaDiasPuntualesMargarita);
		}

		// Assert.assertEquals(jornadaLaboralMargarita, jornadaMargaritaActual);
	}

	@Test
	public void consultarJornadaLaboralDiasDelMesTest() throws CloneNotSupportedException {
		List<Jornada> listaJornadasExpected = new ArrayList<>();
		Jornada jornadaDiasDelMesMargarita = new JornadaDiasDelMes();

		List<Integer> diasLaborales = new ArrayList<>();
		diasLaborales.add(1);
		diasLaborales.add(7);
		diasLaborales.add(14);
		diasLaborales.add(22);
		diasLaborales.add(30);

		jornadaDiasDelMesMargarita.asignarDiasLaborales(diasLaborales);
		listaJornadasExpected.add(jornadaDiasDelMesMargarita);

		Boolean resultado = this.margarita.asignarJornadaLaboral(listaJornadasExpected);

		Assert.assertTrue(resultado);

		List<Jornada> listaJornadasActual = this.margarita.consultarJornadaLaboral();

		for (Jornada jornada : listaJornadasActual) {
			Assert.assertEquals(jornada.obtenerListaDiasJornada(), diasLaborales);
		}
	}

	@Test
	public void consultarJornadaCombinadaTest() throws CloneNotSupportedException {
		List<Jornada> listaJornadasExpected = new ArrayList<>();
		Jornada jornadaDiasPuntualesMargarita = new JornadaDiasPuntuales();
		List<String> diasLaboralesDiasPuntuales = new ArrayList<>();
		diasLaboralesDiasPuntuales.add(JornadaDiasPuntuales.MIERCOLES);
		diasLaboralesDiasPuntuales.add(JornadaDiasPuntuales.SABADO);
		diasLaboralesDiasPuntuales.add(JornadaDiasPuntuales.DOMINGO);

		jornadaDiasPuntualesMargarita.asignarDiasLaborales(diasLaboralesDiasPuntuales);
		listaJornadasExpected.add(jornadaDiasPuntualesMargarita);

		Jornada jornadaDiasDelMesMargarita = new JornadaDiasDelMes();

		List<Integer> diasLaboralesDiasDelMes = new ArrayList<>();
		diasLaboralesDiasDelMes.add(1);
		diasLaboralesDiasDelMes.add(7);
		diasLaboralesDiasDelMes.add(14);
		diasLaboralesDiasDelMes.add(22);
		diasLaboralesDiasDelMes.add(30);

		jornadaDiasDelMesMargarita.asignarDiasLaborales(diasLaboralesDiasDelMes);
		listaJornadasExpected.add(jornadaDiasDelMesMargarita);

		this.margarita.asignarJornadaLaboral(listaJornadasExpected);

		List<Jornada> listaJornadaActual = this.margarita.consultarJornadaLaboral();

		for (Jornada jornada : listaJornadaActual) {
			if (jornada.obtenerListaDiasJornada() instanceof JornadaDiasDelMes) {
				Assert.assertEquals(jornada.obtenerListaDiasJornada(), diasLaboralesDiasDelMes);
			}
			if (jornada.obtenerListaDiasJornada() instanceof JornadaDiasPuntuales) {
				Assert.assertEquals(jornada.obtenerListaDiasJornada(), diasLaboralesDiasPuntuales);
			}
		}

	}

	@Test
	public void consultarEquipoDeTrabajoTest() {
		Equipo equipoDeTrabajo = this.margarita.getEquipoDeTrabajo();
		Assert.assertEquals("ALFA", equipoDeTrabajo.getNombreEquipo());
	}

}
