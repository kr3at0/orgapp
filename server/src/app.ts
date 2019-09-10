import express from 'express';
import parser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const app: express.Application = express();

app.use(parser.urlencoded({extended: true}));
app.use(parser.json());

app.set('port', process.env.SERVER_PORT|| 3000);
app.set('view engine', 'hbs')


app.get('/', (req, res) => {
    console.log('getting stuff');
    res.send('Hello');
});

app.get('/dashboard', (req, res) => {
    console.log('here we are in the dashboard');
    res.send('dashboard');
});

app.listen(app.get('port'), () => {
  console.log('Hello world!', app.get('port'));
})
