const port = 5555;
const populationService = require("./src/population/population.service");
const app = require("fastify")({ logger: true });

app.get("/", (req, reply) => {
  reply.send("City Population Service");
});

app.register(require("./src/population"), { prefix: "/api/population" });

populationService.loadData();

const start = async () => {
  try {
    await app.listen({ port });
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
