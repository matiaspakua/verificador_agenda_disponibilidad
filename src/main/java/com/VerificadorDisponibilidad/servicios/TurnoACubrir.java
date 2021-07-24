package main.servicios;

public class TurnoACubrir {

	private String diaTurnoACubrir;
	private String descripcion;

	public void asignarDia(String diaTurnoACubrir) {
		this.diaTurnoACubrir = diaTurnoACubrir;
	}

	public void asignarDescripcion(String descripcion) {
		this.descripcion = descripcion;

	}

	public String consultarDiaTurnoACubrir() {
		return this.diaTurnoACubrir;
	}

	public String consultarDescripcionTurnoACubrir() {
		return this.descripcion;
	}

}
