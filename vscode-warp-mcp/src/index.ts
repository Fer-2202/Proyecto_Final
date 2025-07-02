#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs/promises';
import * as path from 'path';

const execAsync = promisify(exec);

class VSCodeWarpMCPServer {
  private server: Server;

  constructor() {
    this.server = new Server(
      {
        name: 'vscode-warp-mcp',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
    this.setupErrorHandling();
  }

  private setupErrorHandling(): void {
    this.server.onerror = (error) => {
      console.error('[MCP Error]', error);
    };

    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  private setupToolHandlers(): void {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'execute_warp_command',
            description: 'Ejecuta un comando en Warp terminal y devuelve el resultado',
            inputSchema: {
              type: 'object',
              properties: {
                command: {
                  type: 'string',
                  description: 'El comando a ejecutar en Warp',
                },
                workingDirectory: {
                  type: 'string',
                  description: 'Directorio de trabajo (opcional)',
                },
              },
              required: ['command'],
            },
          },
          {
            name: 'get_project_structure',
            description: 'Obtiene la estructura de archivos del proyecto actual',
            inputSchema: {
              type: 'object',
              properties: {
                directory: {
                  type: 'string',
                  description: 'Directorio raíz a explorar (por defecto: directorio actual)',
                },
                maxDepth: {
                  type: 'number',
                  description: 'Profundidad máxima de exploración (por defecto: 3)',
                },
                includeHidden: {
                  type: 'boolean',
                  description: 'Incluir archivos ocultos (por defecto: false)',
                },
              },
              required: [],
            },
          },
          {
            name: 'analyze_code_file',
            description: 'Analiza un archivo de código y extrae información relevante',
            inputSchema: {
              type: 'object',
              properties: {
                filePath: {
                  type: 'string',
                  description: 'Ruta del archivo a analizar',
                },
                analysisType: {
                  type: 'string',
                  enum: ['functions', 'classes', 'imports', 'all'],
                  description: 'Tipo de análisis a realizar',
                },
              },
              required: ['filePath'],
            },
          },
          {
            name: 'run_git_command',
            description: 'Ejecuta comandos de Git con manejo seguro',
            inputSchema: {
              type: 'object',
              properties: {
                gitCommand: {
                  type: 'string',
                  description: 'Comando Git a ejecutar (sin "git" al inicio)',
                },
                repository: {
                  type: 'string',
                  description: 'Ruta del repositorio (opcional)',
                },
              },
              required: ['gitCommand'],
            },
          },
          {
            name: 'search_in_files',
            description: 'Busca texto o patrones en archivos del proyecto',
            inputSchema: {
              type: 'object',
              properties: {
                pattern: {
                  type: 'string',
                  description: 'Patrón a buscar',
                },
                filePattern: {
                  type: 'string',
                  description: 'Patrón de archivos donde buscar (ej: "*.js", "*.py")',
                },
                directory: {
                  type: 'string',
                  description: 'Directorio donde buscar (por defecto: directorio actual)',
                },
                caseSensitive: {
                  type: 'boolean',
                  description: 'Búsqueda sensible a mayúsculas (por defecto: false)',
                },
              },
              required: ['pattern'],
            },
          },
        ],
      };
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'execute_warp_command':
            return await this.executeWarpCommand(args);
          case 'get_project_structure':
            return await this.getProjectStructure(args);
          case 'analyze_code_file':
            return await this.analyzeCodeFile(args);
          case 'run_git_command':
            return await this.runGitCommand(args);
          case 'search_in_files':
            return await this.searchInFiles(args);
          default:
            throw new McpError(
              ErrorCode.MethodNotFound,
              `Herramienta desconocida: ${name}`
            );
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        throw new McpError(ErrorCode.InternalError, `Error ejecutando ${name}: ${errorMessage}`);
      }
    });
  }

  private async executeWarpCommand(args: any) {
    const { command, workingDirectory } = args;
    
    if (!command) {
      throw new Error('Se requiere especificar un comando');
    }

    const options = workingDirectory ? { cwd: workingDirectory } : {};
    
    try {
      const { stdout, stderr } = await execAsync(command, options);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              success: true,
              command,
              workingDirectory: workingDirectory || process.cwd(),
              stdout: stdout.trim(),
              stderr: stderr.trim(),
              timestamp: new Date().toISOString(),
            }, null, 2),
          },
        ],
      };
    } catch (error: any) {
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              success: false,
              command,
              workingDirectory: workingDirectory || process.cwd(),
              error: error.message,
              exitCode: error.code,
              stdout: error.stdout?.trim() || '',
              stderr: error.stderr?.trim() || '',
              timestamp: new Date().toISOString(),
            }, null, 2),
          },
        ],
      };
    }
  }

  private async getProjectStructure(args: any) {
    const { directory = process.cwd(), maxDepth = 3, includeHidden = false } = args;
    
    const getDirectoryStructure = async (dir: string, currentDepth: number = 0): Promise<any> => {
      if (currentDepth >= maxDepth) return null;
      
      try {
        const items = await fs.readdir(dir, { withFileTypes: true });
        const structure: any = {};
        
        for (const item of items) {
          if (!includeHidden && item.name.startsWith('.')) continue;
          
          const fullPath = path.join(dir, item.name);
          
          if (item.isDirectory()) {
            const subStructure = await getDirectoryStructure(fullPath, currentDepth + 1);
            if (subStructure) {
              structure[item.name] = { type: 'directory', children: subStructure };
            } else {
              structure[item.name] = { type: 'directory', children: '...' };
            }
          } else {
            const stats = await fs.stat(fullPath);
            structure[item.name] = {
              type: 'file',
              size: stats.size,
              modified: stats.mtime.toISOString(),
              extension: path.extname(item.name),
            };
          }
        }
        
        return structure;
      } catch (error) {
        throw new Error(`No se pudo leer el directorio: ${error}`);
      }
    };

    const structure = await getDirectoryStructure(directory);
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            directory,
            maxDepth,
            includeHidden,
            structure,
            timestamp: new Date().toISOString(),
          }, null, 2),
        },
      ],
    };
  }

  private async analyzeCodeFile(args: any) {
    const { filePath, analysisType = 'all' } = args;
    
    if (!filePath) {
      throw new Error('Se requiere especificar la ruta del archivo');
    }

    try {
      const content = await fs.readFile(filePath, 'utf-8');
      const analysis: any = {
        filePath,
        extension: path.extname(filePath),
        size: content.length,
        lines: content.split('\n').length,
      };

      // Análisis básico basado en la extensión del archivo
      const ext = path.extname(filePath).toLowerCase();
      
      if (['.js', '.ts', '.jsx', '.tsx'].includes(ext)) {
        analysis.language = 'javascript/typescript';
        if (analysisType === 'functions' || analysisType === 'all') {
          analysis.functions = this.extractJSFunctions(content);
        }
        if (analysisType === 'imports' || analysisType === 'all') {
          analysis.imports = this.extractJSImports(content);
        }
        if (analysisType === 'classes' || analysisType === 'all') {
          analysis.classes = this.extractJSClasses(content);
        }
      } else if (['.py'].includes(ext)) {
        analysis.language = 'python';
        if (analysisType === 'functions' || analysisType === 'all') {
          analysis.functions = this.extractPythonFunctions(content);
        }
        if (analysisType === 'imports' || analysisType === 'all') {
          analysis.imports = this.extractPythonImports(content);
        }
        if (analysisType === 'classes' || analysisType === 'all') {
          analysis.classes = this.extractPythonClasses(content);
        }
      }

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(analysis, null, 2),
          },
        ],
      };
    } catch (error) {
      throw new Error(`No se pudo analizar el archivo: ${error}`);
    }
  }

  private extractJSFunctions(content: string): string[] {
    const functionRegex = /(?:function\s+(\w+)|const\s+(\w+)\s*=\s*(?:async\s+)?(?:\([^)]*\)|[^=]+)\s*=>|(\w+)\s*:\s*(?:async\s+)?(?:function|\([^)]*\)\s*=>))/g;
    const functions: string[] = [];
    let match;
    
    while ((match = functionRegex.exec(content)) !== null) {
      functions.push(match[1] || match[2] || match[3]);
    }
    
    return functions;
  }

  private extractJSImports(content: string): string[] {
    const importRegex = /import\s+(?:{[^}]+}|\w+|\*\s+as\s+\w+)\s+from\s+['"]([^'"]+)['"]/g;
    const imports: string[] = [];
    let match;
    
    while ((match = importRegex.exec(content)) !== null) {
      imports.push(match[1]);
    }
    
    return imports;
  }

  private extractJSClasses(content: string): string[] {
    const classRegex = /class\s+(\w+)/g;
    const classes: string[] = [];
    let match;
    
    while ((match = classRegex.exec(content)) !== null) {
      classes.push(match[1]);
    }
    
    return classes;
  }

  private extractPythonFunctions(content: string): string[] {
    const functionRegex = /def\s+(\w+)/g;
    const functions: string[] = [];
    let match;
    
    while ((match = functionRegex.exec(content)) !== null) {
      functions.push(match[1]);
    }
    
    return functions;
  }

  private extractPythonImports(content: string): string[] {
    const importRegex = /(?:from\s+(\S+)\s+import|import\s+(\S+))/g;
    const imports: string[] = [];
    let match;
    
    while ((match = importRegex.exec(content)) !== null) {
      imports.push(match[1] || match[2]);
    }
    
    return imports;
  }

  private extractPythonClasses(content: string): string[] {
    const classRegex = /class\s+(\w+)/g;
    const classes: string[] = [];
    let match;
    
    while ((match = classRegex.exec(content)) !== null) {
      classes.push(match[1]);
    }
    
    return classes;
  }

  private async runGitCommand(args: any) {
    const { gitCommand, repository } = args;
    
    if (!gitCommand) {
      throw new Error('Se requiere especificar un comando Git');
    }

    const command = `git ${gitCommand}`;
    const options = repository ? { cwd: repository } : {};
    
    try {
      const { stdout, stderr } = await execAsync(command, options);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              success: true,
              gitCommand,
              repository: repository || process.cwd(),
              stdout: stdout.trim(),
              stderr: stderr.trim(),
              timestamp: new Date().toISOString(),
            }, null, 2),
          },
        ],
      };
    } catch (error: any) {
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              success: false,
              gitCommand,
              repository: repository || process.cwd(),
              error: error.message,
              exitCode: error.code,
              stdout: error.stdout?.trim() || '',
              stderr: error.stderr?.trim() || '',
              timestamp: new Date().toISOString(),
            }, null, 2),
          },
        ],
      };
    }
  }

  private async searchInFiles(args: any) {
    const { pattern, filePattern = '*', directory = process.cwd(), caseSensitive = false } = args;
    
    if (!pattern) {
      throw new Error('Se requiere especificar un patrón de búsqueda');
    }

    const grepCommand = `grep -r ${caseSensitive ? '' : '-i'} --include="${filePattern}" "${pattern}" "${directory}"`;
    
    try {
      const { stdout, stderr } = await execAsync(grepCommand);
      const results = stdout.trim().split('\n').filter(line => line.length > 0);
      
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              pattern,
              filePattern,
              directory,
              caseSensitive,
              matches: results.length,
              results: results.slice(0, 50), // Limitar a 50 resultados
              timestamp: new Date().toISOString(),
            }, null, 2),
          },
        ],
      };
    } catch (error: any) {
      // grep retorna código de salida 1 cuando no encuentra coincidencias
      if (error.code === 1) {
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                pattern,
                filePattern,
                directory,
                caseSensitive,
                matches: 0,
                results: [],
                timestamp: new Date().toISOString(),
              }, null, 2),
            },
          ],
        };
      }
      
      throw new Error(`Error en la búsqueda: ${error.message}`);
    }
  }

  async run(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('VS Code Warp MCP Server ejecutándose en stdio');
  }
}

const server = new VSCodeWarpMCPServer();
server.run().catch(console.error);
