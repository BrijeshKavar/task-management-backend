import minilog from 'minilog';

import { app } from '@neiv/config';

if (app.enableLogging) {
  minilog.enable();
} else {
  minilog.disable();
}

export default minilog('SERVER');
