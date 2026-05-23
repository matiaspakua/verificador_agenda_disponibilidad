# Stage 1: Build the Maven application
FROM maven:3.8.4-openjdk-17-slim AS build
WORKDIR /app

# Copy the pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy the source code and build the application
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Create the runtime image
FROM openjdk:17-slim
WORKDIR /app

# Copy the compiled jar from the build stage
COPY --from=build /app/target/VerificadorDisponibilidad-1.0-SNAPSHOT.jar app.jar

# Expose port 8080
EXPOSE 8080

# Configure environment variables
ENV SPRING_PROFILES_ACTIVE=prod

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
