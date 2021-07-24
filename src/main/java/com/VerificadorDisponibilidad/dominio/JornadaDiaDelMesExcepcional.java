package main.dominio;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import main.servicios.TurnoACubrir;

public class JornadaDiaDelMesExcepcional extends Jornada implements Cloneable {

	private Autorizacion autorizacionDiaExcepcional;
	private List<Integer> diasPuntuales = new ArrayList<Integer>();

	public void asignarAutorizacion(Autorizacion autorizacionDiaExcepcional) {
		this.autorizacionDiaExcepcional = autorizacionDiaExcepcional;
	}

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
		LocalDate localDate = LocalDate.of(Integer.parseInt(date[2]), Integer.parseInt(date[1]),
				Integer.parseInt(date[0]));
		int dayOfMonth = localDate.getDayOfMonth();

		if (this.diasPuntuales.contains(dayOfMonth) && (this.autorizacionDiaExcepcional != null)
				&& (this.autorizacionDiaExcepcional.consultarDisponibilidadJornada() == true)) {
			resultado = true;
		}

		return resultado;
	}
}
