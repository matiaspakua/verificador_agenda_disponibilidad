# Project Rules & Guidelines

This project uses Java 8 and JUnit 4 for development and testing. To maintain code quality, robust execution, and clear design, follow these guidelines.

## 1. Test-Driven Development (TDD)
- **Write Tests First**: Before implementing any new feature or resolving any bug, write a failing unit test that reproduces the target behavior/bug.
- **Run Tests Constantly**: Keep tests green at all times. If a change breaks existing tests, resolve the breakage immediately.
- **Isolate Assertions**: Test one logical behavior per test method to keep failures easy to diagnose.

## 2. Character Encoding & Platform Independence
- **Avoid Raw Accents**: Never hardcode platform-dependent characters (like `é` or `á`) directly in String comparisons or source file constants unless properly escaped.
- **Normalize Inputs**: Always normalize date/time and day strings by stripping accents/diacritical marks and converting to lowercase before doing comparisons.
- **Use Unicode Escapes**: If accent characters are strictly necessary in String constants, use their Unicode escape sequence (e.g., `\u00e9` for `é`, `\u00e1` for `á`) to ensure compiler and environment independence.

## 3. Java Design & Architecture
- **Composition over Inheritance**: Combine different availability calendars (jornadas) using list composition.
- **Order Independence**: Evaluating collections of rules (like list of jornadas) must be pure and order-independent.
- **Precedence Rules**: Ensure that exceptional calendar events (such as `JornadaDiaDelMesExcepcional`) always take precedence over default calendar patterns.

## 4. Clean Code & Readability
- **Self-Documenting Code**: Choose descriptive, intentional names for classes, methods, and variables. Avoid vague abbreviations.
- **Single Responsibility Principle (SRP)**: Each class/method should do one thing and do it well. Keep methods small and focused.
- **Preserve Comments**: Maintain existing documentation, but update/add javadocs when introducing new patterns or modifying APIs.
