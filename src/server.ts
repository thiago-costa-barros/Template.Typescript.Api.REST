import {config} from 'dotenv'
import express from 'express'
import routes from './routes'
import 'tsconfig-paths/register';

config();

const app = express();

const port = process.env.PORT || 8000;

app.use('/', routes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});