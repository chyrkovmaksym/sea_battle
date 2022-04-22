export class Ship_4 {
  constructor(ceilsArray, busyCeils) {
    this.size = 10;
    this.ceilsArray = ceilsArray;
    this.busyCeils = busyCeils;
  }
  getAvailableCeilsVertical() {
    const availableCeils = [];
    let count = 0;
    for (let i = 0; i < this.ceilsArray.length - 3; i++) {
      for (let j = 0; j < this.ceilsArray[i].length; j++) {
        if (this.busyCeils.includes(i + j * this.size)) continue;
        count = 0;
        if (j === 0) count += 6;
        else {
          if (!this.busyCeils.includes(i + (j - 1) * this.size)) count++;
          if (!this.busyCeils.includes(i + 1 + (j - 1) * this.size)) count++;
          if (!this.busyCeils.includes(i + 2 + (j - 1) * this.size)) count++;
          if (!this.busyCeils.includes(i + 3 + (j - 1) * this.size)) count++;
        }

        if (j === this.size - 1) count += 6;
        else {
          if (!this.busyCeils.includes(i + (j + 1) * this.size)) count++;
          if (!this.busyCeils.includes(i + 1 + (j + 1) * this.size)) count++;
          if (!this.busyCeils.includes(i + 2 + (j + 1) * this.size)) count++;
          if (!this.busyCeils.includes(i + 3 + (j + 1) * this.size)) count++;
        }

        if (i === 0)
          j === 0 || j === this.size - 1 ? (count += 2) : (count += 3);
        else {
          if (!this.busyCeils.includes(i - 1 + j * this.size)) count++;
          if (j !== 0) {
            if (!this.busyCeils.includes(i - 1 + (j - 1) * this.size)) count++;
          }
          if (j !== this.size - 1) {
            if (!this.busyCeils.includes(i - 1 + (j + 1) * this.size)) count++;
          }
        }

        if (i === this.ceilsArray.length - 4)
          j === 0 || j === this.size - 1 ? (count += 2) : (count += 3);
        else {
          if (!this.busyCeils.includes(i + 4 + j * this.size)) count++;
          if (j !== 0) {
            if (!this.busyCeils.includes(i + 4 + (j - 1) * this.size)) count++;
          }
          if (j !== this.size - 1) {
            if (!this.busyCeils.includes(i + 4 + (j + 1) * this.size)) count++;
          }
        }

        if (count === 14) {
          availableCeils.push({ i, j });
        }
      }
    }
    return availableCeils;
  }
  getAvailableCeilsHorizontal() {
    const availableCeils = [];
    let count = 0;
    for (let i = 0; i < this.ceilsArray.length; i++) {
      for (let j = 0; j < this.ceilsArray[i].length - 3; j++) {
        if (this.busyCeils.includes(i + j * this.size)) continue;
        count = 0;
        if (j === 0)
          i === 0 || i === this.size - 1 ? (count += 2) : (count += 3);
        else {
          if (!this.busyCeils.includes(i + (j - 1) * this.size)) count++;
          if (i !== 0) {
            if (!this.busyCeils.includes(i - 1 + (j - 1) * this.size)) count++;
          }
          if (i !== this.size - 1) {
            if (!this.busyCeils.includes(i + 1 + (j - 1) * this.size)) count++;
          }
        }

        if (j === this.ceilsArray[i].length - 4)
          i === 0 || i === this.size - 1 ? (count += 2) : (count += 3);
        else {
          if (!this.busyCeils.includes(i + (j + 4) * this.size)) count++;
          if (i !== 0) {
            if (!this.busyCeils.includes(i - 1 + (j + 4) * this.size)) count++;
          }
          if (i !== this.size - 1) {
            if (!this.busyCeils.includes(i + 1 + (j + 4) * this.size)) count++;
          }
        }

        if (i === 0) count += 6;
        else {
          if (!this.busyCeils.includes(i - 1 + j * this.size)) count++;
          if (!this.busyCeils.includes(i - 1 + (j + 1) * this.size)) count++;
          if (!this.busyCeils.includes(i - 1 + (j + 2) * this.size)) count++;
          if (!this.busyCeils.includes(i - 1 + (j + 3) * this.size)) count++;
        }

        if (i === this.size - 1) count += 6;
        else {
          if (!this.busyCeils.includes(i + 1 + j * this.size)) count++;
          if (!this.busyCeils.includes(i + 1 + (j + 1) * this.size)) count++;
          if (!this.busyCeils.includes(i + 1 + (j + 2) * this.size)) count++;
          if (!this.busyCeils.includes(i + 1 + (j + 3) * this.size)) count++;
        }
        if (count === 14) {
          availableCeils.push({ i, j });
        }
      }
    }
    return availableCeils;
  }
  getRandomShip() {
    if (Math.floor(Math.random() * 2) === 0) {
      const availableCeils = this.getAvailableCeilsVertical();
      const position =
        availableCeils[Math.floor(Math.random() * availableCeils.length)];
      const i = position.i;
      const j = position.j;
      this.busyCeils.push(
        i + j * 10,
        i + 1 + j * 10,
        i + 2 + j * 10,
        i + 3 + j * 10
      );
      return { position, busyCeils: this.busyCeils };
    }
    const availableCeils = this.getAvailableCeilsHorizontal();
    const position =
      availableCeils[Math.floor(Math.random() * availableCeils.length)];
    const i = position.i;
    const j = position.j;
    this.busyCeils.push(
      i + j * 10,
      i + (j + 1) * 10,
      i + (j + 2) * 10,
      i + (j + 3) * 10
    );
    return { position, busyCeils: this.busyCeils };
  }
}

