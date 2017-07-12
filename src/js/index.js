import * as THREE from 'three';
import Detector from './utils/detector';
import {spinningBox, movingMountains} from './main/main';


function init() {
  // Check for webGL capabilities
  if(!Detector.webgl) {
    Detector.addGetWebGLMessage();
  } else {
  	movingMountains(); 
  	// spinningBox();
  	
    // const container = document.getElementById('appContainer');
    // new Main(container);
  }
}

init();