module.exports=function(context){
	context.args[0]=__dirname+"/../sounds/2SAD4ME.mp3";
	return require('./../commands/play')(context);
}