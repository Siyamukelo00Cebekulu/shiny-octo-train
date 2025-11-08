// src/entities/Pitch.js
import * as THREE from "three";
import { PITCH_DIMENSIONS, TEAM_COLORS } from "../utils/constants.js";

export class Pitch {
  constructor() {
    this.mesh = new THREE.Group();
    this.createPitch();
  }

  createPitch() {
    // Main pitch surface
    const pitchGeometry = new THREE.PlaneGeometry(
      PITCH_DIMENSIONS.width,
      PITCH_DIMENSIONS.height
    );
    const pitchMaterial = new THREE.MeshLambertMaterial({
      color: TEAM_COLORS.pitch,
    });
    const pitchSurface = new THREE.Mesh(pitchGeometry, pitchMaterial);
    pitchSurface.rotation.x = -Math.PI / 2;
    pitchSurface.receiveShadow = true;
    this.mesh.add(pitchSurface);

    // Pitch outline
    const outlineGeometry = new THREE.RingGeometry(
      PITCH_DIMENSIONS.width / 2 - 0.1,
      PITCH_DIMENSIONS.width / 2,
      64
    );
    const outlineMaterial = new THREE.MeshBasicMaterial({
      color: TEAM_COLORS.lines,
      side: THREE.DoubleSide,
    });
    const outline = new THREE.Mesh(outlineGeometry, outlineMaterial);
    outline.rotation.x = -Math.PI / 2;
    this.mesh.add(outline);

    // Center circle
    const centerCircleGeometry = new THREE.RingGeometry(
      0,
      PITCH_DIMENSIONS.centerCircleRadius,
      32
    );
    const centerCircle = new THREE.Mesh(centerCircleGeometry, outlineMaterial);
    centerCircle.rotation.x = -Math.PI / 2;
    this.mesh.add(centerCircle);

    // Center line
    const centerLineGeometry = new THREE.PlaneGeometry(
      0.2,
      PITCH_DIMENSIONS.height
    );
    const centerLine = new THREE.Mesh(centerLineGeometry, outlineMaterial);
    centerLine.rotation.x = -Math.PI / 2;
    centerLine.position.x = 0;
    this.mesh.add(centerLine);

    // Center spot
    const centerSpotGeometry = new THREE.CircleGeometry(0.5, 16);
    const centerSpot = new THREE.Mesh(centerSpotGeometry, outlineMaterial);
    centerSpot.rotation.x = -Math.PI / 2;
    this.mesh.add(centerSpot);
  }

  getMesh() {
    return this.mesh;
  }
}
