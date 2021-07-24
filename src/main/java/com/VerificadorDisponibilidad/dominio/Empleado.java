package main.dominio;

import java.util.ArrayList;
import java.util.List;

public class Empleado {

	private String nombre;
	private List<Jornada> jornadaLaboral;
	private Equipo equipoDeTrabajo;

	public Empleado(String nombreEmpleado) {
		this.nombre = nombreEmpleado;
		this.jornadaLaboral = new ArrayList<Jornada>();
	}

	public String getNombre() {
		return this.nombre;
	}

	public boolean asignarJornadaLaboral(List<Jornada> jornadaLaboral) throws CloneNotSupportedException {
		boolean resultado = false;
		if (!jornadaLaboral.isEmpty()) {

			for (Jornada jornada : jornadaLaboral) {
				this.jornadaLaboral.add((Jornada) jornada.clone());
			}

			resultado = true;
		}
		return resultado;
	}

	public List<Jornada> consultarJornadaLaboral() {
		return this.jornadaLaboral;
	}

	public Equipo getEquipoDeTrabajo() {
		return this.equipoDeTrabajo;
	}

	public void setEquipoDeTrabajo(Equipo equipoDeTrabajo) {
		this.equipoDeTrabajo = equipoDeTrabajo;
	}

}
