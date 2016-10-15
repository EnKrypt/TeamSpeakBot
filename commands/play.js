module.exports=function(context){
	if (context.command!="play"||(context.args[0]||" ").startsWith("http")){
		return {
			command: "mpv",
			args: ["--input-terminal", "-volume=50", "--no-video", "--quiet", context.args[0]]
		};
	}
	else{
		throw new Error('Not a valid URL');
	}
}