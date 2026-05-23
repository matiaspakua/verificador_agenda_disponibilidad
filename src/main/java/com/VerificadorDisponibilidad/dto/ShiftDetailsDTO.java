package com.VerificadorDisponibilidad.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Details of the shift being checked")
public class ShiftDetailsDTO {
    @Schema(description = "Shift date in format dd/MM/yyyy", example = "23/05/2026")
    private String date;

    @Schema(description = "Shift description", example = "Morning shift")
    private String description;

    public ShiftDetailsDTO() {
    }

    public ShiftDetailsDTO(String date, String description) {
        this.date = date;
        this.description = description;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
