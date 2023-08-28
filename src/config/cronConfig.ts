import dotenv from 'dotenv';
import cron from 'node-cron';
import axios from 'axios';

dotenv.config();

class CronConfig {
  executeCron() {
    const cron_time = process.env.CRON_TIME || '';
    const url_app = process.env.APP_URL || '';
    const randomApiKey = process.env.RANDOM_NUMBER || '';

    const headers = {
      'x-api-key': randomApiKey,
    };
    const cronJob = cron.schedule(cron_time, async () => {
      try {
        axios.get(`${url_app}/cron`, { headers });
        console.log('CRON job executed at:', new Date());
      } catch (error: any) {
        console.error('Error importing data:', error.message);
      }
    });

    cronJob.start();
  }
}

export default new CronConfig().executeCron();
