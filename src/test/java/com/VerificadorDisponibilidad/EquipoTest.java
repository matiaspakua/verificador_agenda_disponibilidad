package com.VerificadorDisponibilidad;

import java.util.ArrayList;

import com.VerificadorDisponibilidad.dominio.Empleado;
import com.VerificadorDisponibilidad.dominio.Equipo;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

public class EquipoTest {

	private Equipo equipo = new Equipo("ALFA");

	@Before
	public void SetUp() {

		Empleado matias = new Empleado("matias");
		Empleado estefania = new Empleado("estefania");
		Empleado vero = new Empleado("vero");

		equipo.agregarNuevoIntegrante(matias);
		equipo.agregarNuevoIntegrante(estefania);
		equipo.agregarNuevoIntegrante(vero);
	}

	@Test
	public void obtenerListaIntegrantesTest() {
		Integer cantidadIntegrantesEsperado = 3;
		ArrayList<Empleado> listaEmpleadosEquipo = equipo.obtenerListaIntegrantes();

		Integer cantidadIntegrantesEnEquipo = listaEmpleadosEquipo.size();

		Assert.assertEquals(cantidadIntegrantesEsperado, cantidadIntegrantesEnEquipo);
	}
}
