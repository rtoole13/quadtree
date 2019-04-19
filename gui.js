"use strict";

//----Gui callbacks----//
//Particles
function updateParticleCount(){
	var diff = params.objectCount - objectCount;
	if (diff > 0){
		addNewObjects(diff);
	}
	else if (diff < 0){
		removeObjects(Math.abs(diff));
	}
    updateDynamicGUIElements();
}

function updateObjectColors(){
    objectColor = params.defaultColor;
    objectColorStr = `rgba(${objectColor}, 1)`;
    objectCollisionColor = params.collisionColor;
    objectCollisionColorStr = `rgba(${objectCollisionColor}, 1)`;   
}

function updateDynamicGUIElements(){
    guiMaxChildrenElement = guiMaxChildrenElement.min(1).max(objectCount);
}

function updateQuadtreeChildCount(){
    maxChildrenPerNode = params.maxChildren;
}

function updateQuadtreeDepth(){
    maxTreeDepth = params.maxDepth;
}

function updateQuadtreeColor(){
    quadtreeColor = params.quadtreeColor;
    quadtreeColorStr = `rgba(${quadtreeColor}, 1)`;   
}

function updateBackgroundColor(){
    backgroundColor = params.backgroundColor;
    backgroundColorStr = `rgba(${backgroundColor}, 1)`;
}

function pause(){
	if (playbackPaused){
		playbackPaused = false;
		requestAnimationFrame(main);
	}
	else{
		playbackPaused = true;
	}
}
//----Gui metric updates----//
function updateGuiMetrics(){
    params.fps = 1/dt;
}

function initializeGUI(){
    params = {fps: 1/dtMax, 
    		  objectCount: objectCount,
              maxChildren: maxChildrenPerNode,
              maxDepth: maxTreeDepth,
              defaultColor: objectColor,
              collisionColor: objectCollisionColor,
              quadtreeColor: quadtreeColor,
              backgroundColor: backgroundColor,
    		  pause: pause};

	gui = new dat.GUI();
	var guiFolderMetrics = gui.addFolder('Metrics');
    guiFolderMetrics.add(params, 'fps', 0, 100).listen();
    
    var guiFolderObjects = gui.addFolder('Objects');
    var entry = guiFolderObjects.add(params, 'objectCount', 0, 1000).step(1);
    entry.onFinishChange(updateParticleCount);

    entry = guiFolderObjects.addColor(params, 'defaultColor');
    entry.onChange(updateObjectColors);

    entry = guiFolderObjects.addColor(params, 'collisionColor');
    entry.onChange(updateObjectColors);

    var guiFolderQuadtree = gui.addFolder('Quadtree');
    guiMaxChildrenElement = guiFolderQuadtree.add(params, 'maxChildren', 0, objectCount).step(1);
    guiMaxChildrenElement.onFinishChange(updateQuadtreeChildCount);

    entry = guiFolderQuadtree.add(params, 'maxDepth', -1, 20).step(1);
    entry.onFinishChange(updateQuadtreeDepth);

    entry = guiFolderQuadtree.addColor(params, 'quadtreeColor');
    entry.onChange(updateQuadtreeColor);

    entry = gui.addColor(params, 'backgroundColor', backgroundColor);
    entry.onChange(updateBackgroundColor);
    //---buttons---//
    gui.add(params, 'pause');
}

