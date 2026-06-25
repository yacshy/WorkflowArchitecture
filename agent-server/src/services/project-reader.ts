import * as fs from 'fs';
import * as path from 'path';
import { ProjectStructure, ProjectFile } from '../types';

// Directories to skip
const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', 'build', '.next', 'coverage', '__pycache__']);
// File extensions to treat as code
const CODE_EXTENSIONS = new Set([
  '.ts', '.tsx', '.js', '.jsx', '.json', '.html', '.css', '.scss',
  '.py', '.java', '.go', '.rs', '.rb', '.php',
  '.yaml', '.yml', '.xml', '.sql',
]);

class ProjectReaderService {
  async readProject(rootPath: string, maxFiles: number = 50): Promise<ProjectStructure> {
    const absPath = path.resolve(rootPath);

    if (!fs.existsSync(absPath)) {
      throw new Error(`Project path does not exist: ${absPath}`);
    }

    const stat = fs.statSync(absPath);
    if (!stat.isDirectory()) {
      throw new Error(`Project path is not a directory: ${absPath}`);
    }

    const files: ProjectFile[] = [];
    const treeLines: string[] = [];
    const dirName = path.basename(absPath);

    this.walkDirectory(absPath, absPath, '', files, treeLines, 0, maxFiles);

    const summary = `Project: ${dirName}\n` +
      `Root: ${absPath}\n` +
      `Total files read: ${files.length}\n` +
      `Directories scanned: ${treeLines.filter(l => l.trimEnd().endsWith('/')).length + 1}`;

    return {
      rootPath: absPath,
      tree: `${dirName}/\n${treeLines.join('\n')}`,
      files,
      summary,
    };
  }

  private walkDirectory(
    rootPath: string,
    currentPath: string,
    prefix: string,
    files: ProjectFile[],
    treeLines: string[],
    depth: number,
    maxFiles: number,
  ): void {
    if (depth > 4) return; // Max depth 4
    if (files.length >= maxFiles) return;

    let entries: string[];
    try {
      entries = fs.readdirSync(currentPath);
    } catch {
      return;
    }

    const dirs: string[] = [];
    const fileEntries: string[] = [];

    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry);
      let stat: fs.Stats;
      try {
        stat = fs.statSync(fullPath);
      } catch {
        continue;
      }

      if (stat.isDirectory()) {
        if (!SKIP_DIRS.has(entry) && !entry.startsWith('.')) {
          dirs.push(entry);
        }
      } else if (stat.isFile()) {
        const ext = path.extname(entry).toLowerCase();
        if (CODE_EXTENSIONS.has(ext)) {
          fileEntries.push(entry);
        }
      }
    }

    // Sort for consistent output
    dirs.sort();
    fileEntries.sort();

    for (let i = 0; i < dirs.length; i++) {
      const isLast = i === dirs.length - 1 && fileEntries.length === 0;
      const connector = isLast ? '└── ' : '├── ';
      treeLines.push(`${prefix}${connector}${dirs[i]}/`);
      const subPrefix = prefix + (isLast ? '    ' : '│   ');
      const subPath = path.join(currentPath, dirs[i]);
      this.walkDirectory(rootPath, subPath, subPrefix, files, treeLines, depth + 1, maxFiles);
    }

    for (let i = 0; i < fileEntries.length; i++) {
      const isLast = i === fileEntries.length - 1;
      const connector = isLast ? '└── ' : '├── ';
      treeLines.push(`${prefix}${connector}${fileEntries[i]}`);

      if (files.length < maxFiles) {
        const filePath = path.join(currentPath, fileEntries[i]);
        try {
          const content = fs.readFileSync(filePath, 'utf-8');
          const relativePath = path.relative(rootPath, filePath);
          const ext = path.extname(filePath).toLowerCase();
          const langMap: Record<string, string> = {
            '.ts': 'typescript', '.tsx': 'tsx', '.js': 'javascript',
            '.jsx': 'jsx', '.py': 'python', '.json': 'json',
            '.html': 'html', '.css': 'css', '.yaml': 'yaml', '.yml': 'yaml',
            '.sql': 'sql', '.java': 'java', '.go': 'go', '.rs': 'rust',
            '.rb': 'ruby', '.php': 'php',
          };
          files.push({
            path: relativePath,
            content: content.substring(0, 6000), // Limit file content
            language: langMap[ext] || 'text',
          });
        } catch {
          // Skip files that can't be read
        }
      }
    }
  }
}

export const projectReaderService = new ProjectReaderService();