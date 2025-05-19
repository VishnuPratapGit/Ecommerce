import app from "./app.js";
import connectDB from "./database/index.js";

const port = process.env.PORT;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`server started successfully.`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
