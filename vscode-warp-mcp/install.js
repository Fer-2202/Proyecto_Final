#!/usr/bin/env node

import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class MCPInstaller {
  constructor() {
    this.projectRoot = __dirname;
    this.vscodeSettingsPath = this.findVSCodeSettingsPath();
  }

  findVSCodeSettingsPath() {
    // Rutas comunes para configuraciones de VS Code
    const userHome = process.env.HOME || process.env.USERPROFILE;
    const possiblePaths = [
      path.join(userHome, '.vscode', 'settings.json'),
      path.join(userHome, 'AppData', 'Roaming', 'Code', 'User', 'settings.json'), // Windows
      path.join(userHome, 'Library', 'Application Support', 'Code', 'User', 'settings.json'), // macOS
      path.join(userHome, '.config', 'Code', 'User', 'settings.json'), // Linux
    ];

    return possiblePaths;
  }

  async checkNodeVersion() {
    try {
      const { stdout } = await execAsync('node --version');
      const version = stdout.trim();
      console.log(`✅ Node.js detectado: ${version}`);
      
      const majorVersion = parseInt(version.substring(1).split('.')[0]);
      if (majorVersion < 18) {
        console.warn(`⚠️  Se recomienda Node.js 18 o superior. Versión actual: ${version}`);
      }
      return true;
    } catch (error) {
      console.error('❌ Node.js no está instalado o no está en el PATH');
      return false;
    }
  }

  async installDependencies() {
    console.log('📦 Instalando dependencias...');
    try {
      const { stdout, stderr } = await execAsync('npm install', { cwd: this.projectRoot });
      console.log('✅ Dependencias instaladas correctamente');
      if (stderr) {
        console.log('ℹ️  Advertencias:', stderr);
      }
      return true;
    } catch (error) {
      console.error('❌ Error al instalar dependencias:', error.message);
      return false;
    }
  }

  async buildProject() {
    console.log('🔨 Compilando proyecto...');
    try {
      const { stdout, stderr } = await execAsync('npm run build', { cwd: this.projectRoot });
      console.log('✅ Proyecto compilado correctamente');
      if (stderr) {
        console.log('ℹ️  Advertencias de compilación:', stderr);
      }
      return true;
    } catch (error) {
      console.error('❌ Error al compilar proyecto:', error.message);
      return false;
    }
  }

  async findExistingVSCodeSettings() {
    for (const settingsPath of this.vscodeSettingsPath) {
      try {
        await fs.access(settingsPath);
        return settingsPath;
      } catch (error) {
        // El archivo no existe, continuar con el siguiente
        continue;
      }
    }
    return null;
  }

  async updateVSCodeSettings() {
    console.log('⚙️  Configurando VS Code...');
    
    const existingSettingsPath = await this.findExistingVSCodeSettings();
    
    const mcpConfig = {
      "claude-dev.mcpServers": {
        "vscode-warp-mcp": {
          "command": "node",
          "args": [path.join(this.projectRoot, "dist", "index.js")],
          "cwd": this.projectRoot
        }
      }
    };

    if (existingSettingsPath) {
      try {
        // Leer configuración existente
        const existingContent = await fs.readFile(existingSettingsPath, 'utf-8');
        const existingSettings = JSON.parse(existingContent);
        
        // Combinar configuraciones
        const updatedSettings = {
          ...existingSettings,
          ...mcpConfig
        };
        
        // Escribir configuración actualizada
        await fs.writeFile(existingSettingsPath, JSON.stringify(updatedSettings, null, 2));
        console.log(`✅ Configuración de VS Code actualizada en: ${existingSettingsPath}`);
        
      } catch (error) {
        console.error('❌ Error al actualizar configuración de VS Code:', error.message);
        console.log('ℹ️  Configuración manual requerida. Ver README.md para instrucciones.');
        return false;
      }
    } else {
      // Crear nueva configuración
      const defaultPath = this.vscodeSettingsPath[0];
      const settingsDir = path.dirname(defaultPath);
      
      try {
        await fs.mkdir(settingsDir, { recursive: true });
        await fs.writeFile(defaultPath, JSON.stringify(mcpConfig, null, 2));
        console.log(`✅ Nueva configuración de VS Code creada en: ${defaultPath}`);
      } catch (error) {
        console.error('❌ Error al crear configuración de VS Code:', error.message);
        console.log('ℹ️  Configuración manual requerida. Ver README.md para instrucciones.');
        return false;
      }
    }
    
    return true;
  }

  async createStartScript() {
    const startScript = `#!/usr/bin/env node
// Script de inicio para el MCP Server
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serverPath = path.join(__dirname, 'dist', 'index.js');

console.log('🚀 Iniciando VS Code Warp MCP Server...');
console.log('📍 Ruta del servidor:', serverPath);

const server = spawn('node', [serverPath], {
  stdio: 'inherit',
  cwd: __dirname
});

server.on('error', (error) => {
  console.error('❌ Error al iniciar el servidor:', error.message);
  process.exit(1);
});

server.on('close', (code) => {
  console.log(\`🔚 Servidor cerrado con código: \${code}\`);
  process.exit(code);
});

// Manejar señales de cierre
process.on('SIGINT', () => {
  console.log('\\n🛑 Cerrando servidor...');
  server.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('\\n🛑 Cerrando servidor...');
  server.kill('SIGTERM');
});
`;

    const startScriptPath = path.join(this.projectRoot, 'start.js');
    await fs.writeFile(startScriptPath, startScript);
    console.log('✅ Script de inicio creado');
  }

  async testInstallation() {
    console.log('🧪 Probando instalación...');
    
    try {
      // Verificar que el archivo compilado existe
      const distPath = path.join(this.projectRoot, 'dist', 'index.js');
      await fs.access(distPath);
      console.log('✅ Archivo compilado encontrado');
      
      // Intentar ejecutar el servidor por un momento
      const testProcess = exec(`node "${distPath}"`, { cwd: this.projectRoot });
      
      // Dar tiempo al servidor para iniciarse
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Cerrar el proceso de prueba
      testProcess.kill();
      
      console.log('✅ Servidor MCP puede ejecutarse correctamente');
      return true;
      
    } catch (error) {
      console.error('❌ Error en la prueba:', error.message);
      return false;
    }
  }

  async run() {
    console.log('🎯 Instalador de VS Code Warp MCP Server');
    console.log('==========================================\\n');

    // Verificar Node.js
    if (!(await this.checkNodeVersion())) {
      console.log('\\n❌ Por favor instala Node.js 18 o superior antes de continuar.');
      return false;
    }

    // Instalar dependencias
    if (!(await this.installDependencies())) {
      return false;
    }

    // Compilar proyecto
    if (!(await this.buildProject())) {
      return false;
    }

    // Crear script de inicio
    await this.createStartScript();

    // Configurar VS Code
    await this.updateVSCodeSettings();

    // Probar instalación
    if (await this.testInstallation()) {
      console.log('\\n🎉 ¡Instalación completada exitosamente!');
      console.log('\\n📋 Próximos pasos:');
      console.log('1. Reinicia VS Code');
      console.log('2. Instala la extensión Claude Dev si aún no la tienes');
      console.log('3. El servidor MCP estará disponible automáticamente');
      console.log('\\n🚀 Para iniciar el servidor manualmente:');
      console.log('   npm start');
      console.log('\\n📖 Ver README.md para más información sobre el uso');
      return true;
    } else {
      console.log('\\n⚠️  Instalación completada pero con errores en las pruebas');
      console.log('   Ver README.md para configuración manual');
      return false;
    }
  }
}

// Ejecutar instalador
const installer = new MCPInstaller();
installer.run().catch(console.error);
