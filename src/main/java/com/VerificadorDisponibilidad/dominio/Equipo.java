package main.dominio;

import java.util.ArrayList;

public class Equipo {

	private ArrayList<Empleado> listaIntegrantes;
	private String nombreEquipo;

	public Equipo(String nombreEquipo) {
		this.listaIntegrantes = new ArrayList<Empleado>();
		this.nombreEquipo = nombreEquipo;
	}

	public void agregarNuevoIntegrante(Empleado nuevoEmpleado) {
		this.listaIntegrantes.add(nuevoEmpleado);
	}

	public ArrayList<Empleado> obtenerListaIntegrantes() {
		return this.listaIntegrantes;
	}

	public String getNombreEquipo() {
		return this.nombreEquipo;
	}
}