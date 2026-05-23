package com.VerificadorDisponibilidad.dominio;


import com.VerificadorDisponibilidad.servicios.TurnoACubrir;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;

/**
 * Clase que permite crear jornadas laborales usando los d�as puntuales de las
 * semanas: Lunes a Domingo.
 *
 * @author matias
 */
public class JornadaDiasPuntuales extends Jornada implements Cloneable {

    private ArrayList<String> listaDias = new ArrayList<String>();
    private final ArrayList<String> listaDiasHabilitados;
    public static final String LUNES = "lunes";
    public static final String MARTES = "martes";
    public static final String MIERCOLES = "miercoles";
    public static final String JUEVES = "jueves";
    public static final String VIERNES = "viernes";
    public static final String SABADO = "sabado";
    public static final String DOMINGO = "domingo";
    private int DIAS_SEMANA = 7;

    /**
     * Normalizes a day name to a standard lowercase accent-free representation.
     */
    public static String normalizeDayName(String dayName) {
        if (dayName == null) {
            return "";
        }
        String lower = dayName.toLowerCase().trim();
        if (lower.startsWith("lun")) {
            return LUNES;
        }
        if (lower.startsWith("mar")) {
            return MARTES;
        }
        if (lower.startsWith("mie") || lower.startsWith("mi\u00e9") || lower.startsWith("mi\uFFFD") || lower.equals("mircoles")) {
            return MIERCOLES;
        }
        if (lower.startsWith("jue")) {
            return JUEVES;
        }
        if (lower.startsWith("vie")) {
            return VIERNES;
        }
        if (lower.startsWith("sab") || lower.startsWith("s\u00e1") || lower.startsWith("s\uFFFD")) {
            return SABADO;
        }
        if (lower.startsWith("dom")) {
            return DOMINGO;
        }
        return lower;
    }

    /**
     * Construye jornada laboral para dias puntuales de la semana, desde el lunes a
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
        if (listaDiasPuntales.size() > this.DIAS_SEMANA) {
            resultado = false;
        } else {
            // Check if all elements, when normalized, are valid day names
            List<String> normalizedInputs = new ArrayList<>();
            for (Object obj : listaDiasPuntales) {
                if (obj == null) {
                    resultado = false;
                    break;
                }
                String normalized = normalizeDayName(obj.toString());
                if (!this.listaDiasHabilitados.contains(normalized)) {
                    resultado = false;
                    break;
                }
                normalizedInputs.add(normalized);
            }
            if (resultado) {
                this.listaDias.addAll(normalizedInputs);
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

        String normalizedFecha = normalizeDayName(fechaEnEspaniol);

        if (this.listaDias.contains(normalizedFecha)) {
            resultado = true;
        }
        return resultado;
    }
}
