package main.test;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import main.servicios.TurnoACubrir;

public class TurnoACubrirTest {

	private TurnoACubrir turno = new TurnoACubrir();

	@Before
	public void setUp() {
		turno.asignarDia("02/01/2019");
		turno.asignarDescripcion("Soporte Servidor produccion");
	}

	@Test
	public void consultarTurnoACubrirTest() {
		String expectedResult = "02/01/2019";
		String diaTurnoACubrir = turno.consultarDiaTurnoACubrir();

		Assert.assertEquals(expectedResult, diaTurnoACubrir);
	}

	@Test
	public void consultaDescripcionTurnoACubrirTest() {
		String expectedResult = "Soporte Servidor produccion";
		String descripcion = turno.consultarDescripcionTurnoACubrir();
		Assert.assertEquals(expectedResult, descripcion);
	}
}
