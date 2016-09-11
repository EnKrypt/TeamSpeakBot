var proc=require('child_process').spawn;
var bot=new (require('net')).Socket();

var host="localhost";
var port=25639;
var delim="!";

var ex;
var playing=false;

bot.setEncoding('utf8');
var reconnect=function(){
	bot.connect(port, host, function(){
		console.log("Connected");
		bot.write('clientnotifyregister schandlerid=0 event=any\r\n');
	});
}
reconnect();

bot.on('data', function(data){
	data=data.trim();
	var args=data.split(" ");
	var command=args.shift();
	var params=argstojson(args);
	if (command=="notifytextmessage"&&params.msg[0]==delim){
		var usermsg=formatfrom(params.msg).trim().split(" ");
		var usercommand=usermsg.shift().substring(1).toLowerCase();
		
		var context={
			args: usermsg,
			bot: bot,
			command: usercommand,
			ex: ex,
			from: params.invokername,
			playing: playing
		}
		
		if (playing){
			try{
				require('./playing/'+usercommand)(context);
				console.log(params.invokername+": "+usercommand+" "+usermsg.join(" "));
			}
			catch(e){
				send(params.invokername+": "+((e.message.trim().toLowerCase().startsWith("cannot find module"))?usercommand+" cannot be done to currently playing file or URL":e.message));
			}
		}
		else{
			try{
				var resargs=require('./commands/'+usercommand)(context);
				ex=proc(resargs.command, resargs.args, {
					stdio: ['pipe', 'ignore', 'ignore']
				});
				playing=true;
				console.log(params.invokername+": "+usercommand+" "+usermsg.join(" ")+" \nCOMMAND: "+resargs.command+" "+resargs.args.join(" "));
				ex.on('exit', function(){
					playing=false;
					console.log("Stopped playback");
				});
			}
			catch(e){
				send(params.invokername+": "+((e.message.trim().toLowerCase().startsWith("cannot find module"))?usercommand+" is not a valid command":e.message));
			}
		}
	}
});

bot.on('close', function(){
	console.log("Connection closed. Retrying..");
	reconnect();
});

var send=function(mes){
	bot.write("sendtextmessage targetmode=2 msg="+formatto(mes)+"\r\n");
}

var formatto=function(message){
	return message.replace(/ /g, '\\s');
}

var formatfrom=function(message){
	return message.replace(/\\s/g, ' ').replace(/\\\//g,'/').replace(/\[URL\]/g, '').replace(/\[\/URL\]/g, '');
}

var argstojson=function(args){
	var result={};
	for (var i=0;i<args.length;i++){
		var mapped=args[i].split("=");
		result[mapped.shift()]=mapped.join('=');
	}
	return result;
}