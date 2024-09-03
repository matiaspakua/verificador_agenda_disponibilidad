package com.VerificadorDisponibilidad.dominio;

import com.VerificadorDisponibilidad.servicios.TurnoACubrir;

import java.util.List;


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
