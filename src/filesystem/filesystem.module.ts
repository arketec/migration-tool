import { Module } from '@nestjs/common';
import { exists, mkdir, readdir, readFile, rmdir, unlink, writeFile } from 'fs';
import { promisify } from 'util';
import {
  FILESYSTEM_SERVICE_TOKEN,
  FilesystemService,
} from './filesystem.service';

@Module({
  providers: [
    {
      provide: FILESYSTEM_SERVICE_TOKEN,
      useValue: {
        readFile: async (path: string, encoding: string) => {
          const f = await promisify(readFile)(path, {
            encoding: encoding as BufferEncoding,
          });
          return f;
        },
        writeFile: async (path: string, data: string, encoding: string) => {
          await promisify(writeFile)(path, data, {
            encoding: encoding as BufferEncoding,
          });
        },
        exists: async (path: string) => {
          return new Promise((resolve) => {
            exists(path, (exists) => {
              resolve(exists);
            });
          });
        },
        mkdir: async (path: string) => {
          return promisify(mkdir)(path);
        },
        readdir: async (path: string) => {
          return promisify(readdir)(path);
        },
        unlink: async (path: string) => {
          return promisify(unlink)(path);
        },
        rmdir: async (path: string) => {
          return promisify(rmdir)(path);
        },
      },
    },
    FilesystemService,
  ],
  exports: [FilesystemService],
})
export class FilesystemModule {}
