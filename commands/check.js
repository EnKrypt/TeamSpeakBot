module.exports=function(context){
	if (context.playing){
		throw new Error('Playback in progress');
	}
	else{
		throw new Error('Nothing is being played');
	}
}