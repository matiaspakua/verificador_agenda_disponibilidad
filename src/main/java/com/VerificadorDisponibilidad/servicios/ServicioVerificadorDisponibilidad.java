package com.VerificadorDisponibilidad.servicios;

import com.VerificadorDisponibilidad.dominio.Empleado;
import com.VerificadorDisponibilidad.dominio.Equipo;
import com.VerificadorDisponibilidad.dominio.Jornada;
import com.VerificadorDisponibilidad.dominio.JornadaDiaDelMesExcepcional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;


public class ServicioVerificadorDisponibilidad {
	private Map<String, Empleado> listaDeEmpleados = new HashMap<String, Empleado>();

	public void agregarListaEmpleados(Map<String, Empleado> listadoEmpleados) {
		this.listaDeEmpleados = listadoEmpleados;
	}

	public List<String> buscarDisponibilidadParaCubrirAsignacion(TurnoACubrir asignacionACubrir) {
		List<Empleado> listaEmpleadosDisponibles = this.buscarDisponiblidadTodos(asignacionACubrir);

		List<String> listaEmpleadosFinal = this.buscarDisponiblidadEquipos(asignacionACubrir,
				listaEmpleadosDisponibles);

		return listaEmpleadosFinal;
	}

	/**
	 * Toma como input la lista de todos los empleados disponibles para cubrir la
	 * asignacion del turno y sobre esa lista, saca aquellos empleados que tengan un
	 * equipo asociado y donde algun empleado del equipo no pueda cubrir la
	 * asignacion.
	 * 
	 * REGLA DE NEGOCIO: Equipo que funciona, no se TOCA.
	 * 
	 * @param asignacionACubrir
	 * @return
	 */
	private List<Empleado> buscarDisponiblidadTodos(TurnoACubrir asignacionACubrir) {
		boolean resultado = false;
		List<Empleado> listaEmpleadosDisponibles = new ArrayList<Empleado>();

		for (Empleado unEmpleado : this.listaDeEmpleados.values()) {

			List<Jornada> listaJornadas = unEmpleado.consultarJornadaLaboral();

			for (Jornada jornada : listaJornadas) {		
				
				if (
						(jornada instanceof JornadaDiaDelMesExcepcional) &&
						(jornada.verificarDisponiblidad(asignacionACubrir))) {
						resultado = true;
						break;	
					}
				
				if (jornada.verificarDisponiblidad(asignacionACubrir)) {
					resultado = true;
				}else {
					resultado = false;
				}
			}
			if (resultado) {
				listaEmpleadosDisponibles.add(unEmpleado);
			}
		}
		return listaEmpleadosDisponibles;
	}

	/**
	 * Busca de la lista de todos los empleados de la empresa, todos aquellos que
	 * tienen disponiblidad para cubrir la asignaci�n del turno.
	 * 
	 * @param asignacionACubrir
	 * @param listaEmpleadosDisponibles
	 * @return
	 */
	private List<String> buscarDisponiblidadEquipos(TurnoACubrir asignacionACubrir,
			List<Empleado> listaEmpleadosDisponibles) {

		Set<String> listaEmpleadosFinal = new HashSet<>();

		for (Empleado unEmpleado : listaEmpleadosDisponibles) {

			if (unEmpleado.getEquipoDeTrabajo() != null) {
				Equipo unEquipo = unEmpleado.getEquipoDeTrabajo();
				List<Empleado> empleadosEnEquipo = unEquipo.obtenerListaIntegrantes();

				if (listaEmpleadosDisponibles.containsAll(empleadosEnEquipo)) {
					for (Iterator empleadoEquipo = empleadosEnEquipo.iterator(); empleadoEquipo.hasNext();) {
						Empleado empleadoEnEquipo = (Empleado) empleadoEquipo.next();

						listaEmpleadosFinal.add(empleadoEnEquipo.getNombre());
					}
				}
			} else {
				listaEmpleadosFinal.add(unEmpleado.getNombre());
			}
		}
		return new ArrayList<String>(listaEmpleadosFinal);
	}
}