export class Ship_3 {
  constructor(ceilsArray, busyCeils) {
    this.size = 10;
    this.ceilsArray = ceilsArray;
    this.busyCeils = busyCeils;
  }
  getAvailableCeilsVertical() {
    const availableCeils = [];
    let count = 0;
    for (let i = 0; i < this.ceilsArray.length - 2; i++) {
      for (let j = 0; j < this.ceilsArray[i].length; j++) {
        if (this.busyCeils.includes(i + j * this.size)) continue;
        count = 0;
        if (j === 0) count += 5;
        else {
          if (!this.busyCeils.includes(i + (j - 1) * this.size)) count++;
          if (!this.busyCeils.includes(i + 1 + (j - 1) * this.size)) count++;
          if (!this.busyCeils.includes(i + 2 + (j - 1) * this.size)) count++;
        }

        if (j === this.size - 1) count += 5;
        else {
          if (!this.busyCeils.includes(i + (j + 1) * this.size)) count++;
          if (!this.busyCeils.includes(i + 1 + (j + 1) * this.size)) count++;
          if (!this.busyCeils.includes(i + 2 + (j + 1) * this.size)) count++;
        }

        if (i === 0)
          j === 0 || j === this.size - 1 ? (count += 2) : (count += 3);
        else {
          if (!this.busyCeils.includes(i - 1 + j * this.size)) count++;
          if (j !== 0) {
            if (!this.busyCeils.includes(i - 1 + (j - 1) * this.size)) count++;
          }
          if (j !== this.size - 1) {
            if (!this.busyCeils.includes(i - 1 + (j + 1) * this.size)) count++;
          }
        }

        if (i === this.ceilsArray.length - 3)
          j === 0 || j === this.size - 1 ? (count += 2) : (count += 3);
        else {
          if (!this.busyCeils.includes(i + 3 + j * this.size)) count++;
          if (j !== 0) {
            if (!this.busyCeils.includes(i + 3 + (j - 1) * this.size)) count++;
          }
          if (j !== this.size - 1) {
            if (!this.busyCeils.includes(i + 3 + (j + 1) * this.size)) count++;
          }
        }

        if (count === 12) {
          availableCeils.push({ i, j });
        }
      }
    }
    return availableCeils;
  }
  getAvailableCeilsHorizontal() {
    const availableCeils = [];
    let count = 0;
    for (let i = 0; i < this.ceilsArray.length; i++) {
      for (let j = 0; j < this.ceilsArray[i].length - 2; j++) {
        if (this.busyCeils.includes(i + j * this.size)) continue;
        count = 0;
        if (j === 0)
          i === 0 || i === this.size - 1 ? (count += 2) : (count += 3);
        else {
          if (!this.busyCeils.includes(i + (j - 1) * this.size)) count++;
          if (i !== 0) {
            if (!this.busyCeils.includes(i - 1 + (j - 1) * this.size)) count++;
          }
          if (i !== this.size - 1) {
            if (!this.busyCeils.includes(i + 1 + (j - 1) * this.size)) count++;
          }
        }

        if (j === this.ceilsArray[i].length - 3)
          i === 0 || i === this.size - 1 ? (count += 2) : (count += 3);
        else {
          if (!this.busyCeils.includes(i + (j + 3) * this.size)) count++;
          if (i !== 0) {
            if (!this.busyCeils.includes(i - 1 + (j + 3) * this.size)) count++;
          }
          if (i !== this.size - 1) {
            if (!this.busyCeils.includes(i + 1 + (j + 3) * this.size)) count++;
          }
        }

        if (i === 0) count += 5;
        else {
          if (!this.busyCeils.includes(i - 1 + j * this.size)) count++;
          if (!this.busyCeils.includes(i - 1 + (j + 1) * this.size)) count++;
          if (!this.busyCeils.includes(i - 1 + (j + 2) * this.size)) count++;
        }

        if (i === this.size - 1) count += 5;
        else {
          if (!this.busyCeils.includes(i + 1 + j * this.size)) count++;
          if (!this.busyCeils.includes(i + 1 + (j + 1) * this.size)) count++;
          if (!this.busyCeils.includes(i + 1 + (j + 2) * this.size)) count++;
        }
        if (count === 12) {
          availableCeils.push({ i, j });
        }
      }
    }
    return availableCeils;
  }
  getRandomShip() {
    if (Math.floor(Math.random() * 2) === 0) {
      const availableCeils = this.getAvailableCeilsVertical();
      const position =
        availableCeils[Math.floor(Math.random() * availableCeils.length)];
      const i = position.i;
      const j = position.j;
      this.busyCeils.push(i + j * 10, i + 1 + j * 10, i + 2 + j * 10);
      return { position, busyCeils: this.busyCeils };
    }
    const availableCeils = this.getAvailableCeilsHorizontal();
    const position =
      availableCeils[Math.floor(Math.random() * availableCeils.length)];
    const i = position.i;
    const j = position.j;
    this.busyCeils.push(i + j * 10, i + (j + 1) * 10, i + (j + 2) * 10);
    return { position, busyCeils: this.busyCeils };
  }
}

