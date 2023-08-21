import { exec } from 'child_process';
import cron from 'node-cron';
import axios from 'axios';

class CronConfig {
  executeCron() {
    const cronJob = cron.schedule(`*/2 * * * *`, async () => {
      try {
        axios.post('http://localhost:3333/cron');
        console.log('CRON job executed at:', new Date());
      } catch (error: any) {
        console.error('Error importing data:', error.message);
      }
    });

    cronJob.start();
  }
}

export default new CronConfig().executeCron();
