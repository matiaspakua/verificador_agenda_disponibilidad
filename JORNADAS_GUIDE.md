# 📋 Guía de Configuración de Jornadas (Disponibilidad)

## ¿Qué son las Jornadas?

Una **Jornada** es un patrón de disponibilidad laboral. Define **CUÁNDO** un empleado puede trabajar.

## 4 Tipos de Jornadas

### 1️⃣ **Entre Semana (Lunes a Viernes)**
```
Disponible: L, M, X, J, V
No disponible: S, D
```
**Uso ideal**: Empleados con horario tradicional de oficina.

**Ejemplo**: Jazmín (recepcionista)

---

### 2️⃣ **Fines de Semana (Sábado y Domingo)**
```
Disponible: S, D
No disponible: L-V
```
**Uso ideal**: Empleados con disponibilidad solo en fines de semana.

**Ejemplo**: Gregorio y Esteban (técnico IT y developer)

---

### 3️⃣ **Días Puntuales (Específicos de la Semana)**
```
Disponible: Miércoles, Viernes (por ejemplo)
No disponible: Resto de días
```
**Uso ideal**: Empleados con horarios mixtos.

**Ejemplo**: Margarita (contadora - disponible Miércoles + fines de semana)
- Necesita 2 jornadas: 
  1. Días Puntuales: Miércoles
  2. Fines de Semana

---

### 4️⃣ **Días del Mes (Números Específicos)**
```
Disponible: 2, 3, 5, 7, 20-28
No disponible: Resto de números
```
**Uso ideal**: Empleados con disponibilidad según fechas del mes.

**Ejemplo**: Fanny y Benicio (archivistas - todos los jueves + números específicos)
- Necesita 2 jornadas:
  1. Días Puntuales: Jueves
  2. Días del Mes: 2, 3, 5, 7, 20, 21, 22, 23, 24, 25, 26, 27, 28

---

## Múltiples Jornadas

Un empleado puede tener **VARIAS jornadas a la vez**. Se aplica lógica **OR**:

```
Si empleado tiene:
  - Jornada 1: Entre Semana (L-V)
  - Jornada 2: Días del Mes: 1, 15

Entonces está disponible si:
  - Es entre semana (L-V) **O**
  - Es día 1 o 15 del mes (sin importar qué día de la semana)
```

**Ejemplo real**: Un empleado puede trabajar:
- Lunes a Viernes (Entre Semana) **O**
- Miércoles (Días Puntuales) **O**
- Día 25 del mes (Días del Mes)

---

## Cómo Configurar Jornadas en el Juego

### Paso 1: Agregar Empleado
1. En "Roster de Personajes", haz clic en **"+ AGREGAR"**
2. Ingresa nombre del empleado

### Paso 2: Configurar Disponibilidad
1. Haz clic en botón **"HORARIOS"** de la tarjeta del empleado
2. Se abre editor de jornadas

### Paso 3: Agregar Jornadas
En el modal de edición, elige el tipo:

#### **Para Entre Semana o Fines de Semana**:
- Clic en botón "L-V" o "S-D"
- ¡Automáticamente configurado!

#### **Para Días Puntuales**:
- Clic en botón "DÍAS"
- Selecciona cuáles (ej: lunes, miércoles, viernes)
- Click "AGREGAR"

#### **Para Días del Mes**:
- Clic en botón "DEL MES"
- Selecciona números (ej: 2, 5, 15, 20)
- Click "AGREGAR"

### Paso 4: Múltiples Jornadas
- Repite el paso 3 para agregar más jornadas
- Cada una aparece como línea en la lista

### Paso 5: Guardar
- Click en "GUARDAR" para confirmar

---

## Ejemplos Prácticos

### Empleado A: Recepcionista (Jazmín)
```
Disponible: Lunes a Viernes (todo el mes)
Jornada:
  - Entre Semana
```

### Empleado B: Técnico Part-time (Gregorio)
```
Disponible: Sábado y Domingo (siempre)
Jornada:
  - Fines de Semana
```

### Empleado C: Contadora Mixta (Margarita)
```
Disponible: Miércoles + Sábado + Domingo
Jornadas:
  - Días Puntuales: Miércoles
  - Fines de Semana
```

### Empleado D: Archivista con Calendario (Fanny)
```
Disponible: Todos los jueves + días 2,3,5,7,20-28
Jornadas:
  - Días Puntuales: Jueves
  - Días del Mes: 2, 3, 5, 7, 20, 21, 22, 23, 24, 25, 26, 27, 28
```

---

## Regla de Equipos 🤝

Si 2 empleados están en el mismo equipo:
- **AMBOS deben estar disponibles** para la fecha
- Si uno no puede, **NINGUNO aparece** en resultados

**Ejemplo**:
```
Fanny (equipo: "archivo") - Disponible jueves ✓
Benicio (equipo: "archivo") - Disponible jueves ✓
→ AMBOS aparecen en resultados ✓

Fanny (equipo: "archivo") - No disponible martes ✗
Benicio (equipo: "archivo") - Disponible martes ✓
→ NINGUNO aparece (equipo incompleto) ✗
```

---

## Verificación

Una vez configurados todos los empleados y jornadas:
1. Haz clic en **"VERIFICAR"**
2. El juego verifica quién puede trabajar ese día
3. Aparecen disponibles con sus personajes y diálogos

---

## Tips 💡

- **Comienza simple**: Prueba con empleados de una sola jornada
- **Prueba combinaciones**: Experimenta con múltiples jornadas
- **Usa el botón HORARIOS**: Es más fácil que editar después
- **Recuerda los equipos**: Si están en equipo, deben coincidir
- **Cambios en vivo**: Edita jornadas en cualquier momento

---

## Preguntas Frecuentes

**P: ¿Un empleado puede no tener jornadas?**  
R: No. Debe tener al menos 1 jornada para ser válido.

**P: ¿Puedo tener 3+ jornadas en un empleado?**  
R: Sí. Agrega todas las que necesites. Se aplica lógica OR.

**P: ¿Qué pasa si un equipo tiene disponibilidades conflictivas?**  
R: Si uno del equipo no puede trabajar, nadie del equipo aparece.

**P: ¿Puedo cambiar jornadas después de ingresar?**  
R: Sí. Abre nuevamente el editor HORARIOS y edita.

---

**¡Ahora tu verificador de disponibilidad tiene sentido! 🎮**
