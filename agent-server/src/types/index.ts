export interface AgentResponse {
  success: boolean;
  result: string;
  error?: string;
}

export interface KnowledgeEntry {
  title: string;
  content: string;
  source: 'handbook' | 'reference' | 'case';
}

export interface ProjectStructure {
  rootPath: string;
  tree: string;
  files: ProjectFile[];
  summary: string;
}

export interface ProjectFile {
  path: string;
  content: string;
  language: string;
}

export interface AppConfig {
  ollamaBaseUrl: string;
  ollamaModel: string;
  port: number;
  handbookPath: string;
  referencePath: string;
  casesDir: string;
}