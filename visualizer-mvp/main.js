// src/main.js
import { SceneManager } from "./src/core/SceneManager.js";
import { Pitch } from "./src/entities/Pitch.js";
import { Team } from "./src/entities/Team.js";
import { FORMATIONS, TEAM_COLORS } from "./src/utils/constants.js";

class TacticsVisualizer {
  constructor() {
    this.sceneManager = null;
    this.pitch = null;
    this.teamA = null;
    this.teamB = null;
    this.isAnimating = false;

    this.init();
  }

  async init() {
    try {
      // Initialize core systems
      this.sceneManager = new SceneManager(
        document.getElementById("scene-container")
      );

      // Create pitch
      this.pitch = new Pitch();
      this.sceneManager.getScene().add(this.pitch.getMesh());

      // Create teams with initial formation
      this.teamA = new Team("Team A", TEAM_COLORS.teamA);
      this.teamB = new Team("Team B", TEAM_COLORS.teamB);

      this.teamA.createPlayers(FORMATIONS["433"].teamA);
      this.teamB.createPlayers(FORMATIONS["433"].teamB);

      // Add players to scene
      this.teamA.getPlayers().forEach((player) => {
        this.sceneManager.getScene().add(player.getMesh());
      });

      this.teamB.getPlayers().forEach((player) => {
        this.sceneManager.getScene().add(player.getMesh());
      });

      // Setup UI event listeners
      this.setupEventListeners();

      // Start animation loop
      this.animate();

      console.log("Tactics Visualizer MVP loaded successfully!");
    } catch (error) {
      console.error("Failed to initialize Tactics Visualizer:", error);
    }
  }

  setupEventListeners() {
    // Formation selector
    document
      .getElementById("formation-select")
      .addEventListener("change", (e) => {
        this.setFormation(e.target.value);
      });

    // Camera controls
    document.getElementById("btn-camera-top").addEventListener("click", () => {
      this.sceneManager.setCameraTopView();
    });

    document
      .getElementById("btn-camera-sideline")
      .addEventListener("click", () => {
        this.sceneManager.setCameraSidelineView();
      });

    // Tactics buttons
    document.getElementById("btn-gegenpress").addEventListener("click", () => {
      this.animateGegenpress();
    });

    document.getElementById("btn-reset").addEventListener("click", () => {
      this.resetPositions();
    });
  }

  setFormation(formation) {
    if (FORMATIONS[formation]) {
      this.teamA.setFormation(FORMATIONS[formation].teamA);
      this.teamB.setFormation(FORMATIONS[formation].teamB);
    }
  }

  animateGegenpress() {
    // Simple gegenpress animation - Team A pushes high
    FORMATIONS["433"].teamA.forEach((player, index) => {
      if (player.role !== "GK") {
        const pressX = player.x + 20; // Push forward
        this.teamA.getPlayers()[index].setTargetPosition(pressX, player.z);
      }
    });

    // Team B gets compressed
    FORMATIONS["433"].teamB.forEach((player, index) => {
      if (player.role !== "GK") {
        const compressedX = player.x - 15; // Get pushed back
        this.teamB.getPlayers()[index].setTargetPosition(compressedX, player.z);
      }
    });
  }

  resetPositions() {
    this.setFormation("433");
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const delta = this.sceneManager.clock.getDelta();

    // Update player positions
    this.teamA.update(delta);
    this.teamB.update(delta);

    // Render scene
    this.sceneManager.render();
  }
}

// Initialize application when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new TacticsVisualizer();
});
