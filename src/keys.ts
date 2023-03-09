import {BindingKey} from '@loopback/core';
import {FileUpload} from './services/file-upload.service'; // Binding key for the file upload service
export const FILE_UPLOAD_SERVICE =
   BindingKey.create<FileUpload>('services.FileUpload',);// Binding key for the storage directory
export const STORAGE_DIRECTORY = BindingKey.create<string>
   ('storage.directory');
