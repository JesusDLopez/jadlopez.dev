# 🤖 Guía Completa de Claude Code

> **Guía práctica para usar Claude Code desde la web y CLI**

---

## 📱 ¿Qué es Claude Code?

**Claude Code** es un asistente de IA especializado en programación que puede:
- Analizar y entender tu código completo
- Hacer cambios en múltiples archivos
- Ejecutar comandos (git, npm, tests, etc.)
- Crear commits y pull requests
- Debuggear y refactorizar código
- Escribir documentación

---

## 🌐 Claude Code Web vs CLI

### **Claude Code en el Navegador (lo que estás usando ahora)**

#### ✅ **Ventajas:**
- **Acceso desde cualquier lugar** - Solo necesitas internet
- **No requiere instalación** - Funciona directo desde claude.ai/code
- **Ejecución en la nube** - Corre en servidores de Anthropic
- **Perfecto para móvil** - Puedes revisar y aprobar cambios desde tu teléfono
- **Integración con GitHub** - Trabaja directo con tus repos

#### 📋 **Cómo funciona:**
1. Te autenticas con GitHub
2. Seleccionas un repositorio
3. Claude clona el repo en una VM aislada
4. Claude hace cambios y crea branches
5. Puedes revisar y hacer merge desde GitHub

#### ⚠️ **Limitaciones:**
- Solo funciona con GitHub (no GitLab, etc.)
- Comparte límites de uso con tu cuenta de Claude
- Requiere conexión a internet
- Acceso de red limitado (solo dominios permitidos)

### **Claude Code CLI (Terminal)**

#### ✅ **Ventajas:**
- **Control total** - Trabaja con archivos locales
- **Funciona offline** (una vez instalado)
- **Más rápido** - No hay latencia de red
- **Funciona con cualquier repo** (GitHub, GitLab, local)
- **Scripting y automatización** - Puedes integrarlo en workflows

#### 📦 **Instalación:**
```bash
# Instalar Claude Code CLI
npm install -g @anthropic-ai/claude-code

# O con brew (Mac/Linux)
brew install anthropic/tap/claude-code

# Iniciar sesión interactiva
claude
```

#### 🔧 **Comandos básicos:**
```bash
# Modo interactivo (conversación)
claude

# Pregunta directa y sale
claude -p "¿cómo funciona este código?"

# Continuar sesión anterior
claude -c

# Procesar archivo
cat index.js | claude -p "optimiza este código"

# Actualizar Claude
claude update
```

---

## 📱 Visualizar Código desde Móvil

### **Opción 1: Claude Code Web (Recomendada para móvil)**

**URL:** https://claude.ai/code

✅ **Perfecto para revisar cambios:**
- Ver el código que Claude modificó
- Aprobar o rechazar sugerencias
- Monitorear tareas en progreso
- Hacer preguntas rápidas

📱 **Desde iOS:** La app de Claude te permite:
- Monitorear tareas activas
- Ver progreso en tiempo real
- Aprobar/rechazar cambios
- Continuar conversaciones

### **Opción 2: GitHub Mobile**

**Apps:**
- GitHub Mobile (iOS/Android)
- Working Copy (iOS - Git cliente)

✅ **Ideal para:**
- Ver Pull Requests creados por Claude
- Revisar diffs y cambios
- Hacer code review
- Hacer merge de PRs

### **Opción 3: VS Code en Móvil**

**Opciones:**
- code-server (VS Code en el navegador)
- GitHub Codespaces (VS Code en la nube)
- CodeSandbox Mobile

### **Flujo Recomendado:**
```
1. Pides a Claude hacer cambios (desde móvil o desktop)
2. Claude crea un branch y hace cambios
3. Claude crea un Pull Request
4. Revisas el PR en GitHub Mobile
5. Haces merge cuando todo esté bien
```

---

## 🔀 ¿Qué es un Pull Request (PR)?

### **Concepto:**
Un **Pull Request** (PR) es una solicitud para **fusionar cambios** de una rama a otra en Git.

### **Flujo típico:**
```
main (rama principal)
  |
  |-- claude/nueva-feature (rama con cambios)
         |
         |--- Pull Request ---> Revisar ---> Merge ---> main
```

### **Para qué sirve:**
✅ **Code Review** - Otros pueden revisar tus cambios antes de aplicarlos
✅ **Discusión** - Comentar líneas específicas de código
✅ **Testing** - CI/CD corre tests automáticos
✅ **Historial** - Mantiene un registro de qué se cambió y por qué
✅ **Reversión** - Fácil revertir si algo sale mal

### **Ejemplo de Claude creando un PR:**

Cuando le pides a Claude:
```
"Agrega una sección de testimonios y crea un PR"
```

Claude hará:
1. ✅ Crea los archivos necesarios
2. ✅ Hace commit: `feat: add testimonials section`
3. ✅ Push a una rama: `claude/add-testimonials-xxxxx`
4. ✅ Crea el PR en GitHub con:
   - Título descriptivo
   - Descripción de los cambios
   - Checklist de testing

