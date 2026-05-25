# Stage 1: Build the Maven application
FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app

# Copy the pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy the source code and build the application
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Create the runtime image
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
RUN apk add --no-cache curl

# Copy the compiled jar from the build stage
COPY --from=build /app/target/VerificadorDisponibilidad-1.0-SNAPSHOT.jar app.jar

# Expose port 8080
EXPOSE 8080

# Configure environment variables
ENV SPRING_PROFILES_ACTIVE=prod

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:8080/api/availability/health || exit 1

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
