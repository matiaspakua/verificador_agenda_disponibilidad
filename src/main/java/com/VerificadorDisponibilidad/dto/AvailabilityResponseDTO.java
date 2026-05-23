package com.VerificadorDisponibilidad.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

@Schema(description = "Response containing availability check results")
public class AvailabilityResponseDTO {
    @Schema(description = "List of available employees", example = "[\"Juan\", \"María\"]")
    private List<String> availableEmployees;

    @Schema(description = "Total number of available employees", example = "2")
    private int totalAvailable;

    @Schema(description = "Check execution timestamp", example = "2026-05-23T10:35:12.504Z")
    private String timestamp;

    @Schema(description = "Shift details being checked")
    private ShiftDetailsDTO shiftDetails;

    public AvailabilityResponseDTO() {
    }

    public AvailabilityResponseDTO(List<String> availableEmployees, ShiftDetailsDTO shiftDetails) {
        this.availableEmployees = availableEmployees;
        this.totalAvailable = availableEmployees != null ? availableEmployees.size() : 0;
        this.timestamp = java.time.Instant.now().toString();
        this.shiftDetails = shiftDetails;
    }

    public List<String> getAvailableEmployees() {
        return availableEmployees;
    }

    public void setAvailableEmployees(List<String> availableEmployees) {
        this.availableEmployees = availableEmployees;
    }

    public int getTotalAvailable() {
        return totalAvailable;
    }

    public void setTotalAvailable(int totalAvailable) {
        this.totalAvailable = totalAvailable;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public ShiftDetailsDTO getShiftDetails() {
        return shiftDetails;
    }

    public void setShiftDetails(ShiftDetailsDTO shiftDetails) {
        this.shiftDetails = shiftDetails;
    }
}
