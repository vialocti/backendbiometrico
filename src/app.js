import routes_bio from './routes/routes_bio';
import cors from 'cors';
import express from 'express';
import routes_hcd from './routes/routes_hcd'
import morgan from 'morgan';
import routes_cargos from './routes/routes_cargos'
//

const app = express();
app.set('port', '4000');

//midlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/biometrico', routes_bio);
app.use('/hcd', routes_hcd);
app.use('/cargos', routes_cargos);



export default app;