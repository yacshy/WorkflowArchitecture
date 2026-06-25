import * as fs from 'fs';
import * as path from 'path';
import { config } from '../config';
import { KnowledgeEntry } from '../types';

class KnowledgeService {
  private entries: KnowledgeEntry[] = [];

  async loadAll(): Promise<void> {
    this.entries = [];

    // Load handbook
    await this.loadFile(config.handbookPath, 'handbook');
    // Load reference
    await this.loadFile(config.referencePath, 'reference');
    // Load cases
    await this.loadCases();

    console.log(`[Knowledge] Loaded ${this.entries.length} entries: ` +
      `${this.entries.filter(e => e.source === 'handbook').length} handbook, ` +
      `${this.entries.filter(e => e.source === 'reference').length} reference, ` +
      `${this.entries.filter(e => e.source === 'case').length} cases`);
  }

  private async loadFile(filePath: string, source: 'handbook' | 'reference'): Promise<void> {
    try {
      if (!fs.existsSync(filePath)) {
        console.warn(`[Knowledge] File not found: ${filePath}`);
        return;
      }
      const content = fs.readFileSync(filePath, 'utf-8');
      this.parseChapters(content, source);
    } catch (err) {
      console.error(`[Knowledge] Error loading ${filePath}:`, err);
    }
  }

  private async loadCases(): Promise<void> {
    try {
      if (!fs.existsSync(config.casesDir)) {
        console.log(`[Knowledge] Cases directory not found: ${config.casesDir}, skipping.`);
        return;
      }
      const files = fs.readdirSync(config.casesDir).filter(f => f.endsWith('.md'));
      for (const file of files) {
        const filePath = path.join(config.casesDir, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        this.entries.push({
          title: `Case: ${file}`,
          content,
          source: 'case',
        });
      }
    } catch (err) {
      console.error(`[Knowledge] Error loading cases:`, err);
    }
  }

  private parseChapters(content: string, source: 'handbook' | 'reference'): void {
    // Handbook uses "## " for chapter headings
    // Reference uses "# " for top-level sections
    const headingPattern = source === 'handbook' ? /^## (.+)$/gm : /^# (.+)$/gm;
    const sections = content.split(headingPattern);

    if (sections.length <= 1) {
      // No chapters found, store entire content as one entry
      this.entries.push({
        title: source === 'handbook' ? 'Handbook (full)' : 'Reference (full)',
        content: content.substring(0, 8000), // Limit to 8000 chars per entry
        source,
      });
      return;
    }

    // sections[0] is content before first heading
    let currentTitle = source === 'handbook' ? 'Handbook' : 'Reference';
    let currentContent = sections[0] || '';

    for (let i = 1; i < sections.length; i++) {
      const part = sections[i].trim();
      if (i % 2 === 1) {
        // This is a heading
        if (currentContent) {
          this.entries.push({
            title: currentTitle,
            content: currentContent.substring(0, 8000),
            source,
          });
        }
        currentTitle = part;
        currentContent = '';
      } else {
        // This is content
        currentContent = part;
      }
    }

    // Push the last section
    if (currentContent) {
      this.entries.push({
        title: currentTitle,
        content: currentContent.substring(0, 8000),
        source,
      });
    }
  }

  async reload(): Promise<void> {
    await this.loadAll();
  }

  getEntries(): KnowledgeEntry[] {
    return this.entries;
  }

  getKnowledgeSummary(): string {
    const parts = this.entries.map(e =>
      `--- ${e.title} (${e.source}) ---\n${e.content.substring(0, 2000)}`
    );
    return parts.join('\n\n').substring(0, 32000);
  }
}

export const knowledgeService = new KnowledgeService();