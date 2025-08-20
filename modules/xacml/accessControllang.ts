type Languages = {
  [key: string]: { [key: string]: string };
};

const languages: Languages = {
  en: {
    GENERAL_ERROR: 'Oops! Something went wrong, Please try again.',
    CHECK_SAME_PASSWORD: 'Current password can not be same as old password',
    CHECK_USER_EXIST: 'User not found.',
    CHECK_USER_NOT_EXIST: 'User already exists',
    VALID_CODE: 'Invalid code',
    CHECK_USER_ACTIVE: 'User is inactive',
    CHECK_PROJECT_PICTURE_EXIST:'Project picture not available.',
    PROJECT_NOT_FOUND:'Project not found.',
    CHECK_CATEGORY_EXIST: 'Category not found.'
  }
};

const transform = (message: string, lang: 'en' = 'en') => {
  const selectedLanguage = languages[lang] || languages.en;
  return selectedLanguage[message] || message;
};

export default transform;
