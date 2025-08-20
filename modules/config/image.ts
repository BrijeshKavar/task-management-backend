const resourceToUrl = (resource, fileName, fileExtension) => {
  const baseUrl = 'https://' + process.env.STORAGE_ENDPOINT;

  switch (resource) {
    case 'image':
      return `${baseUrl}/neiv-dev-profile-images/${fileName}.${fileExtension}`;
    case 'file':
      return `${baseUrl}/neiv-dev-resume-files/${fileName}.${fileExtension}`;
    case 'video':
      return `${baseUrl}/neiv-dev-intro-videos/${fileName}.${fileExtension}`;
    case 'certificate':
      return `${baseUrl}/neiv-dev-certificates/${fileName}.${fileExtension}`;
    case 'coverLetter':
      return `${baseUrl}/neiv-dev-cover-letter/${fileName}.${fileExtension}`;
    default:
      throw new Error('Invalid resource type');
  }
};

export default resourceToUrl;
