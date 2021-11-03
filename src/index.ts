import * as THREE from "three";
import { VRButton, } from 'three/examples/jsm/webxr/VRButton'

window.addEventListener("DOMContentLoaded", () => {
  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer();
  renderer.xr.enabled = true
  // レンダラーのサイズを設定
  renderer.setSize(window.innerWidth, window.innerHeight);
  // canvasをbodyに追加
  document.body.appendChild(renderer.domElement);
  document.body.appendChild( VRButton.createButton( renderer ) )

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, 800 / 600, 1, 10000);
  camera.position.set(0, 0, 1000);

  // 箱を作成
  const geometry = new THREE.TorusGeometry(300, 100, 64, 100);
  const material = new THREE.MeshToonMaterial({ color: 0xff0000 });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.z = -5;
  scene.add(mesh);

  // 平行光源を生成
  const light = new THREE.DirectionalLight(0xffffff);
  light.position.set(1, 1, 1);
  scene.add(light);

  const tick = (): void => {
    requestAnimationFrame(tick)
    renderer.setAnimationLoop(() => {
      mesh.rotation.x += 0.05;
      mesh.rotation.y += 0.05;
      // 描画
      renderer.render(scene, camera);
    })
  };
  tick();

  console.log("Hello Three.js");
});