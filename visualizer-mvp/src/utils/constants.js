// src/utils/constants.js
export const PITCH_DIMENSIONS = {
  width: 105,
  height: 68,
  centerCircleRadius: 9.15,
  penaltyAreaWidth: 40.32,
  penaltyAreaHeight: 16.5,
  goalAreaWidth: 18.32,
  goalAreaHeight: 5.5,
};

export const TEAM_COLORS = {
  teamA: 0xe63946, // Red
  teamB: 0x457b9d, // Blue
  pitch: 0x2d5a2d, // Green
  lines: 0xffffff, // White
};

export const FORMATIONS = {
  433: {
    teamA: [
      { x: 0, z: 0, role: "GK" }, // GK
      { x: -38, z: -15, role: "DEF" }, // LB
      { x: -38, z: -5, role: "DEF" }, // LCB
      { x: -38, z: 5, role: "DEF" }, // RCB
      { x: -38, z: 15, role: "DEF" }, // RB
      { x: -20, z: -10, role: "MID" }, // LM
      { x: -20, z: 0, role: "MID" }, // CM
      { x: -20, z: 10, role: "MID" }, // RM
      { x: -5, z: -15, role: "ATT" }, // LW
      { x: -5, z: 0, role: "ATT" }, // ST
      { x: -5, z: 15, role: "ATT" }, // RW
    ],
    teamB: [
      { x: 0, z: 0, role: "GK" }, // GK
      { x: 38, z: -15, role: "DEF" }, // LB
      { x: 38, z: -5, role: "DEF" }, // LCB
      { x: 38, z: 5, role: "DEF" }, // RCB
      { x: 38, z: 15, role: "DEF" }, // RB
      { x: 20, z: -10, role: "MID" }, // LM
      { x: 20, z: 0, role: "MID" }, // CM
      { x: 20, z: 10, role: "MID" }, // RM
      { x: 5, z: -15, role: "ATT" }, // LW
      { x: 5, z: 0, role: "ATT" }, // ST
      { x: 5, z: 15, role: "ATT" }, // RW
    ],
  },
};
