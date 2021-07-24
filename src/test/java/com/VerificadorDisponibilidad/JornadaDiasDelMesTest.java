package main.test;

import java.util.ArrayList;
import java.util.List;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import main.dominio.Jornada;
import main.dominio.JornadaDiasDelMes;
import main.servicios.TurnoACubrir;

public class JornadaDiasDelMesTest {

	private Jornada jornadaDiasDelMes = new JornadaDiasDelMes();
	List<Integer> listaDiasDelMesExpected = new ArrayList<Integer>();

	@Before
	public void SetUp() {
		this.listaDiasDelMesExpected.add(1);
		this.listaDiasDelMesExpected.add(7);
		this.listaDiasDelMesExpected.add(14);
		this.listaDiasDelMesExpected.add(28);

		Boolean resultado = this.jornadaDiasDelMes.asignarDiasLaborales(listaDiasDelMesExpected);
		Assert.assertTrue(resultado);
	}

	@Test
	public void asignarDiasLaboralesTest() {
		List<?> listaDiasDelMesActual = jornadaDiasDelMes.obtenerListaDiasJornada();

		Assert.assertEquals(this.listaDiasDelMesExpected, listaDiasDelMesActual);
	}

	@Test
	public void asignarDiasLaboralesFueraRangoTest() {
		ArrayList<Integer> listaDiasDelMesExpected = new ArrayList<Integer>();
		Integer DIAS_FUERA_DE_RANGO = 32;
		listaDiasDelMesExpected.add(DIAS_FUERA_DE_RANGO);
		Boolean resultado = this.jornadaDiasDelMes.asignarDiasLaborales(listaDiasDelMesExpected);

		Assert.assertFalse(resultado);

	}

	@Test
	public void verificarDisponiblidadTest() {
		TurnoACubrir turnoAVerificar = new TurnoACubrir();
		turnoAVerificar.asignarDia("01/02/2019");

		Boolean resultado = this.jornadaDiasDelMes.verificarDisponiblidad(turnoAVerificar);
		Assert.assertTrue(resultado);
	}

	@Test
	public void verificarNoDisponiblidadTest() {
		TurnoACubrir turnoAVerificar = new TurnoACubrir();
		turnoAVerificar.asignarDia("05/02/2019");

		Boolean resultado = this.jornadaDiasDelMes.verificarDisponiblidad(turnoAVerificar);
		Assert.assertFalse(resultado);
	}
}
