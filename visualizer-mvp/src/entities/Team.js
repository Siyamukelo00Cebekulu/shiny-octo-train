// src/entities/Team.js
import { Player } from "./Player.js";

export class Team {
  constructor(name, color) {
    this.name = name;
    this.color = color;
    this.players = [];
    this.formation = "433";
  }

  createPlayers(formationData) {
    // Clear existing players
    this.players = [];

    // Create new players based on formation
    formationData.forEach((playerData, index) => {
      const player = new Player(
        playerData.x,
        playerData.z,
        playerData.role,
        this.color,
        this.name
      );
      this.players.push(player);
    });
  }

  getPlayers() {
    return this.players;
  }

  update(delta) {
    this.players.forEach((player) => player.update(delta));
  }

  setFormation(formationData) {
    formationData.forEach((playerData, index) => {
      if (this.players[index]) {
        this.players[index].setTargetPosition(playerData.x, playerData.z);
      }
    });
  }
}
