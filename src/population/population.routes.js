const { PopulationController } = require("./population.controller");

async function routes(fastify, options) {
  fastify.get(
    "/state/:state/city/:city",
    PopulationController.findByStateAndCity
  );

  fastify.put(
    "/state/:state/city/:city",
    PopulationController.updateByStateAndCity
  );
}

module.exports = routes;
