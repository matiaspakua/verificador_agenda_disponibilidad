package com.VerificadorDisponibilidad.dominio;

public class Autorizacion {

	private String detalle;
	private boolean seTrabaja;

	/**
	 * La autorizaci�n tiene un atributo que indica si el d�a en la jornada asociada
	 * se TRABAJA o NO SE TRABAJA.
	 * 
	 * @param detalle
	 * @param seTrabaja
	 */
	public Autorizacion(String detalle, boolean seTrabaja) {
		this.detalle = detalle;
		this.seTrabaja = seTrabaja;
	}

	public boolean consultarDisponibilidadJornada() {
		return this.seTrabaja;
	}

	public String consultarDetalleAutorizacion() {

		return this.detalle;
	}

}
