import Joi, { ValidationError, ValidationResult } from 'joi';

// to make the file a module and avoid the TypeScript error
export {};

type JoiValidationData = { [key: string]: unknown };

type ErrorMessage = {
  status: number;
  message: string;
  stack: string;
  statusCode: number;
};

type File = {
  /** Name of the form field associated with this file. */
  fieldname: string;
  /** Name of the file on the uploader's computer. */
  originalname: string;
  /**
   * Value of the `Content-Transfer-Encoding` header for this file.
   * @deprecated since July 2015
   * @see RFC 7578, Section 4.7
   */
  encoding: string;
  /** Value of the `Content-Type` header for this file. */
  mimetype: string;
  /** Size of the file in bytes. */
  size: number;
  /**
   * A readable stream of this file. Only available to the `_handleFile`
   * callback for custom `StorageEngine`s.
   */
  stream: Readable;
  /** `DiskStorage` only: Directory to which this file has been uploaded. */
  destination: string;
  /** `DiskStorage` only: Name of this file within `destination`. */
  filename: string;
  /** `DiskStorage` only: Full path to the uploaded file. */
  path: string;
  /** `MemoryStorage` only: A Buffer containing the entire file. */
  buffer: Buffer;
};

declare global {
  namespace Express {
    export interface Request {
      user?: {
        id: number;
        name: string;
        email: string;
        role: "admin" | "manager" | "member";
      };
      file?: File;
      validate: (data: JoiValidationData | JoiValidationData[], validationObject: Joi) => ValidationResult;
      pre?: Record<unknown>;
    }
    export interface Response {
      withData: (data: unknown, message: string, statusCode: number) => void;
      withError: (message: ErrorMessage | string | unknown, statusCode?: number, data?: unknown) => void;
      withValidation: (data: ValidationError['details']) => void;
    }
    export namespace Multer {
      /** Object containing file metadata and access information. */
      interface File {
        /** Name of the form field associated with this file. */
        fieldname: string;
        /** Name of the file on the uploader's computer. */
        originalname: string;
        /**
         * Value of the `Content-Transfer-Encoding` header for this file.
         * @deprecated since July 2015
         * @see RFC 7578, Section 4.7
         */
        encoding: string;
        /** Value of the `Content-Type` header for this file. */
        mimetype: string;
        /** Size of the file in bytes. */
        size: number;
        /**
         * A readable stream of this file. Only available to the `_handleFile`
         * callback for custom `StorageEngine`s.
         */
        stream: Readable;
        /** `DiskStorage` only: Directory to which this file has been uploaded. */
        destination: string;
        /** `DiskStorage` only: Name of this file within `destination`. */
        filename: string;
        /** `DiskStorage` only: Full path to the uploaded file. */
        path: string;
        /** `MemoryStorage` only: A Buffer containing the entire file. */
        buffer: Buffer;
      }
    }
  }
}
