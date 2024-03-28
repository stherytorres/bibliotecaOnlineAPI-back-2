const express = require('express');
const connectToMongo = require("./config/mongo");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
connectToMongo();

const routes = require("./routes/routes");
routes(app);

if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, (err) => {
        if (err) {
            console.error(`Erro ao iniciar o servidor: ${err}`);
        } else {
            console.log(`Servidor online na porta ${PORT}`);
        }
    });
}