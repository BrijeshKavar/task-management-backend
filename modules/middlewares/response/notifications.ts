import { NotifyErrorType, NotifyErrorStackType } from './../type';
import notify from 'slack-notify';

const notifyError = (
  err: NotifyErrorStackType,
  { body, method, params, query, status, originalUrl }: NotifyErrorType
) => {
  // Benifits of corejs. Importing slack here so that It will only import
  // When we really needed a slack object.
  const slack = notify(process.env.SLACK_WEBHOOK);

  slack.send({
    fields: {
      'Request Method': method,
      'Request Status': String(status),
      'Request Url': originalUrl,
      'Request body': JSON.stringify(body || 'N/A'),
      'Request params': JSON.stringify(params || 'N/A'),
      'Request query': JSON.stringify(query || 'N/A'),
      Time: new Date().toISOString()
    },
    // eslint-disable-next-line camelcase
    icon_emoji: ':ladybug:',
    text: `\`\`\`${err.stack}\`\`\``
  });
};

export default notifyError;
