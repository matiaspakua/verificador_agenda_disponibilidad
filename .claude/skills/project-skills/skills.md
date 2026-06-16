# Project Skills & Commands

This document outlines the standard skills and workflows required to build, test, and manage the `Verificador de Agenda de Disponibilidad` project.

## 1. Verification & Testing

### Run All Unit Tests
Executes the entire JUnit test suite to verify code correctness and compatibility:
```bash
mvn test
```

### Run a Single Test Class
Runs only the tests defined inside a specific test class (useful during local TDD cycles):
```bash
mvn test -Dtest=ServicioVerificadorDisponibilidadTest
```

### Clean and Build Project
Cleans up build artifacts and compiles all source code:
```bash
mvn clean compile
```

## 2. Code Coverage & Quality

### Generating Coverage Report
To view exact code coverage metrics:
```bash
mvn jacoco:report
```
*Note: Make sure the Jacoco plugin is enabled in the `pom.xml` build configuration.*

## 3. Git Workflows

### Branch Creation & Checkout
```bash
git checkout -b feature/fix-availability-bugs
```

### Commit Changes
```bash
git add .
git commit -m "fix(availability): resolve encoding and order-dependent evaluation bugs"
```
