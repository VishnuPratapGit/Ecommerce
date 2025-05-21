import app from "./app.js";
import connectDB from "./database/index.js";
import colors from "colors";

const port = process.env.PORT;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`server started successfully`.italic.bgRed);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
