
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

	

	return corpus;
}
