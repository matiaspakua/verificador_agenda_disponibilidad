package main.test;

import java.util.ArrayList;
import java.util.List;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import main.dominio.Jornada;
import main.dominio.JornadaDiasPuntuales;
import main.servicios.TurnoACubrir;

public class JornadaDiasPuntualesTest {

	ArrayList<String> diasPuntualesEsperados = new ArrayList<String>();
	private Jornada jornadaDiasPuntuales = new JornadaDiasPuntuales();
	private static final String LUNES = "lunes";
	private static final String MARTES = "martes";
	private static final String MIERCOLES = "miercoles";
	private static final String JUEVES = "jueves";
	private static final String VIERNES = "viernes";
	private static final String SABADO = "sabado";
	private static final String DOMINGO = "domingo";

	@Before
	public void SetUp() {
		this.diasPuntualesEsperados.add(LUNES);
		this.diasPuntualesEsperados.add(JUEVES);
		this.diasPuntualesEsperados.add(DOMINGO);
		Boolean resultado = this.jornadaDiasPuntuales.asignarDiasLaborales(this.diasPuntualesEsperados);

		Assert.assertTrue(resultado);
	}

	@Test
	public void asignarDiasLaboralesTest() {

		List<?> diasPuntualesActuales = this.jornadaDiasPuntuales.obtenerListaDiasJornada();

		Assert.assertEquals(diasPuntualesEsperados, diasPuntualesActuales);
	}

	@Test
	public void asignarDiasLaboralesConErrorTest() {

		ArrayList<String> diasPuntualesEsperados = new ArrayList<String>();
		diasPuntualesEsperados.add("LURNES");
		diasPuntualesEsperados.add(JUEVES);
		diasPuntualesEsperados.add(DOMINGO);

		Boolean resultado = this.jornadaDiasPuntuales.asignarDiasLaborales(diasPuntualesEsperados);

		Assert.assertFalse(resultado);
	}

	@Test
	public void verificarDisponiblidadTest() {
		TurnoACubrir turnoAVerificar = new TurnoACubrir();
		turnoAVerificar.asignarDia("04/02/2019"); // lunes

		this.jornadaDiasPuntuales.asignarDiasLaborales(this.diasPuntualesEsperados);

		Boolean resultado = this.jornadaDiasPuntuales.verificarDisponiblidad(turnoAVerificar);
		Assert.assertTrue(resultado);
	}

	@Test
	public void verificarNoDisponiblidadTest() {
		TurnoACubrir turnoAVerificar = new TurnoACubrir();
		turnoAVerificar.asignarDia("05/02/2019"); // martes

		this.jornadaDiasPuntuales.asignarDiasLaborales(this.diasPuntualesEsperados);

		Boolean resultado = this.jornadaDiasPuntuales.verificarDisponiblidad(turnoAVerificar);
		Assert.assertFalse(resultado);
	}
}
