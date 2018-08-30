
function main () {
	var corpusHeight = 35;
	var corpusWidth = 37;
	var corpusDepth = 40;

	var drawerHeight = 13;
	var clearance = 0.2;

	var handleWidth = 7;
	var handleHeight = 1;
	var handleDepth = 2;

	var totalHeight = 60;

	var footWidth = 4;
	var footMargin = 2;

	var frameHeight = 5;
	var frameWidth = 2;

	var drawerPulledOut = 0;
	
	var corpus = cube({size: [corpusDepth, corpusWidth, corpusHeight]});

	var wallThickness = 2;
	var cutout = cube({size: [corpusDepth-wallThickness, corpusWidth-2*wallThickness, corpusHeight-2*wallThickness]})
		.translate([0, wallThickness, wallThickness]);
	
	corpus = difference(corpus, cutout);

	var floor = cube({size: [corpusDepth, corpusWidth, wallThickness]})
		.translate([0, 0, corpusHeight - 2*wallThickness - drawerHeight]);
	
	corpus = union(corpus, floor);

	var drawer = cube({size: [corpusDepth - wallThickness - clearance, corpusWidth-2*wallThickness-2*clearance, drawerHeight-2*clearance]});

	var drawerCutout = cube({size: [
		corpusDepth - wallThickness - clearance - 2*wallThickness,
		corpusWidth-2*wallThickness-2*clearance - 2*wallThickness,
		drawerHeight-2*clearance - wallThickness]})
		.translate([wallThickness, wallThickness, wallThickness]);

	drawer = difference(drawer, drawerCutout);

	var handle = cube({size: [handleDepth, handleWidth, handleHeight], center: [false, true, true]})
		.translate([-handleDepth, corpusWidth/2-wallThickness-clearance/2, drawerHeight/2]).setColor([1, 0, 0]);

	drawer = union(drawer, handle);

	drawer = drawer.translate([-drawerPulledOut, wallThickness+clearance, corpusHeight - drawerHeight - wallThickness + clearance]);

	corpus = union(corpus, drawer);

	corpus = corpus.translate([0, 0, totalHeight-corpusHeight]);

	var foot = cube({size: [footWidth, footWidth, totalHeight-corpusHeight]});

	var wideFrame = cube({size: [frameWidth, corpusWidth-2*footMargin, frameHeight]})
		.translate([footMargin+(footWidth-frameWidth)/2, footMargin, totalHeight-corpusHeight-frameHeight]);
		
	var deepFrame = cube({size: [corpusDepth-2*footMargin, frameWidth, frameHeight]})
		.translate([footMargin, footMargin+(footWidth-frameWidth)/2, totalHeight-corpusHeight-frameHeight]);

	var feet = union(
		 foot.translate([footMargin, footMargin, 0])
		,foot.translate([corpusDepth-footMargin-footWidth, footMargin, 0])
		,foot.translate([footMargin, corpusWidth-footMargin-footWidth, 0])
		,foot.translate([corpusDepth-footMargin-footWidth, corpusWidth-footMargin-footWidth, 0])
		,wideFrame
		,wideFrame.mirroredX().translate([corpusDepth, 0, 0])
		,deepFrame
		,deepFrame.mirroredY().translate([0, corpusWidth, 0])
	);

	corpus = union(corpus, feet).center('x', 'y').setColor(0.5, 0.3, 0.2);

	

	return corpus;
}
