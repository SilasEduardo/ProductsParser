import { app } from './shared/http/app';

app.listen(process.env.PORT, () => console.log('Server is running!'));
