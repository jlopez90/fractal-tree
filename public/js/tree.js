import * as THREE from 'three';
import Branch from './branch';

export default class Tree {
  constructor(startX = 0, startY = 0, length = 10, growPercentatge, material) {
    this.geometry = [];

    this.material = material;
    this.growPercentatge = growPercentatge;

    // root
    this.initRoot();
    this.grow({ x: startX, y: startY }, length, Math.PI / 4, Math.PI / 4);
  }

  initRoot() {
    const geometryRoot = new THREE.Geometry();
    geometryRoot.vertices.push(new THREE.Vector3(0, -10, 0));
    geometryRoot.vertices.push(new THREE.Vector3(0, 0, 0));
    const lineRoot = new THREE.Line(geometryRoot, this.material);

    this.geometry.push(lineRoot);
  }

  get() {
    return this.geometry;
  }

  grow(start, length, leftAngle, rightAngle) {
    if (length < 0.5) return;

    const newLength = length * this.growPercentatge;

    const leftEnd = {
      x: start.x - (newLength * (Math.cos(leftAngle))),
      y: start.y + (newLength * (Math.sin(leftAngle))),
    };

    const rightEnd = {
      x: start.x + (newLength * (Math.cos(rightAngle))),
      y: start.y + (newLength * (Math.sin(rightAngle))),
    };

    const newBranch = new Branch(start, leftEnd, rightEnd);
    this.geometry.push(newBranch.getBranch());

    // left branch
    this.grow(
      leftEnd,
      newLength,
      Math.random() * (((Math.PI / 3) - (Math.PI / 6)) + (Math.PI / 6) + leftAngle),
      Math.random() * (((Math.PI / 3) - (Math.PI / 6)) + (Math.PI / 6) + rightAngle),
    );

    // right branch
    this.grow(
      rightEnd,
      newLength,
      Math.random() * (((Math.PI / 3) - (Math.PI / 6)) + (Math.PI / 6) + leftAngle),
      Math.random() * (((Math.PI / 3) - (Math.PI / 6)) + (Math.PI / 6) + rightAngle),
    );
  }
}
