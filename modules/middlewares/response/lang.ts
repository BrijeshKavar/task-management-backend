/* eslint-disable quotes */
const languages: {
  en: {
    [key: string]: string;
  };
} = {
  en: {
    AUTH_LOGIN: 'Login successful',
    TOKEN_REQUIRED: 'Token is required',
    TOKEN_NOT_FOUND: 'Token not found',
    TOKEN_EXPIRED: 'Token has been expired',
    INVALID_CREDENTIALS: 'Invalid email or password',
    PASSWORD_INCORRECT: 'Password is incorrect, Please check and try again',
    SUCCESS: 'Success',
    USER_NOT_FOUND: 'User not found',
    ACCOUNT_INACTIVE: 'Account is inactive, Please contact admin',
    SUCCESSFULL_LOGIN: 'Logged in successfully',
    AUTH_RESET_PASSWORD: 'Reset password email resent successfully',
    PASSWORD_UPDATED: 'Password updated successfully',
    INVALID_REQUEST: 'Invalid request',
    OTP_SENT: 'Verification code sent successfully',
    OTP_VERIFIED: 'Verification code verified successfully',
    OTP_RESENT: 'Verification code is successfully resend on registered mobile number',
    PASSWORD_CHANGED: 'Password updated successfully',
    INVALID_PASSWORD: 'Invalid password',
    INVALID_MOBILE_NUMBER: 'Please enter valid mobile number',
    PROFILE_UPDATED: 'Profile updated successfully',
    PROFILE_IMAGE_REQUIRED: 'Profile image is required',
    COVER_IMAGE_REQUIRED: 'Cover image is required',
    IMAGE_REQUIRED: 'Image is required',
    INVALID_FILE_SIZE: 'File is too large',
    INVALID_FILE_FORMAT: 'Invalid file format',
    DUPLICATE_EMAIL: 'Email already in use',
    TRANSACTION_FAILED: 'Transaction failed due to some reason',
    COVER_IMAGE_UPLOADED: 'Cover image uploaded successfully',
    COVER_IMAGE_UPDATED: 'Cover image updated successfully',
    IMAGE_DELETED: 'Property image deleted successfully',
    // MOBILE_NOT_VARIFIED: 'Mobile number not verified',
    NOT_AUTHENTICATED: 'Please login',
    NOT_AUTHORIZED: 'You are not authorized',
    SOMETHING_WRONG: 'Something went wrong.',
    PROJECT_NOT_FOUND: "Project not found.",
    PROJECT_DELETED: 'Project deleted successfully.',
    CATEGORY_NOT_FOUND: 'Category not found',
    CATEGORY_ASSIGNED: 'Delete Category',
    OWNER_NOT_FOUND: 'No owner found',
    CATEGORY_ADDED: 'Category created successfully',
    CATEGORY_UPDATED: 'Category updated successfully',
    CATEGORY_REMOVED: 'Category removed successfully',
    COMMENT_NOT_FOUND: 'Comment not found',
    COMMENT_ADDED: 'Comment added successfully',
    COMMENT_UPDATED: 'Comment updated successfully',
    COMMENT_REMOVED: 'Comment removed successfully',
    REPLY_NOT_FOUND: 'Reply not found',
    REPLY_ADDED: 'Reply added successfully',
    REPLY_UPDATED: 'Reply updated successfully',
    REPLY_REMOVED: 'Reply removed successfully',
    TASK_NOT_FOUND: "Task not found.",
  }
};

const transform = (message: string, lang: 'en' = 'en') => {
  if (languages[lang]) {
    if (languages[lang][message]) {
      return languages[lang][message];
    }
    if (languages.en[message]) {
      return languages.en[message];
    }
  } else if (languages.en[message]) {
    return languages.en[message];
  }
  return message;
};

export default transform;
