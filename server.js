const { app } = require("./app");
const { db } = require("./utils/databaseUtils");

//RelationsModels
const { initModel } = require("./models/initModels");

const startServer = async () => {
  try {
    await db.authenticate();

    initModel();

    await db.sync();

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Express app running on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
