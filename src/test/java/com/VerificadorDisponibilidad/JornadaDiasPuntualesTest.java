package com.VerificadorDisponibilidad;

import com.VerificadorDisponibilidad.dominio.Jornada;
import com.VerificadorDisponibilidad.dominio.JornadaDiasPuntuales;
import com.VerificadorDisponibilidad.servicios.TurnoACubrir;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;


public class JornadaDiasPuntualesTest {

    ArrayList<String> diasPuntualesEsperados = new ArrayList<String>();
    private Jornada jornadaDiasPuntuales = new JornadaDiasPuntuales();
    private static final String LUNES = "lunes";
    private static final String MARTES = "martes";
    private static final String MIERCOLES = "miercoles";
    private static final String JUEVES = "jueves";
    private static final String VIERNES = "viernes";
    private static final String SABADO = "sabado";
    private static final String DOMINGO = "domingo";

    @Before
    public void SetUp() {
        this.diasPuntualesEsperados.add(LUNES);
        this.diasPuntualesEsperados.add(JUEVES);
        this.diasPuntualesEsperados.add(DOMINGO);
        Boolean resultado = this.jornadaDiasPuntuales.asignarDiasLaborales(this.diasPuntualesEsperados);

        Assert.assertTrue(resultado);
    }

    @Test
    public void asignarDiasLaboralesTest() {

        List<?> diasPuntualesActuales = this.jornadaDiasPuntuales.obtenerListaDiasJornada();

        Assert.assertEquals(diasPuntualesEsperados, diasPuntualesActuales);
    }

    @Test
    public void asignarDiasLaboralesConErrorTest() {

        ArrayList<String> diasPuntualesEsperados = new ArrayList<String>();
        diasPuntualesEsperados.add("LURNES");
        diasPuntualesEsperados.add(JUEVES);
        diasPuntualesEsperados.add(DOMINGO);

        Boolean resultado = this.jornadaDiasPuntuales.asignarDiasLaborales(diasPuntualesEsperados);

        Assert.assertFalse(resultado);
    }

    @Test
    public void verificarDisponiblidadTest() {
        TurnoACubrir turnoAVerificar = new TurnoACubrir();
        turnoAVerificar.asignarDia("04/02/2019"); // lunes

        this.jornadaDiasPuntuales.asignarDiasLaborales(this.diasPuntualesEsperados);

        Boolean resultado = this.jornadaDiasPuntuales.verificarDisponiblidad(turnoAVerificar);
        Assert.assertTrue(resultado);
    }

    @Test
    public void verificarNoDisponiblidadTest() {
        TurnoACubrir turnoAVerificar = new TurnoACubrir();
        turnoAVerificar.asignarDia("05/02/2019"); // martes

        this.jornadaDiasPuntuales.asignarDiasLaborales(this.diasPuntualesEsperados);

        Boolean resultado = this.jornadaDiasPuntuales.verificarDisponiblidad(turnoAVerificar);
        Assert.assertFalse(resultado);
    }

    @Test
    public void verificarNormalizacionYAcentosTest() {
        List<String> diasMixtos = new ArrayList<String>();
        diasMixtos.add("mi\u00e9rcoles"); // miércoles
        diasMixtos.add("S\u00c1BADO");    // SÁBADO
        diasMixtos.add("domingo ");      // trailing spaces

        Jornada jornadaNormalizada = new JornadaDiasPuntuales();
        boolean asignado = jornadaNormalizada.asignarDiasLaborales(diasMixtos);
        Assert.assertTrue(asignado);

        List<?> diasGuardados = jornadaNormalizada.obtenerListaDiasJornada();
        Assert.assertTrue(diasGuardados.contains("miercoles"));
        Assert.assertTrue(diasGuardados.contains("sabado"));
        Assert.assertTrue(diasGuardados.contains("domingo"));

        // test availability verification works seamlessly
        TurnoACubrir turnoMiercoles = new TurnoACubrir();
        turnoMiercoles.asignarDia("02/01/2019"); // Wednesday
        Assert.assertTrue(jornadaNormalizada.verificarDisponiblidad(turnoMiercoles));

        TurnoACubrir turnoSabado = new TurnoACubrir();
        turnoSabado.asignarDia("05/01/2019"); // Saturday
        Assert.assertTrue(jornadaNormalizada.verificarDisponiblidad(turnoSabado));
    }
}
