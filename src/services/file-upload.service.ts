import { /* inject, */ BindingScope, config, ContextTags, injectable, Provider} from '@loopback/core';
import {RequestHandler} from 'express-serve-static-core';
import multer from 'multer';
import {FILE_UPLOAD_SERVICE} from '../keys';
/*
 * Fix the service type. Possible options can be:
 * - import {FileUpload} from 'your-module';
 * - export type FileUpload = string;
 * - export interface FileUpload {}
 */
export type FileUpload = RequestHandler;

@injectable({
  scope: BindingScope.TRANSIENT,
  tags: {[ContextTags.KEY]: FILE_UPLOAD_SERVICE}
})
export class FileUploadProvider implements Provider<FileUpload> {
  constructor(@config() private options: multer.Options = {}) {
    if (!this.options.storage) {
      // Default to in-memory storage
      this.options.storage = multer.memoryStorage();
    }
  }

  value(): FileUpload {
    return multer(this.options).any();
  }
}
