const getPageNumber = (pageNumber: number) => {
  if (pageNumber > 0) {
    if (pageNumber === 1) return null;
    else return pageNumber - 1;
  }
  return null;
};

export default {
  appName: process.env.APP_NAME,
  port: process.env.SERVER_PORT || 4000,
  logging: { debugSQL: !!process.env.DEBUG_SQL || false },
  enableLogging: !!process.env.ENABLE_LOGGING || false,
  allowedHosts: process.env.ALLOWED_HOSTS,
  slackWebHook: process.env.SLACK_WEBHOOK || null,
  getBaseUrlFromUrl: (url = '') => {
    const pathArray = url.split('/');
    const protocol = pathArray[0];
    const host = pathArray[2];
    return `${protocol}//${host}`;
  },
  createPagination: (totalRecords: number, pageNumber: number, recordPerPage: number, result?: Array<unknown>) => {
    const pages = Math.ceil(totalRecords / recordPerPage);
    return {
      pagination: {
        totalRecords,
        currentPage: pageNumber,
        recordPerPage,
        previous: getPageNumber(pageNumber),
        pages,
        next: pageNumber < pages ? pageNumber + 1 : null
      },
      result
    };
  },
  dateFormat: 'YYYY-MM-DD'
};
