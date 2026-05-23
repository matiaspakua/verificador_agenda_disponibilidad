package com.VerificadorDisponibilidad.dto;

import java.util.List;

public class EmpleadoDTO {
    private String nombre;
    private String equipo;
    private List<JornadaDTO> jornadas;

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getEquipo() {
        return equipo;
    }

    public void setEquipo(String equipo) {
        this.equipo = equipo;
    }

    public List<JornadaDTO> getJornadas() {
        return jornadas;
    }

    public void setJornadas(List<JornadaDTO> jornadas) {
        this.jornadas = jornadas;
    }
}
