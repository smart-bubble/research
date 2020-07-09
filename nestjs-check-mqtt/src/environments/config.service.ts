import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor(filePath: string) {
    this.envConfig = dotenv.parse(
      fs.readFileSync(`src/environments/${filePath}.env`),
    );
    const tempsave = process.env.NODE_ENV
    for (const k in this.envConfig) {
      process.env[k] = this.envConfig[k]
    }
    process.env.NODE_ENV = tempsave;
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