Luego tú:
1. 👀 Revisas el PR en GitHub
2. 💬 Comentas si hay algo que cambiar
3. ✅ Haces merge cuando esté listo

### **Comandos útiles de PR:**
```bash
# Ver PRs abiertos
gh pr list

# Ver detalles de un PR
gh pr view 123

# Hacer merge de un PR
gh pr merge 123

# Checkout a un PR localmente para probarlo
gh pr checkout 123
```

---

## 💻 ¿Qué es "Abrir en CLI"?

### **Concepto:**
"Abrir en CLI" significa **transferir la sesión actual** de Claude Code desde la web a tu terminal local.

### **¿Cuándo usarlo?**

✅ **Necesitas trabajar offline**
✅ **Quieres control total sobre el entorno**
✅ **Necesitas instalar dependencias específicas**
✅ **Quieres ejecutar comandos que la web no puede**
✅ **Trabajas con archivos locales no en GitHub**

### **Cómo funciona:**

**Desde la Web:**
1. Estás en una sesión de Claude Code web
2. Ves un botón "Open in CLI"
3. Claude te da instrucciones para continuar localmente

**En tu Terminal:**
```bash
# Claude te dará un comando como:
claude -r "session-id-xxxxx"

# Esto descarga el contexto y continúa la conversación
```

### **Beneficios:**
- Continúas exactamente donde lo dejaste
- Todo el historial de conversación se mantiene
- Puedes cambiar entre web y CLI según necesites

---

## 🎯 Mejores Prácticas para Usar Claude Code

### **1. Entender la Base de Código**

```
❌ MAL:
"Cambia el botón a azul"

✅ BIEN:
"Primero, ¿dónde está definido el sistema de colores del tema?"
Luego: "Actualiza el botón principal usando el color de tema apropiado"
```

### **2. Pedir Cambios Incrementales**

```
❌ MAL:
"Rehaz toda la aplicación con Next.js, TypeScript, y TailwindCSS"

✅ BIEN:
1. "Analiza la estructura actual del proyecto"
2. "Crea un plan para migrar a Next.js paso a paso"
3. "Implementa el primer paso: setup básico"
```

### **3. Usar Referencias de Archivos**

```bash
# Mencionar archivos específicos
"Lee @src/App.jsx y explica el routing"

# Mencionar directorios completos
"Analiza todos los componentes en @src/components/"
```

### **4. Aprovechar Git Branches**

```
✅ BIEN:
"Crea una nueva feature en una rama separada"
"Commitea los cambios con un mensaje descriptivo"
"Crea un PR para revisar antes de hacer merge"
```

### **5. Testing Continuo**

```
❌ MAL:
"Haz 10 cambios diferentes"

✅ BIEN:
"Haz este cambio, luego corre los tests"
"Si pasan, continúa con el siguiente"
```

### **6. Usar Sub-Agentes**

Claude tiene agentes especializados que se activan automáticamente:
- 🔍 **Explore** - Para buscar en el código
- 🧪 **Test Runner** - Para correr tests
- 📝 **Code Reviewer** - Para revisar cambios
- 🐛 **Debugger** - Para encontrar bugs

```
"Usa el agente Explore para encontrar todos los usos de esta función"
```

### **7. Plan Mode**

Para análisis sin modificaciones:
```
"En modo plan, analiza cómo podríamos implementar autenticación"
```

---

## 🛠️ Casos de Uso Prácticos

### **Desde Móvil:**
```
✅ "Revisa el último PR y dime si hay problemas"
✅ "Crea un hotfix para el bug en producción"
✅ "Actualiza la documentación del README"
✅ "Analiza por qué falló el último deploy"
```

### **Desde Desktop (Web o CLI):**
```
✅ "Refactoriza el componente de autenticación"
✅ "Agrega tests para el módulo de pagos"
✅ "Optimiza las queries de la base de datos"
✅ "Implementa la nueva feature X paso a paso"
```

### **Automatización (CLI):**
```bash
# Script para generar changelog
git log --oneline | claude -p "genera un changelog profesional"

# Code review automático
git diff main | claude -p "revisa estos cambios y sugiere mejoras"

# Generar tests
cat src/api.js | claude -p "genera tests unitarios para estas funciones"
```

---

## 📊 Comparación Rápida

| Feature | Web | CLI |
|---------|-----|-----|
| **Acceso desde móvil** | ✅ Excelente | ❌ No |
| **Trabaja con GitHub** | ✅ Nativo | ✅ Sí |
| **Trabaja con GitLab** | ❌ No | ✅ Sí |
| **Archivos locales** | ❌ No | ✅ Sí |
| **Requiere instalación** | ❌ No | ✅ Sí |
| **Offline** | ❌ No | ✅ Parcial |
| **Automatización/Scripts** | ❌ No | ✅ Sí |
| **Monitoreo en vivo** | ✅ Sí | ⚠️ Solo terminal |
| **Mejor para** | Revisión móvil, GitHub | Desarrollo local |

