import * as THREE from 'three';

export default class Branch {
  constructor(origin, left, right) {
    this.geometry_branches = new THREE.Geometry();
    this.geometry_branches.vertices.push(new THREE.Vector3(left.x, left.y, 0));
    this.geometry_branches.vertices.push(new THREE.Vector3(origin.x, origin.y, 0));
    this.geometry_branches.vertices.push(new THREE.Vector3(right.x, right.y, 0));
  }

  getBranch() {
    const material = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 15 });
    const lineBranches = new THREE.Line(this.geometry_branches, material);
    return lineBranches;
  }
}
