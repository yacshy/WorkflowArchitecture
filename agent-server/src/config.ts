import * as fs from "fs";
import * as path from "path";
import { AppConfig } from "./types";

function loadEnv(): string {
  const envPath = path.resolve(__dirname, "../.env");
  if (!fs.existsSync(envPath)) {
    return "";
  }
  return fs.readFileSync(envPath, "utf-8");
}

function parseEnv(envContent: string): Record<string, string> {
  const result: Record<string, string> = {};
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.substring(0, eqIdx).trim();
    const value = trimmed.substring(eqIdx + 1).trim();
    result[key] = value;
  }
  return result;
}

class ConfigService {
  private config!: AppConfig;

  constructor() {
    this.load();
  }

  private load(): void {
    const envContent = loadEnv();
    const env = parseEnv(envContent);

    this.config = {
      ollamaBaseUrl: env.OLLAMA_BASE_URL || "http://localhost:11434",
      ollamaModel: env.OLLAMA_MODEL || "qwen2.5:7b",
      port: parseInt(env.PORT || "3000", 10),
      handbookPath: path.resolve(__dirname, "../", env.HANDBOOK_PATH),
      referencePath: path.resolve(__dirname, "../", env.REFERENCE_PATH),
      casesDir: path.resolve(__dirname, "../", env.CASES_DIR),
    };
  }

  get ollamaBaseUrl(): string {
    return this.config.ollamaBaseUrl;
  }

  get ollamaModel(): string {
    return this.config.ollamaModel;
  }

  get port(): number {
    return this.config.port;
  }

  get handbookPath(): string {
    return this.config.handbookPath;
  }

  get referencePath(): string {
    return this.config.referencePath;
  }

  get casesDir(): string {
    return this.config.casesDir;
  }
}

export const config = new ConfigService();
