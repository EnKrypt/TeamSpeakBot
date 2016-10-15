var youtubedl = require('youtube-dl');

module.exports=function(context){
	if (context.command!="play"||(context.args[0]||" ").startsWith("http")){
        var url = context.args[0];
        if ((context.args[0]||" ").indexOf("youtube.com")!=-1 || (context.args[0]||" ").indexOf("youtu.be")!=-1) {
            youtubedl.getInfo(url, [], function(err, info) {
                if (err) {
                    console.log('youtube-dl error: ', err.stack);
                } else {
                    context.callback({
                        command: "mpv",
                        args: ["--input-terminal", "-volume=50", "--no-video", "--quiet", info.url]
                    });
                }
            });
        } else {
            context.callback({
                command: "mpv",
                args: ["--input-terminal", "-volume=50", "--no-video", "--quiet", context.args[0]]
            });
        }
	}
	else{
		throw new Error('Not a valid URL');
	}
}
