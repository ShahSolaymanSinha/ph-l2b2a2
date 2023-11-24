import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

async function main() {
  try {
    await mongoose.connect(`${config.database_url}`, {
      dbName: 'assignment2_database',
    });

    app.listen(config.port, () => {
      if (config.environment === 'development') {
        // eslint-disable-next-line no-console
        console.log(`Example app listening on port ${config.port}`);
      }
    });
  } catch (err) {
    if (config.environment === 'development') {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }
}

main();
