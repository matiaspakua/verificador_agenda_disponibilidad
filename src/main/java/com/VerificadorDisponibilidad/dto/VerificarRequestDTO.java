package com.VerificadorDisponibilidad.dto;

import java.util.List;

public class VerificarRequestDTO {
    private String turnoDescripcion;
    private String turnoDia;
    private List<EmpleadoDTO> empleados;

    public String getTurnoDescripcion() {
        return turnoDescripcion;
    }

    public void setTurnoDescripcion(String turnoDescripcion) {
        this.turnoDescripcion = turnoDescripcion;
    }

    public String getTurnoDia() {
        return turnoDia;
    }

    public void setTurnoDia(String turnoDia) {
        this.turnoDia = turnoDia;
    }

    public List<EmpleadoDTO> getEmpleados() {
        return empleados;
    }

    public void setEmpleados(List<EmpleadoDTO> empleados) {
        this.empleados = empleados;
    }
}
