import express,{Express,Request,Response} from 'express';
import dotenv from 'dotenv';
import bodyparser from 'body-parser';
import cors from 'cors';
import userRouter from "./router/UserRouter";
dotenv.config();
import mongoose from 'mongoose';
import projectRouter from './router/ProjectRouter';


var dbport:any=process.env.MONGODB_URL;
console.log(dbport)
mongoose.connect("mongodb+srv://raj615226:3aADDRcab04gvcuK@cluster0.6jnli3x.mongodb.net/?retryWrites=true&w=majority",void{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> console.log("db connected"))
.catch((err:any)=> console.log(err))
const app: Express = express();
app.use(bodyparser.json());
app.use(express.json());

app.use(cors());



const port = process.env.PORT || 4000;


app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});
app.use(userRouter)
app.use(projectRouter)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});