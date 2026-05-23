package com.VerificadorDisponibilidad.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Error response")
public class ErrorResponseDTO {
    @Schema(description = "HTTP status code", example = "400")
    private int status;

    @Schema(description = "Error message", example = "Invalid request data")
    private String message;

    @Schema(description = "Error timestamp", example = "2026-05-23T10:35:12.504Z")
    private String timestamp;

    public ErrorResponseDTO() {
    }

    public ErrorResponseDTO(int status, String message) {
        this.status = status;
        this.message = message;
        this.timestamp = java.time.Instant.now().toString();
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }
}
