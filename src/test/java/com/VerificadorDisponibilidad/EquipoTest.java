package com.VerificadorDisponibilidad;

import java.util.ArrayList;

import com.VerificadorDisponibilidad.dominio.Empleado;
import com.VerificadorDisponibilidad.dominio.Equipo;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class EquipoTest {

	private Equipo equipo = new Equipo("ALFA");

	@BeforeEach
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

		assertEquals(cantidadIntegrantesEsperado, cantidadIntegrantesEnEquipo);
	}
}