export class Ship_2 {
  constructor(ceilsArray, busyCeils) {
    this.size = 10;
    this.ceilsArray = ceilsArray;
    this.busyCeils = busyCeils;
  }
  getAvailableCeilsVertical() {
    const availableCeils = [];
    let count = 0;
    for (let i = 0; i < this.ceilsArray.length - 1; i++) {
      for (let j = 0; j < this.ceilsArray[i].length; j++) {
        if (this.busyCeils.includes(i + j * this.size)) continue;
        count = 0;
        if (j === 0) count += 4;
        else {
          if (!this.busyCeils.includes(i + (j - 1) * this.size)) count++;
          if (!this.busyCeils.includes(i + 1 + (j - 1) * this.size)) count++;
        }

        if (j === this.size - 1) count += 4;
        else {
          if (!this.busyCeils.includes(i + (j + 1) * this.size)) count++;
          if (!this.busyCeils.includes(i + 1 + (j + 1) * this.size)) count++;
        }

        if (i === 0)
          j === 0 || j === this.size - 1 ? (count += 2) : (count += 3);
        else {
          if (!this.busyCeils.includes(i - 1 + j * this.size)) count++;
          if (j !== 0) {
            if (!this.busyCeils.includes(i - 1 + (j - 1) * this.size)) count++;
          }
          if (j !== this.size - 1) {
            if (!this.busyCeils.includes(i - 1 + (j + 1) * this.size)) count++;
          }
        }

        if (i === this.ceilsArray.length - 2)
          j === 0 || j === this.size - 1 ? (count += 2) : (count += 3);
        else {
          if (!this.busyCeils.includes(i + 2 + j * this.size)) count++;
          if (j !== 0) {
            if (!this.busyCeils.includes(i + 2 + (j - 1) * this.size)) count++;
          }
          if (j !== this.size - 1) {
            if (!this.busyCeils.includes(i + 2 + (j + 1) * this.size)) count++;
          }
        }

        if (count === 10) {
          availableCeils.push({ i, j });
        }
      }
    }
    return availableCeils;
  }
  getAvailableCeilsHorizontal() {
    const availableCeils = [];
    let count = 0;
    for (let i = 0; i < this.ceilsArray.length; i++) {
      for (let j = 0; j < this.ceilsArray[i].length - 1; j++) {
        if (this.busyCeils.includes(i + j * this.size)) continue;
        count = 0;
        if (j === 0)
          i === 0 || i === this.size - 1 ? (count += 2) : (count += 3);
        else {
          if (!this.busyCeils.includes(i + (j - 1) * this.size)) count++;
          if (i !== 0) {
            if (!this.busyCeils.includes(i - 1 + (j - 1) * this.size)) count++;
          }
          if (i !== this.size - 1) {
            if (!this.busyCeils.includes(i + 1 + (j - 1) * this.size)) count++;
          }
        }

        if (j === this.ceilsArray[i].length - 2)
          i === 0 || i === this.size - 1 ? (count += 2) : (count += 3);
        else {
          if (!this.busyCeils.includes(i + (j + 2) * this.size)) count++;
          if (i !== 0) {
            if (!this.busyCeils.includes(i - 1 + (j + 2) * this.size)) count++;
          }
          if (i !== this.size - 1) {
            if (!this.busyCeils.includes(i + 1 + (j + 2) * this.size)) count++;
          }
        }

        if (i === 0) count += 4;
        else {
          if (!this.busyCeils.includes(i - 1 + j * this.size)) count++;
          if (!this.busyCeils.includes(i - 1 + (j + 1) * this.size)) count++;
        }

        if (i === this.size - 1) count += 4;
        else {
          if (!this.busyCeils.includes(i + 1 + j * this.size)) count++;
          if (!this.busyCeils.includes(i + 1 + (j + 1) * this.size)) count++;
        }
        if (count === 10) {
          availableCeils.push({ i, j });
        }
      }
    }
    return availableCeils;
  }
  getRandomShip() {
    if (Math.floor(Math.random() * 2) === 0) {
      const availableCeils = this.getAvailableCeilsVertical();
      const position =
        availableCeils[Math.floor(Math.random() * availableCeils.length)];
      const i = position.i;
      const j = position.j;
      this.busyCeils.push(i + j * 10, i + 1 + j * 10);
      return { position, busyCeils: this.busyCeils };
    }
    const availableCeils = this.getAvailableCeilsHorizontal();
    const position =
      availableCeils[Math.floor(Math.random() * availableCeils.length)];
    const i = position.i;
    const j = position.j;
    this.busyCeils.push(i + j * 10, i + (j + 1) * 10);
    return { position, busyCeils: this.busyCeils };
  }
}

