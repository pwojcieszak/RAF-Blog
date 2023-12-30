const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/planes.json');

class Plane {
  static getAllPlanes() {
    try {
      const planesData = fs.readFileSync(filePath, 'utf8');
      const planes = JSON.parse(planesData);
      return planes;
    } catch (error) {
      console.error('Error reading planes file:', error.message);
      return [];
    }
  }

  static getPlaneByName(planeName) {
    let formattedPlaneName = planeName.charAt(0).toUpperCase() + planeName.slice(1);
    const planes = Plane.getAllPlanes();
    return planes.find(plane => plane.name === formattedPlaneName);
  }
}

module.exports = Plane;