class CloudTravel {

  constructor(radius) {
    this.radius = 4000;
    this.airportsNetwork = {};
  }

  toRadians(angle) {
    return angle * (Math.PI / 180);
  }

  calculateArcLength(lat1, lon1, lat2, lon2) {
      
    return (
      this.radius *
      Math.acos(
        Math.sin(this.toRadians(lat1)) * Math.sin(this.toRadians(lat2)) +
          Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) * Math.cos(this.toRadians(lon1) - this.toRadians(lon2))
      )
    );
  }

  createAirportsNetwork(latitude, longitude, canTravel) {
    const numberOfAirports = canTravel.length;

    for (let i = 0; i < numberOfAirports; i++) {
      this.airportsNetwork[i] = {};
      let data = canTravel[i].split(" ");
      for (let j = 0; j < data.length; j++) {
        const target = parseInt(data[j]);
        this.airportsNetwork[i][target] = this.calculateArcLength(
          latitude[i],
          longitude[i],
          latitude[target],
          longitude[target]
        );
      }
    }
  }

  lowestCostNode(costs, processed) {
    return Object.keys(costs).reduce((lowest, node) => {
      if (lowest === null || costs[node] < costs[lowest]) {
        if (!processed.includes(node)) {
          lowest = node;
        }
      }
      return lowest;
    }, null);
  }

  shortestTrip(origin, destination) {
    const graph = this.airportsNetwork;
    if (origin === destination) {
      return {
        distance: 0.0
      };
    }
    const costs = Object.assign(
      {
        [destination]: Infinity
      },
      this.airportsNetwork[origin]
    );

    const parents = {
      [destination]: null
    };

    for (let child in this.airportsNetwork[origin]) {
      parents[child] = origin;
    }

    const processed = [];

    let node = this.lowestCostNode(costs, processed);

    while (node) {
      let cost = costs[node];
      let children = this.airportsNetwork[node];
      for (let n in children) {
        let newCost = cost + children[n];
        if (!costs[n]) {
          costs[n] = newCost;
          parents[n] = node;
        }
        if (costs[n] > newCost) {
          costs[n] = newCost;
          parents[n] = node;
        }
      }
      processed.push(node);
      node = this.lowestCostNode(costs, processed);
    }

    let optimalPath = [destination];
    let parent = parseInt(parents[destination]);
    while (parent) {
      optimalPath.push(parent);
      parent = parents[parent];
    }
    optimalPath.reverse();

    const results = {
      distance: costs[destination],
      path: optimalPath
    };

    return results;
  }

  shortestCourierTrip(latitude, longitude, canTravel, origin, destination) {
    this.createAirportsNetwork(latitude, longitude, canTravel);

    const result = this.shortestTrip(origin, destination);
    if (result.distance == "Infinity") {
      return -1;
    } else {
      return result.distance;
    }
  }
}

module.exports = CloudTravel;
