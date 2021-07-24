package main.dominio;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import main.servicios.TurnoACubrir;

/**
 * Clase para crear lista de días para la jornada laboral. Lista de enteros
 * [1..30 ó 31] dependiendo del mes actual.
 * 
 * @author matias
 *
 */
public class JornadaDiasDelMes extends Jornada implements Cloneable {
	private List<Integer> diasPuntuales = new ArrayList<Integer>();

	public JornadaDiasDelMes() {
		super();
	}

	/*
	 * asignarDiasLaborales para JornadaDiasDelMes permite crear jornada laboral
	 * para un mes, usando como parámetro una lista de días [1..30 o 31] dependiendo
	 * del mes actual.
	 */
	@Override
	public boolean asignarDiasLaborales(List<?> diasLaborales) {
		boolean resultado = true;
		for (Iterator<?> iterator = diasLaborales.iterator(); iterator.hasNext();) {
			Integer dia = (Integer) iterator.next();
			if (dia.intValue() > LocalDate.now().lengthOfMonth()) {
				resultado = false;
			}
			this.diasPuntuales.add(dia.intValue());
		}
		return resultado;
	}

	@Override
	public List<?> obtenerListaDiasJornada() {
		return this.diasPuntuales;
	}

	@Override
	public boolean verificarDisponiblidad(TurnoACubrir turno) {
		boolean resultado = false;
		String diaACubrir = turno.consultarDiaTurnoACubrir();
		String[] date = diaACubrir.split("/");

		// ISO 8601
		// parsea fechas del tipo "08/09/2019" --> DD/MM/AAAA
		LocalDate localDate = LocalDate.of(Integer.parseInt(date[2]), Integer.parseInt(date[1]),
				Integer.parseInt(date[0]));
		int dayOfMonth = localDate.getDayOfMonth();

		if (this.diasPuntuales.contains(dayOfMonth)) {
			resultado = true;
		}
		return resultado;
	}
}
