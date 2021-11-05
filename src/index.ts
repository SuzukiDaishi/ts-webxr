import * as THREE from "three";
import { VRButton, } from 'three/examples/jsm/webxr/VRButton'
import { OrbitControls, } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { VRM } from '@pixiv/three-vrm'

window.addEventListener("DOMContentLoaded", async () => {
  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.xr.enabled = true
  // レンダラーのサイズを設定
  renderer.setSize(window.innerWidth, window.innerHeight);
  // canvasをbodyに追加
  document.body.appendChild(renderer.domElement);
  document.body.appendChild( VRButton.createButton( renderer ) )

  // シーンを作成
  const scene = new THREE.Scene();
  const loader = new GLTFLoader()

  // カメラを作成
  let camera: THREE.Camera = new THREE.PerspectiveCamera(45, 800 / 600, 1, 10000)
  const cameraContainer = new THREE.Object3D()
  cameraContainer.add(camera)
  cameraContainer.position.set(0, 0, 5000)
  scene.add(cameraContainer)

  // コントローラを作成
  const orbitControls = new OrbitControls(camera,renderer.domElement);
  orbitControls.screenSpacePanning = true

  // 箱を作成
  const geometry = new THREE.TorusGeometry(300, 100, 64, 100);
  const material = new THREE.MeshToonMaterial({ color: 0xff0000 });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, 20, 20)
  scene.add(mesh);

  new GLTFLoader().load('../assets/model.vrm', (gltf) => {
      VRM.from( gltf ).then( 
      ( vrm ) => {
        scene.add(vrm.scene);
        console.log(vrm);
      },
      ( progress ) => console.log( 'Loading model...', 100.0 * ( progress.loaded / progress.total ), '%' ),
    )
  })

  // 平行光源を生成
  const light = new THREE.DirectionalLight(0xffffff);
  light.position.set(1, 1, 1);
  scene.add(light);

  const tick = (): void => {
    mesh.rotation.x += 0.05;
    mesh.rotation.y += 0.05;
    
    renderer.setAnimationLoop(() => {
      orbitControls.update()
      // 描画
      renderer.render(scene, camera);
    })
    requestAnimationFrame(tick)
  };
  tick();

  console.log("Hello Three.js");
});

