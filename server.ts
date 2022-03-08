import express from 'express';
import boletoApi from './src/Api/BoletoApi';

const port = 8080;
const app = express();
app.use(express.json());
boletoApi(app);
app.listen(port, () => {
    console.log(`Server running on localhost:${port}`);
});