export class Ship_1 {
  constructor(ceilsArray, busyCeils) {
    this.size = 10;
    this.ceilsArray = ceilsArray;
    this.busyCeils = busyCeils;
  }
  getAvailableCeils() {
    const availableCeils = [];
    let count = 0;
    for (let i = 0; i < this.ceilsArray.length; i++) {
      for (let j = 0; j < this.ceilsArray[i].length; j++) {
        if (this.busyCeils.includes(i + j * this.size)) continue;
        count = 0;
        if (j === 0)
          i === 0 || i === this.size - 1 ? (count += 2) : (count += 3);
        else {
          if (!this.busyCeils.includes(i + (j - 1) * this.size)) count++;
          if (i !== 0) {
            if (!this.busyCeils.includes(i - 1 + (j - 1) * this.size)) count++;
          }
          if (i !== this.size - 1) {
            if (!this.busyCeils.includes(i + 1 + (j - 1) * this.size)) count++;
          }
        }

        if (j === this.ceilsArray[i].length - 1)
          i === 0 || i === this.size - 1 ? (count += 2) : (count += 3);
        else {
          if (!this.busyCeils.includes(i + (j + 1) * this.size)) count++;
          if (i !== 0) {
            if (!this.busyCeils.includes(i - 1 + (j + 1) * this.size)) count++;
          }
          if (i !== this.size - 1) {
            if (!this.busyCeils.includes(i + 1 + (j + 1) * this.size)) count++;
          }
        }

        if (i === 0) count += 3;
        else {
          if (!this.busyCeils.includes(i - 1 + j * this.size)) count++;
        }

        if (i === this.size - 1) count += 3;
        else {
          if (!this.busyCeils.includes(i + 1 + j * this.size)) count++;
        }
        if (count === 8) {
          availableCeils.push({ i, j });
        }
      }
    }
    return availableCeils;
  }
  getRandomShip() {
    const availableCeils = this.getAvailableCeils();
    const position =
      availableCeils[Math.floor(Math.random() * availableCeils.length)];
    const i = position.i;
    const j = position.j;
    this.busyCeils.push(i + j * 10);
    return { position, busyCeils: this.busyCeils };
  }
}

export function getShip(i, j, busyCeils) {
  const index = busyCeils.indexOf(i + j * 10);
  if (index < 4) {
    return { thisCoordinates: i + j * 10, otherCoordinates: busyCeils.slice(0, 4) };
  } else if (index < 7) {
    return { thisCoordinates: i + j * 10, otherCoordinates: busyCeils.slice(4, 7) };
  } else if (index < 10) {
    return { thisCoordinates: i + j * 10, otherCoordinates: busyCeils.slice(7, 10) };
  } else if (index < 12) {
    return { thisCoordinates: i + j * 10, otherCoordinates: busyCeils.slice(10, 12) };
  } else if (index < 14) {
    return { thisCoordinates: i + j * 10, otherCoordinates: busyCeils.slice(12, 14) };
  } else if (index < 16) {
    return { thisCoordinates: i + j * 10, otherCoordinates: busyCeils.slice(14, 16) };
  } else {
    return { thisCoordinates: i + j * 10, otherCoordinates: [i + j * 10] };
  }
}

// module.exports = {
//   Ship_4,
//   Ship_3,
//   Ship_2,
//   Ship_1,
//   getShip,
// };
