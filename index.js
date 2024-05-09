import express from "express"; 
import dotenv from "dotenv"; 
import helmet from "helmet"; 
import morgan from "morgan";
import multer from "multer";
import mongoose from "mongoose"; 
import userRoute from "./routes/user.js"; 
import entryRoute from "./routes/entry.js";
import Image from "./models/Image.js"
import cookieParser from "cookie-parser"; 
import cors from "cors"

const upload = multer({ storage: multer.memoryStorage() });

const app = express(); 
dotenv.config();

const PORT = process.env.PORT || 5500; 

const connect = async () => { 
try { 
	await mongoose.connect(process.env.MONGO); 
	console.log("Connected to mongoDB."); 
} catch (error) { 
	throw error; 
} 
}; 

mongoose.connection.on("disconnected", () => { 
console.log("mongoDB disconnected!"); 
}); 

app.get('/', (req, res) => { res.send('Hello from Express!') }); 

//middlewares 
app.use(cookieParser()) 
app.use(express.json()); 
// app.use(helmet());


app.use(cors({
origin: "http://localhost:3000",
credentials: true
}))

app.post('/upload', upload.single('image'), async (req, res) => {
	try {
		const newImage = new Image({
			name: req.file.originalname,
			img: {
				data: req.file.buffer,
				contentType: req.file.mimetype
			}
		});
		await newImage.save();
		res.json({id: newImage._id });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Error saving image' });
	}
});

app.get('/uploads/:id', async (req, res) => {
	try {
		const image = await Image.findById(req.params.id);
		if (!image || !image.img.data) {
			return res.status(404).send('Image not found');
		}
		res.set('Content-Type', image.img.contentType);
		res.send(image.img.data);
	} catch (error) {
		console.error(error);
		res.status(500).send('Server error');
	}
});


app.use(morgan("common")); 

app.use("/api/users", userRoute); 
app.use("/api/entries", entryRoute); 

app.listen(PORT, () => { 
console.log("Listening on port 5500"); 
connect(); 
});
