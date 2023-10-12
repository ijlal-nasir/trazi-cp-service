const PopulationService = require("./population.service");

function findByStateAndCity(request, reply) {
  const { state, city } = request.params;
  const result = PopulationService.findData(state, city);
  if (!result) {
    return reply.code(400).send({ error: "State/City not found" });
  }
  return reply.code(200).send({ population: result.population });
}

function updateByStateAndCity(request, reply) {
  const { state, city } = request.params;
  const population = Number(request.body);
  const response = PopulationService.updateData(state, city, population);
  const statusCode = response.message === "Data created" ? 201 : 200;
  return reply.code(statusCode).send({ message: response.message });
}

module.exports = {
  PopulationController: {
    findByStateAndCity,
    updateByStateAndCity,
  },
};
