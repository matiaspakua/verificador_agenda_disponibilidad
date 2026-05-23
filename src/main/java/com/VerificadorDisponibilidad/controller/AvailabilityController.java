package com.VerificadorDisponibilidad.controller;

import com.VerificadorDisponibilidad.dominio.*;
import com.VerificadorDisponibilidad.dto.*;
import com.VerificadorDisponibilidad.servicios.ServicioVerificadorDisponibilidad;
import com.VerificadorDisponibilidad.servicios.TurnoACubrir;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/availability")
@Tag(name = "Availability Calendar API", description = "Verificación de la disponibilidad de empleados y equipos para cubrir turnos.")
public class AvailabilityController {

    @PostMapping("/check")
    @Operation(
        summary = "Check employee availability for a shift",
        description = "Process a list of employees (with their respective schedules and teams) and determine who can cover the requested assignment on the given date.",
        responses = {
            @ApiResponse(
                responseCode = "200",
                description = "Successful check. Returns list of available employees with details.",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = AvailabilityResponseDTO.class))
            ),
            @ApiResponse(
                responseCode = "400",
                description = "Invalid request data",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponseDTO.class))
            ),
            @ApiResponse(
                responseCode = "500",
                description = "Internal server error",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponseDTO.class))
            )
        }
    )
    public ResponseEntity<?> checkAvailability(@RequestBody VerificarRequestDTO request) {
        if (request == null || request.getTurnoDia() == null || request.getEmpleados() == null || request.getEmpleados().isEmpty()) {
            return ResponseEntity.badRequest()
                .body(new ErrorResponseDTO(400, "Invalid request: turnoDia and employees are required"));
        }

        try {
            // 1. Build TurnoACubrir
            TurnoACubrir turno = new TurnoACubrir();
            turno.asignarDescripcion(request.getTurnoDescripcion() != null ? request.getTurnoDescripcion() : "");
            turno.asignarDia(request.getTurnoDia());

            // 2. Map DTOs to Domain models
            Map<String, Empleado> listadoEmpleados = new HashMap<>();
            Map<String, Equipo> equiposMap = new HashMap<>();

            for (EmpleadoDTO empDto : request.getEmpleados()) {
                if (empDto.getNombre() == null || empDto.getNombre().trim().isEmpty()) {
                    continue;
                }
                
                Empleado emp = new Empleado(empDto.getNombre());
                List<Jornada> jornadas = new ArrayList<>();

                if (empDto.getJornadas() != null) {
                    for (JornadaDTO jornadaDto : empDto.getJornadas()) {
                        String tipo = jornadaDto.getTipo();
                        if ("dias_puntuales".equalsIgnoreCase(tipo)) {
                            Jornada jp = new JornadaDiasPuntuales();
                            jp.asignarDiasLaborales(jornadaDto.getDiasPuntuales());
                            jornadas.add(jp);
                        } else if ("dias_del_mes".equalsIgnoreCase(tipo)) {
                            Jornada jm = new JornadaDiasDelMes();
                            jm.asignarDiasLaborales(jornadaDto.getDiasDelMes());
                            jornadas.add(jm);
                        } else if ("excepcional".equalsIgnoreCase(tipo)) {
                            JornadaDiaDelMesExcepcional je = new JornadaDiaDelMesExcepcional();
                            je.asignarDiasLaborales(jornadaDto.getDiasDelMes());
                            je.asignarAutorizacion(new Autorizacion(
                                    jornadaDto.getAutorizacionDetalle() != null ? jornadaDto.getAutorizacionDetalle() : "",
                                    jornadaDto.getAutorizacionTrabaja() != null ? jornadaDto.getAutorizacionTrabaja() : false
                            ));
                            jornadas.add(je);
                        }
                    }
                }

                emp.asignarJornadaLaboral(jornadas);

                // Handle Team Association (respecting "equipo que funciona no se toca")
                if (empDto.getEquipo() != null && !empDto.getEquipo().trim().isEmpty()) {
                    String equipoNombre = empDto.getEquipo().trim();
                    Equipo equipo = equiposMap.get(equipoNombre);
                    if (equipo == null) {
                        equipo = new Equipo(equipoNombre);
                        equiposMap.put(equipoNombre, equipo);
                    }
                    equipo.agregarNuevoIntegrante(emp);
                    emp.setEquipoDeTrabajo(equipo);
                }

                listadoEmpleados.put(emp.getNombre(), emp);
            }

            // 3. Invoke Service
            ServicioVerificadorDisponibilidad servicio = new ServicioVerificadorDisponibilidad();
            servicio.agregarListaEmpleados(listadoEmpleados);

            List<String> disponibles = servicio.buscarDisponibilidadParaCubrirAsignacion(turno);
            
            // 4. Build response
            ShiftDetailsDTO shiftDetails = new ShiftDetailsDTO(
                request.getTurnoDia(),
                request.getTurnoDescripcion() != null ? request.getTurnoDescripcion() : "No description"
            );
            AvailabilityResponseDTO response = new AvailabilityResponseDTO(disponibles, shiftDetails);
            
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponseDTO(500, "Error processing availability check: " + e.getMessage()));
        }
    }

    @GetMapping("/health")
    @Operation(
        summary = "Health check endpoint",
        description = "Verify that the API service is running and healthy",
        responses = {
            @ApiResponse(
                responseCode = "200",
                description = "Service is healthy"
            )
        }
    )
    public ResponseEntity<Map<String, String>> health() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "UP");
        response.put("service", "Availability Calendar API");
        response.put("timestamp", java.time.Instant.now().toString());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/info")
    @Operation(
        summary = "Get API information",
        description = "Retrieve information about the Availability Calendar API",
        responses = {
            @ApiResponse(
                responseCode = "200",
                description = "API information"
            )
        }
    )
    public ResponseEntity<Map<String, String>> info() {
        Map<String, String> response = new HashMap<>();
        response.put("name", "Verificador Agenda de Disponibilidad API");
        response.put("version", "1.0.0");
        response.put("description", "API for checking employee availability based on schedules and team constraints");
        response.put("endpoints", "POST /api/availability/check, GET /api/availability/health, GET /api/availability/info");
        return ResponseEntity.ok(response);
    }
}
