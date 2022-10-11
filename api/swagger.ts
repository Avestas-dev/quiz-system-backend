// import swaggerAutogen from "swagger-autogen";
const swaggerAutogen = require("swagger-autogen")();
const doc = {
  info: {
    title: "Quiz System Api",
    description: "Project made for Internet Application classes.",
  },
  host: "localhost:8000",
  schemes: ["http"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./api/routes/router"];
swaggerAutogen(outputFile, endpointsFiles, doc);
