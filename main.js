import "./style.css";
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders/glTF";
import { Inspector } from "@babylonjs/inspector";

const totalSpan = document.querySelector("#totalSpan")
document.querySelector("#popupBtn").addEventListener("click", ()=>{
  document.querySelector("#popup").style.display="none"
  document.querySelector("#overlay").style.display="flex"
})
const canvas = document.getElementById("canvas");
const engine = new BABYLON.Engine(canvas, true);

async function createScene() {
  const scene = new BABYLON.Scene(engine);

  const camera = new BABYLON.FreeCamera(
    "camera",
    new BABYLON.Vector3(0, 3, -8),
    scene
  );
  camera.attachControl();
  camera.applyGravity = false;
  camera.checkCollisions = true;
  camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);
  camera.minZ = 0.4;
  camera.speed = 1;
  camera.angularSensibility = 2000;
  camera.keysUp.push(87);
  camera.keysLeft.push(65);
  camera.keysDown.push(83);
  camera.keysRight.push(68);
  camera.inertia = 0.35;

  //   "camera1",
  //   Math.PI / 2,
  //   Math.PI / 4,
  //   10,
  //   new BABYLON.Vector3(0, -5, 0),
  //   scene
  // );

  // camera.setTarget(BABYLON.Vector3.Zero());
  // camera.attachControl(canvas, false);
  const light1 = new BABYLON.HemisphericLight(
    "light1",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );

  const resultGarden = await BABYLON.SceneLoader.ImportMeshAsync(
    "",
    "./models/",
    "my-garden.glb",
    scene
  );


  const resultBottles = await BABYLON.SceneLoader.ImportMeshAsync(
    "",
    "./models/",
    "bottles.glb",
    scene
  );

  const garden = scene.getNodeByName("garden");
  const bottle0 = scene.getNodeByName("bottle");
  const bottle1 = scene.getNodeByName("bottle.001");
  const bottle2 = scene.getNodeByName("bottle.002");
  const bottle3 = scene.getNodeByName("bottle.003");
  const bottle4 = scene.getNodeByName("bottle.004");

  let totalBottles = 0

  scene.onPointerObservable.add((pointerInfo) => {
    if(pointerInfo.type === BABYLON.PointerEventTypes.POINTERDOWN){
      if(pointerInfo.pickInfo.pickedMesh!== null &&pointerInfo.pickInfo.pickedMesh.name){
      switch(pointerInfo.pickInfo.pickedMesh.name){
        case "bottle_primitive0":
        case "bottle_primitive1":
        case "bottle_primitive2":
        case "bottle.001_primitive0":
        case "bottle.001_primitive1":
        case "bottle.001_primitive2":
        case "bottle.002_primitive0":
        case "bottle.002_primitive1":
        case "bottle.002_primitive2":
        case "bottle.003_primitive0":
        case "bottle.003_primitive1":
        case "bottle.003_primitive2":
        case "bottle.004_primitive0":
        case "bottle.004_primitive1":
        case "bottle.004_primitive2":
          console.log("Bottle Selected")
          totalBottles++
          totalSpan.textContent = totalBottles.toString()
          pointerInfo.pickInfo.pickedMesh.parent.dispose()
        break
      }
    }
  }
  });

  return scene;
}

const scene = await createScene();

const gameOverStat = false
engine.runRenderLoop(() => {
  scene.render();
  if(totalSpan.textContent ==="5"){
    gameOver()
  }
});
window.addEventListener("resize", () => {
  engine.resize();
});

const gameOver =()=>{
  var newPopupDiv = document.createElement("div");
  newPopupDiv.setAttribute("id", "newpopup");
  newPopupDiv.setAttribute("class", "popupDiv");

  // Create the paragraph element
  var newParagraph = document.createElement("p");
  var paragraphText = document.createTextNode("You take the potion and the world goes black. You wake up in your bed. It was all a dream. On your lap a slice fo 3 day old pizza. You'll never order from Dominos again.");
  newParagraph.appendChild(paragraphText);

  // Create the button element
  var newButton = document.createElement("button");
  var buttonText = document.createTextNode("Continue Exploring");
  newButton.appendChild(buttonText);
  newButton.setAttribute("class", "btn");
  console.log(newButton)

  // Add an event listener to the button
  newButton.addEventListener("click", (e)=> {
    e.preventDefault()
      newPopupDiv.remove()
  });

  // Append paragraph and button elements to the div
  newPopupDiv.appendChild(newParagraph);
  newPopupDiv.appendChild(newButton);

  // Add the new popup div to the body of the document
  document.body.appendChild(newPopupDiv);

  totalSpan.textContent =null

  document.querySelector("#totalP").textContent ="Game Over"

}
