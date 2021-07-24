package main.dominio;

import java.util.List;

import main.servicios.TurnoACubrir;

public abstract class Jornada implements Cloneable {
	public abstract boolean asignarDiasLaborales(List<?> diasLaborales);

	public abstract List<?> obtenerListaDiasJornada();

	public abstract boolean verificarDisponiblidad(TurnoACubrir turno);

	@Override
	public Object clone() throws CloneNotSupportedException {
		Jornada clone = null;
		try {
			clone = (Jornada) super.clone();
		} catch (CloneNotSupportedException e) {
			throw new RuntimeException(e);
		}
		return clone;
	}
}