---

## 🚀 Flujo de Trabajo Recomendado

### **Para tu Portfolio:**

```
┌─────────────────────────────────────────┐
│ 1. Ideación (Móvil/Desktop)             │
│    "Quiero agregar una galería de fotos"│
└──────────────┬──────────────────────────┘
               ↓
┌─────────────────────────────────────────┐
│ 2. Planning (Claude Code Web)           │
│    "Analiza la estructura y crea un plan"│
└──────────────┬──────────────────────────┘
               ↓
┌─────────────────────────────────────────┐
│ 3. Implementación (Web o CLI)           │
│    Claude hace cambios en pasos         │
└──────────────┬──────────────────────────┘
               ↓
┌─────────────────────────────────────────┐
│ 4. Testing (Automático)                 │
│    "Corre los tests y verifica el build"│
└──────────────┬──────────────────────────┘
               ↓
┌─────────────────────────────────────────┐
│ 5. Pull Request (Claude crea)           │
│    Branch: claude/add-gallery-xxxxx     │
└──────────────┬──────────────────────────┘
               ↓
┌─────────────────────────────────────────┐
│ 6. Review (GitHub Mobile)               │
│    Revisas los cambios desde tu teléfono│
└──────────────┬──────────────────────────┘
               ↓
┌─────────────────────────────────────────┐
│ 7. Merge & Deploy (GitHub)              │
│    Vercel detecta el merge y deploya    │
└─────────────────────────────────────────┘
```

---

## 💡 Tips Pro

### **1. Usa el historial de Git**
```
"Muéstrame qué cambió en los últimos 5 commits"
"Revierte el commit que rompió el build"
```

### **2. Aprovecha la memoria de contexto**
Claude recuerda toda la conversación:
```
"Usando el patrón que vimos antes, aplícalo al componente de contacto"
```

### **3. Pide explicaciones**
```
"Explica esta función línea por línea"
"¿Por qué elegiste este approach en lugar de X?"
```

### **4. Usa comandos slash personalizados**
Puedes crear tus propios comandos en `.claude/commands/`:
```bash
/deploy - Prepara y deploya a producción
/test-all - Corre todos los tests
/review-pr - Analiza un PR específico
```

### **5. Combina Web + CLI**
- Usa Web para quick fixes desde móvil
- Usa CLI para desarrollo intensivo local
- Transfiere sesiones según necesites

---

## 🆘 Comandos Útiles de Git para PRs

```bash
# Ver el estado actual
git status

# Crear una nueva rama
git checkout -b feature/nueva-funcionalidad

# Ver branches remotos
git branch -r

# Hacer pull de un branch de Claude
git pull origin claude/add-feature-xxxxx

# Ver los cambios en un PR antes de merge
git diff main..claude/add-feature-xxxxx

# Hacer merge manual
git checkout main
git merge claude/add-feature-xxxxx
git push

# Borrar rama después de merge
git branch -d claude/add-feature-xxxxx
git push origin --delete claude/add-feature-xxxxx
```

---

## 📚 Recursos Adicionales

### **Documentación Oficial:**
- 📖 [Claude Code Docs](https://docs.claude.com/en/docs/claude-code/overview.md)
- 🌐 [Claude Code Web](https://docs.claude.com/en/docs/claude-code/claude-code-on-the-web.md)
- 💻 [CLI Reference](https://docs.claude.com/en/docs/claude-code/cli-reference.md)

### **GitHub:**
- 📱 [GitHub Mobile](https://github.com/mobile)
- 📘 [GitHub CLI](https://cli.github.com/)
- 📝 [Pull Requests Guide](https://docs.github.com/en/pull-requests)

---

## ❓ Preguntas Frecuentes

**Q: ¿Puedo usar Claude Code gratis?**
A: Sí, pero con límites de uso compartidos con tu cuenta de Claude.

**Q: ¿Los cambios son permanentes inmediatamente?**
A: No, Claude crea branches y PRs. Tú decides cuándo hacer merge.

**Q: ¿Puedo revertir cambios?**
A: Sí, siempre puedes usar `git revert` o cerrar el PR sin hacer merge.

**Q: ¿Funciona con repos privados?**
A: Sí, con los permisos apropiados de GitHub.

**Q: ¿Claude puede romper mi código?**
A: Claude hace cambios en branches separados. Tu código principal (main) está seguro hasta que hagas merge.

**Q: ¿Puedo usar Claude Code para aprender?**
A: ¡Absolutamente! Es excelente para:
- Entender código que no escribiste
- Aprender mejores prácticas
- Ver diferentes formas de resolver problemas

---

**¡Listo para usar Claude Code como un pro! 🚀**

*Última actualización: Nov 2025*
