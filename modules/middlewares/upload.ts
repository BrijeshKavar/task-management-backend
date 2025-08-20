import multer, { Multer, FileFilterCallback } from 'multer';
import { Request } from 'express';

const upload: Multer = multer({
  dest: '/tmp/',
  fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (
      (file.mimetype == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        file.mimetype.includes('excel') ||
        file.mimetype.includes('spreadsheetml')) &&
      file.fieldname === 'file'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Invalid upload: fieldname should be test_doc and .xlsx format'));
    }
  }
});

export default upload;
