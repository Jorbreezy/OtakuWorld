import express, {Response, Request} from "express";
import path = require("path");
const app = express();
const PORT: number = 3000;

//Serve Static file
app.use("/dist", express.static(path.join(__dirname, "../dist")));

//Parse Incoming body requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Route handlers

//Main Get Request, Send html file
app.get("/", (req: Request, res: Response) => {
  return res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

//Catch all error handler
app.all("*", (req: Request, res: Response) => {
  return res.status(404).send("Page not found");
});

//Global Error Handler
app.use((req: Request, res: Response) => {
  return res.status(400).send();
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));