import app from "./app.js";
import cloudinary from "cloudinary";
import { DatabaseConnect } from "./config/database.js";

DatabaseConnect();

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECERET,
});
app.listen(process.env.PORT, () => {
  console.log(`server is started on port : ${process.env.PORT}`);
});
