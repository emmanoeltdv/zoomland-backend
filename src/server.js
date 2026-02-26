import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// CORS liberado para frontend
app.use(cors({
  origin: "*",
  credentials: true
}));

app.use(express.json());

// ===== CONEXÃO MONGODB =====
mongoose.connect(process.env.DATABASE_URL)
.then(() => console.log("✅ MongoDB conectado"))
.catch(err => console.log("❌ Erro MongoDB:", err));


// ===== MODEL USER =====
const UserSchema = new mongoose.Schema({
  email: String,
  password: String
});

const User = mongoose.model("User", UserSchema);


// ===== CADASTRO =====
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const hash = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hash
    });

    await user.save();

    res.json({ message: "Usuário criado" });

  } catch (error) {
    res.status(500).json(error);
  }
});


// ===== LOGIN =====
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({ message: "Usuário não existe" });

    const valid = await bcrypt.compare(password, user.password);

    if (!valid)
      return res.status(400).json({ message: "Senha inválida" });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });

  } catch (error) {
    res.status(500).json(error);
  }
});


// ===== TESTE API =====
app.get("/", (req, res) => {
  res.send("🚀 ZoomLand API Online");
});


// ===== PORT =====
const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log("Servidor rodando na porta", PORT)
);
