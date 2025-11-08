// src/entities/Player.js
import * as THREE from "three";

export class Player {
  constructor(x, z, role, color, team) {
    this.x = x;
    this.z = z;
    this.role = role;
    this.color = color;
    this.team = team;
    this.mesh = null;
    this.targetPosition = new THREE.Vector3(x, 0, z);

    this.createPlayer();
  }

  createPlayer() {
    let size, geometry;

    switch (this.role) {
      case "GK":
        size = 1.2;
        geometry = new THREE.SphereGeometry(size, 16, 16);
        break;
      default:
        size = 0.8;
        geometry = new THREE.SphereGeometry(size, 16, 16);
    }

    const material = new THREE.MeshLambertMaterial({
      color: this.color,
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.set(this.x, size, this.z);
    this.mesh.castShadow = true;

    // Add role indicator
    const textGeometry = new THREE.SphereGeometry(0.3, 8, 8);
    const textMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });
    const indicator = new THREE.Mesh(textGeometry, textMaterial);
    indicator.position.y = size + 0.5;
    this.mesh.add(indicator);
  }

  getMesh() {
    return this.mesh;
  }

  setTargetPosition(x, z) {
    this.targetPosition.set(x, 0, z);
  }

  update(delta) {
    // Smooth movement towards target
    const speed = 5;
    const dx = this.targetPosition.x - this.mesh.position.x;
    const dz = this.targetPosition.z - this.mesh.position.z;

    if (Math.abs(dx) > 0.1 || Math.abs(dz) > 0.1) {
      this.mesh.position.x += dx * speed * delta;
      this.mesh.position.z += dz * speed * delta;
    }
  }
}
