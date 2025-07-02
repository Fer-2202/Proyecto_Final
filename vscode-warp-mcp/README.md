# VS Code Warp MCP Server

Un servidor MCP (Model Context Protocol) que permite integrar VS Code con Warp AI Terminal, proporcionando herramientas avanzadas para desarrollo.

## 🚀 Características

- **Ejecución de comandos**: Ejecuta comandos directamente en Warp desde VS Code
- **Análisis de proyecto**: Obtiene la estructura completa de archivos del proyecto
- **Análisis de código**: Extrae funciones, clases e imports de archivos de código
- **Integración Git**: Ejecuta comandos Git de forma segura
- **Búsqueda avanzada**: Busca patrones en archivos del proyecto

## 📦 Instalación

### 1. Instalar dependencias

```bash
cd vscode-warp-mcp
npm install
```

### 2. Compilar el proyecto

```bash
npm run build
```

### 3. Configurar VS Code

Agrega la siguiente configuración a tu archivo `settings.json` de VS Code:

```json
{
  "claude-dev.mcpServers": {
    "vscode-warp-mcp": {
      "command": "node",
      "args": ["./dist/index.js"],
      "cwd": "./vscode-warp-mcp"
    }
  }
}
```

## 🛠️ Herramientas Disponibles

### 1. `execute_warp_command`
Ejecuta comandos en Warp terminal.

**Parámetros:**
- `command` (requerido): El comando a ejecutar
- `workingDirectory` (opcional): Directorio de trabajo

**Ejemplo:**
```json
{
  "command": "ls -la",
  "workingDirectory": "/ruta/del/proyecto"
}
```

### 2. `get_project_structure`
Obtiene la estructura de archivos del proyecto.

**Parámetros:**
- `directory` (opcional): Directorio raíz a explorar
- `maxDepth` (opcional): Profundidad máxima (por defecto: 3)
- `includeHidden` (opcional): Incluir archivos ocultos (por defecto: false)

### 3. `analyze_code_file`
Analiza archivos de código y extrae información.

**Parámetros:**
- `filePath` (requerido): Ruta del archivo a analizar
- `analysisType` (opcional): Tipo de análisis ('functions', 'classes', 'imports', 'all')

**Soporta:**
- JavaScript/TypeScript (.js, .ts, .jsx, .tsx)
- Python (.py)

### 4. `run_git_command`
Ejecuta comandos Git de forma segura.

**Parámetros:**
- `gitCommand` (requerido): Comando Git (sin "git" inicial)
- `repository` (opcional): Ruta del repositorio

**Ejemplo:**
```json
{
  "gitCommand": "status --short",
  "repository": "/ruta/del/repo"
}
```

### 5. `search_in_files`
Busca patrones en archivos del proyecto.

**Parámetros:**
- `pattern` (requerido): Patrón a buscar
- `filePattern` (opcional): Patrón de archivos (ej: "*.js")
- `directory` (opcional): Directorio donde buscar
- `caseSensitive` (opcional): Búsqueda sensible a mayúsculas

## 🔧 Desarrollo

### Ejecutar en modo desarrollo
```bash
npm run dev
```

### Compilar para producción
```bash
npm run build
```

### Observar cambios
```bash
npm run watch
```

## 📋 Ejemplos de Uso

### Ejecutar comandos de Node.js
```json
{
  "tool": "execute_warp_command",
  "args": {
    "command": "node --version"
  }
}
```

### Analizar un archivo React
```json
{
  "tool": "analyze_code_file",
  "args": {
    "filePath": "./src/components/Button.tsx",
    "analysisType": "all"
  }
}
```

### Obtener el estado de Git
```json
{
  "tool": "run_git_command",
  "args": {
    "gitCommand": "status --porcelain"
  }
}
```

### Buscar funciones en archivos TypeScript
```json
{
  "tool": "search_in_files",
  "args": {
    "pattern": "function.*\\(",
    "filePattern": "*.ts",
    "caseSensitive": false
  }
}
```

## 🔒 Seguridad

- Los comandos se ejecutan con los permisos del usuario actual
- Se validan las rutas de archivos para evitar acceso no autorizado
- Los comandos Git se ejecutan de forma controlada
- Se limitan los resultados de búsqueda para evitar sobrecarga

## 🐛 Resolución de Problemas

### Error: "Comando no encontrado"
- Verifica que el comando esté disponible en tu PATH
- Para comandos específicos de Warp, asegúrate de que Warp esté instalado

### Error: "Archivo no encontrado"
- Verifica que la ruta del archivo sea correcta
- Usa rutas absolutas cuando sea necesario

### Error: "Permisos denegados"
- Verifica que tengas permisos de lectura/escritura en el directorio
- En Windows, ejecuta VS Code como administrador si es necesario

## 📝 Licencia

MIT License - ver archivo LICENSE para más detalles.

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Si encuentras algún problema o tienes preguntas, por favor abre un issue en el repositorio.
