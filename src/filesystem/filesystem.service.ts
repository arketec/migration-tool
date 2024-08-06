import { Inject, Injectable } from '@nestjs/common';

export const FILESYSTEM_SERVICE_TOKEN = 'FILESYSTEM_SERVICE_TOKEN';
export interface Filesystem {
  readFile: (path: string, encoding: string) => Promise<string>;
  writeFile: (path: string, data: string, encoding: string) => Promise<void>;
  exists: (path: string) => Promise<boolean>;
  mkdir: (path: string) => Promise<void>;
  readdir: (path: string) => Promise<string[]>;
  unlink: (path: string) => Promise<void>;
  rmdir: (path: string) => Promise<void>;
}

@Injectable()
export class FilesystemService {
  constructor(
    @Inject(FILESYSTEM_SERVICE_TOKEN) private readonly fs: Filesystem,
  ) {}

  async readFile(path: string): Promise<string> {
    return this.fs.readFile(path, 'utf8');
  }

  async tryReadFile(
    path: string,
    onFailure?: (e: any) => void,
  ): Promise<string | null> {
    try {
      return await this.readFile(path);
    } catch (e) {
      onFailure?.(e);
    }
    return null;
  }

  async writeFile(path: string, data: string): Promise<void> {
    return this.fs.writeFile(path, data, 'utf8');
  }
  async tryWriteFile(
    path: string,
    data: string,
    onFailure?: (e: any) => void,
  ): Promise<boolean> {
    try {
      await this.writeFile(path, data);
    } catch (e) {
      onFailure?.(e);
      return false;
    }
    return true;
  }

  async mkdir(path: string): Promise<void> {
    return this.fs.mkdir(path);
  }
  async tryMkdir(path: string, onFailure?: (e: any) => void): Promise<boolean> {
    try {
      await this.mkdir(path);
    } catch (e) {
      onFailure?.(e);
      return false;
    }
    return true;
  }
}
