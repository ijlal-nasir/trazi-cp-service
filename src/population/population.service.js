const fs = require("fs");
const path = require("path");
const JSON_DATA_FILE = path.join(__dirname, "city_populations.json");

class PopulationService {
  loadData() {
    try {
      this.data = JSON.parse(fs.readFileSync(JSON_DATA_FILE));
      console.log("City population data loaded", this.data.at(-1));
    } catch (error) {
      console.log("Unable to load data");
      this.data = [];
    }
  }

  findData(state, city) {
    const lowerState = state.toLowerCase();
    const lowerCity = city.toLowerCase();
    return this.data.find(
      (item) =>
        item.state.toLowerCase() === lowerState &&
        item.city.toLowerCase() === lowerCity
    );
  }

  updateData(state, city, population) {
    const lowerState = state.toLowerCase();
    const lowerCity = city.toLowerCase();
    const existingIndex = this.data.findIndex(
      (item) =>
        item.state.toLowerCase() === lowerState &&
        item.city.toLowerCase() === lowerCity
    );

    if (existingIndex === -1) {
      this.data.push({
        state: state,
        city: city,
        population: population,
      });
    } else {
      this.data[existingIndex].population = population;
    }

    try {
      fs.writeFileSync(JSON_DATA_FILE, JSON.stringify(this.data, null, 2));
      return existingIndex === -1
        ? { message: "Data created" }
        : { message: "Data updated" };
    } catch (error) {
      console.log(error);
      return { message: "Unable to update data" };
    }
  }
}

module.exports = new PopulationService();
