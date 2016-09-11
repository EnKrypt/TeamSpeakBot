module.exports=function(context){
	context.args[0]=__dirname+"/../sounds/LEEROYJENKINS.mp3";
	return require('./../commands/play')(context);
}