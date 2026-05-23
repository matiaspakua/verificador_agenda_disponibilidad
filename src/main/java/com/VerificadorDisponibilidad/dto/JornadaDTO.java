package com.VerificadorDisponibilidad.dto;

import java.util.List;

public class JornadaDTO {
    private String tipo; // "dias_puntuales", "dias_del_mes", "excepcional"
    private List<String> diasPuntuales;
    private List<Integer> diasDelMes;
    private String autorizacionDetalle;
    private Boolean autorizacionTrabaja;

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public List<String> getDiasPuntuales() {
        return diasPuntuales;
    }

    public void setDiasPuntuales(List<String> diasPuntuales) {
        this.diasPuntuales = diasPuntuales;
    }

    public List<Integer> getDiasDelMes() {
        return diasDelMes;
    }

    public void setDiasDelMes(List<Integer> diasDelMes) {
        this.diasDelMes = diasDelMes;
    }

    public String getAutorizacionDetalle() {
        return autorizacionDetalle;
    }

    public void setAutorizacionDetalle(String autorizacionDetalle) {
        this.autorizacionDetalle = autorizacionDetalle;
    }

    public Boolean getAutorizacionTrabaja() {
        return autorizacionTrabaja;
    }

    public void setAutorizacionTrabaja(Boolean autorizacionTrabaja) {
        this.autorizacionTrabaja = autorizacionTrabaja;
    }
}
