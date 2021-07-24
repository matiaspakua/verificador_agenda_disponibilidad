package main.dominio;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;

import main.servicios.TurnoACubrir;

/**
 * Clase que permite crear jornadas laborales usando los días puntuales de las
 * semanas: Lunes a Domingo.
 * 
 * @author matias
 *
 */
public class JornadaDiasPuntuales extends Jornada implements Cloneable {

	private ArrayList<String> listaDias = new ArrayList<String>();
	private final ArrayList<String> listaDiasHabilitados;
	public static final String LUNES = "lunes";
	public static final String MARTES = "martes";
	public static final String MIERCOLES = "miércoles";
	public static final String JUEVES = "jueves";
	public static final String VIERNES = "viernes";
	public static final String SABADO = "sabado";
	public static final String DOMINGO = "domingo";
	private int DIAS_SEMANA = 7;

	/**
	 * Construye jornada laboral para días puntuales de la semana, desde el lunes a
	 * domingo.
	 */
	public JornadaDiasPuntuales() {
		super();
		this.listaDiasHabilitados = new ArrayList<String>();
		this.listaDiasHabilitados.add(LUNES);
		this.listaDiasHabilitados.add(MARTES);
		this.listaDiasHabilitados.add(MIERCOLES);
		this.listaDiasHabilitados.add(JUEVES);
		this.listaDiasHabilitados.add(VIERNES);
		this.listaDiasHabilitados.add(SABADO);
		this.listaDiasHabilitados.add(DOMINGO);
	}

	@Override
	public boolean asignarDiasLaborales(List<?> listaDiasPuntales) {
		boolean resultado = true;
		if ((listaDiasPuntales.size() > this.DIAS_SEMANA)
				|| (!this.listaDiasHabilitados.containsAll(listaDiasPuntales))) {
			resultado = false;
		} else {
			for (Iterator<?> iterator = listaDiasPuntales.iterator(); iterator.hasNext();) {
				String dia = (String) iterator.next();
				this.listaDias.add(dia.toString());
			}
		}
		return resultado;
	}

	@Override
	public List<?> obtenerListaDiasJornada() {
		return this.listaDias;
	}

	@Override
	public boolean verificarDisponiblidad(TurnoACubrir turno) {
		boolean resultado = false;
		String diaACubrir = turno.consultarDiaTurnoACubrir();
		String[] date = diaACubrir.split("/");

		// ISO 8601
		LocalDate localDate = LocalDate.of(Integer.parseInt(date[2]), Integer.parseInt(date[1]),
				Integer.parseInt(date[0]));
		Locale localeEspaniol = new Locale("es", "ES");
		String fechaEnEspaniol = localDate.format(DateTimeFormatter.ofPattern("EEEE", localeEspaniol));

		if (this.listaDias.contains(fechaEnEspaniol)) {
			resultado = true;
		}
		return resultado;
	}
}
