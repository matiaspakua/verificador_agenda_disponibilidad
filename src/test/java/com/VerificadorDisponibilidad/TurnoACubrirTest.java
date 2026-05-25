package com.VerificadorDisponibilidad;

import com.VerificadorDisponibilidad.servicios.TurnoACubrir;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;


public class TurnoACubrirTest {

    private TurnoACubrir turno = new TurnoACubrir();

    @BeforeEach
    public void setUp() {
        turno.asignarDia("02/01/2019");
        turno.asignarDescripcion("Soporte Servidor produccion");
    }

    @Test
    public void consultarTurnoACubrirTest() {
        String expectedResult = "02/01/2019";
        String diaTurnoACubrir = turno.consultarDiaTurnoACubrir();

        assertEquals(expectedResult, diaTurnoACubrir);
    }

    @Test
    public void consultaDescripcionTurnoACubrirTest() {
        String expectedResult = "Soporte Servidor produccion";
        String descripcion = turno.consultarDescripcionTurnoACubrir();
        assertEquals(expectedResult, descripcion);
    }
}
