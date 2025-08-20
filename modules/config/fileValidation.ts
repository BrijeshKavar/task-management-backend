import { commonResponse } from '@neiv/config';

export const validateFileSize = (file, arrayOfAllowedFiles = [], fileSize: number) => {
  if (file) {
    const fileExtension = file.originalname.slice(((file.originalname.lastIndexOf('.') - 1) >>> 0) + 2);
    if (file && file.size / (1024 * 1024) > fileSize) {
      throw commonResponse.SOMETHING_WRONG;
    }
    if (arrayOfAllowedFiles.length && !arrayOfAllowedFiles.includes(fileExtension)) {
      throw commonResponse.SOMETHING_WRONG;
    } else return true;
  } else {
    return true;
  }
};
