module.exports=function(context){
	if (context.args[0]=='+'){
		context.ex.stdin.write('\x2a');
	}
	else if (context.args[0]=='-'){
		context.ex.stdin.write('\x2f');
	}
	else{
		throw new Error('Invalid parameters for volume control');
	}
}