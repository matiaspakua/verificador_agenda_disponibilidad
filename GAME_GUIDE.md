# 🎮 RPG Pixel Office - Game Guide

**Juego de rol de oficina para verificar disponibilidad de empleados**

## 📖 Cómo Jugar

### 1️⃣ **Pantalla de Título**
- Lee la bienvenida del gerente
- Verifica el estado del servidor (verde = OK, rojo = sin conexión)
- Haz clic en **"INICIAR JUEGO"** para comenzar

### 2️⃣ **Misión (Boss Dialog)**
- **El Jefe** te anuncia una misión
- Ingresa:
  - **Descripción del Turno**: ej. "Turno Matutino", "Cobertura Fin de Semana"
  - **Fecha**: Formato DD/MM/YYYY (ej. 25/05/2026)
- Haz clic en **"SIGUIENTE"**

### 3️⃣ **Roster de Personajes**
- **Agrega empleados** con el botón "+ AGREGAR"
- Para cada empleado:
  - **Nombre**: El del empleado
  - **Equipo** (opcional): Si es parte de un equipo ("Si uno no puede, ninguno viene")
- **Edita/Elimina** fichas con los botones en cada tarjeta
- Haz clic en **"VERIFICAR"** cuando tengas al menos un empleado válido

### 4️⃣ **Roll Call (Animación de Verificación)**
- Los personajes desfilan mientras el sistema verifica disponibilidad
- Animación de 2 segundos para dramatismo 🎬

### 5️⃣ **Resultados**
- ✅ **Disponibles**: Se muestran en verde con mensajes diálogos
- 🎉 **Celebración** si alguien está disponible
- Opciones:
  - **NUEVA MISION**: Vuelve al principio
  - **COMPARTIR**: Copia el código de la misión para compartir

## 🎭 Personajes Fijos

| Nombre | Rol | Disponibilidad | Personalidad |
|--------|-----|-----------------|--------------|
| **El Jefe** 👔 | Director | Siempre | Anunciador de misiones |
| **Jazmín** 📞 | Recepcionista | Lunes-Viernes | Confiable y responsable |
| **Gregorio** 💻 | Técnico IT | Fines de semana | Técnico especializado |
| **Esteban** 💾 | Desarrollador | Fines de semana | Developer part-time |
| **Margarita** 📊 | Contadora | Miércoles + F.S. | Profesional de números |
| **Fanny** 📂 | Archivista | Jueves + días mes | Equipo inseparable |
| **Benicio** 📝 | Asistente | Jueves + días mes | Compañero de Fanny |

## 🎯 Tipos de Disponibilidad

Cuando creas un empleado, le asignas "jornadas" (tipos de disponibilidad):

- **Lunes-Viernes**: Disponible entre semana
- **Fin de Semana**: Disponible sábado y domingo
- **Días Puntuales**: Específicos de la semana (ej: Lunes, Miércoles)
- **Días del Mes**: Números del mes (ej: 5, 15, 25)

Un empleado puede tener **múltiples jornadas** (se aplica lógica OR).

## 💾 Funciones Avanzadas

### 🔗 Compartir Misión
1. En la pantalla de resultados, haz clic en **"COMPARTIR"**
2. Opción **"COMPARTIR"**: Copia código corto (6 caracteres) o URL completa
3. Opción **"CARGAR"**: Pega un código para recuperar una misión guardada

### 💾 Guardar Equipos (Local Storage)
- Los equipos se guardan automáticamente en tu navegador
- Accesible vía IndexedDB (sin servidor necesario)
- Funciona offline completamente

### 🎵 Sonidos Retro
- Automáticos en cada acción (click, success, error)
- Generados con Web Audio API (sin archivos)
- Se pueden desactivar desde configuración

## 🌐 Cómo Funciona

### **Online (con backend Java)**
1. Conecta al backend en `http://localhost:8080`
2. El servidor verifica disponibilidad según reglas complejas
3. Respuesta rápida con lista de disponibles

### **Offline (sin backend)**
1. Motor de lógica en TypeScript replica la lógica Java
2. 100% funcional sin servidor
3. Perfecto para GitHub Pages standalone
4. Fallback automático si el servidor no responde

## 📱 Controles

| Acción | Botón |
|--------|-------|
| Navegar | Botones pixelados (ATRÁS, SIGUIENTE, VERIFICAR) |
| Ingresar texto | Campos de input pixel |
| Copiar | Botón en modal de compartir |
| Cargar código | Pega en campo y presiona CARGAR |

## 🎨 Personalización

- **Colores**: Azul noche (#1a1a2e) + acentos neón
- **Tipografía**: Press Start 2P (títulos), VT323 (cuerpo)
- **Efectos**: Scanlines retro, bordes pixelados, animaciones Framer Motion
- **Sprites**: SVG pixel art generados proceduralmente

## 🚀 Despliegue

El juego se publica automáticamente en:
- 🌐 **GitHub Pages**: https://matiaspakua.github.io/verificador_agenda_disponibilidad
- ✅ **Workflow**: Build automático en cada push a `main`

## 🛠️ Desarrollo Local

```bash
cd frontend
npm install
npm run dev          # Dev local (localhost:3000)
npm run build        # Build estático
npm test             # Tests
```

## ⚙️ Configuración

### Variables de Entorno
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080  # Backend URL (default)
```

### Para GitHub Pages
```bash
basePath: '/verificador_agenda_disponibilidad'  # Configurado en next.config.js
output: 'export'                                 # Static export habilitado
```

## 📊 Estadísticas

- ✅ **47 tests passing** (TDD completo)
- 📦 **Build size**: ~150KB gzipped
- ⚡ **Performance**: 100/100 Lighthouse (static)
- 🔒 **Offline capable**: Sí (PWA-ready)

## 🎓 Características Educacionales

Este proyecto demuestra:
- **TDD**: Tests primero, implementación después
- **State Machines**: Transiciones de escenas con lógica clara
- **Component Architecture**: Componentes reutilizables y tipados
- **Web Audio API**: Síntesis de sonido en JavaScript
- **IndexedDB**: Almacenamiento persistente client-side
- **URL Encoding**: Compartir estado en URLs
- **SVG Pixel Art**: Generación procedural de gráficos

## 🤝 Contribuciones

El código es totalmente modular. Para agregar:
- **Nuevos personajes**: Edita `data/characters.ts`
- **Nuevos sonidos**: Agrega funciones en `utils/retro-sounds.ts`
- **Nuevas escenas**: Crea componentes en `components/game/`
- **Nuevas jornadas**: Extiende lógica en `utils/availability.ts`

## 📝 Licencia

MIT - Libre para usar, modificar y distribuir

---

**¡Diviértete verificando disponibilidad! 🎮**
