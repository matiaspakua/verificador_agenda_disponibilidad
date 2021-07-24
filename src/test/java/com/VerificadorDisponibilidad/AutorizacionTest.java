package main.test;

import org.junit.Assert;
import org.junit.jupiter.api.Test;

import main.dominio;

public class AutorizacionTest {
	boolean seTrabaja = false;
	Autorizacion autorizacionExcepcional = new Autorizacion("D�a por viaje despues de la fiestas, aprobado",
			this.seTrabaja);

	@Test
	public void AutorizacionAprobadaTest() {
		boolean resultado = this.autorizacionExcepcional.consultarDisponibilidadJornada();

		Assert.assertFalse(resultado);
	}

	@Test
	public void AutorizacionDetalleTest() {
		String detalleExpected = "D�a por viaje despues de la fiestas, aprobado";
		String detalleActual = this.autorizacionExcepcional.consultarDetalleAutorizacion();

		Assert.assertEquals(detalleExpected, detalleActual);
	}
}
