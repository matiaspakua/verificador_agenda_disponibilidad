package main.test;

import java.util.ArrayList;
import java.util.List;

import org.junit.Assert;
import org.junit.Before;
import org.junit.jupiter.api.Test;

import main.dominio.Autorizacion;
import main.dominio.JornadaDiaDelMesExcepcional;
import main.servicios.TurnoACubrir;

public class JornadaDiaDelMesExcepcionalTest {

	boolean seTrabaja = true;
	boolean noSeTRabaja = false;
	private JornadaDiaDelMesExcepcional jornadaExcepcional = new JornadaDiaDelMesExcepcional();
	private Autorizacion autorizacionJornadaAutorizada = new Autorizacion("Aprobada para ir de viaje.", noSeTRabaja);
	private Autorizacion autorizacionJornadaNOAutorizada = new Autorizacion("No aprobada, no se puede faltar.",
			seTrabaja);
	List<Integer> listaDiasDelMesExpected = new ArrayList<Integer>();

	@Before
	public void SetUp() {
		this.listaDiasDelMesExpected.add(6);
		this.jornadaExcepcional.asignarDiasLaborales(this.listaDiasDelMesExpected);
	}

	@Test
	public void testAsignarDiasLaborales() {
		this.listaDiasDelMesExpected.add(2);
		Boolean resultado = this.jornadaExcepcional.asignarDiasLaborales(listaDiasDelMesExpected);
		Assert.assertTrue(resultado);
	}

	@Test
	public void testObtenerListaDiasJornada() {
		List<?> listaDiasDelMesActual = this.jornadaExcepcional.obtenerListaDiasJornada();

		Assert.assertEquals(this.listaDiasDelMesExpected, listaDiasDelMesActual);

	}

	@Test
	public void testVerificarDisponiblidadAutorizacionAprobada() {
		this.jornadaExcepcional.asignarAutorizacion(this.autorizacionJornadaAutorizada);
		this.listaDiasDelMesExpected.add(6);
		this.jornadaExcepcional.asignarDiasLaborales(this.listaDiasDelMesExpected);

		TurnoACubrir turnoAVerificar = new TurnoACubrir();
		turnoAVerificar.asignarDia("06/01/2019");

		boolean resultado = this.jornadaExcepcional.verificarDisponiblidad(turnoAVerificar);

		Assert.assertFalse(resultado);
	}

	@Test
	public void testVerificarDisponiblidadAutorizacionNOAprobada() {
		this.jornadaExcepcional.asignarAutorizacion(this.autorizacionJornadaNOAutorizada);
		this.listaDiasDelMesExpected.add(6);
		this.jornadaExcepcional.asignarDiasLaborales(this.listaDiasDelMesExpected);

		TurnoACubrir turnoAVerificar = new TurnoACubrir();
		turnoAVerificar.asignarDia("06/01/2019");

		boolean resultado = this.jornadaExcepcional.verificarDisponiblidad(turnoAVerificar);

		Assert.assertTrue(resultado);
	}

}
