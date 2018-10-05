

class SmartInput{
	constructor( options ){
		var defaultAttributes = {
			element: null,
			minNum: null,
			maxNum: null,
			testPattern: /^.*$/,
			preventBadInput: true,
			errorMessage: 'error in input',
			correctCallback: function(){ console.log('correct data')},
			errorCallback: function(){ console.log('incorrect data')},
			errorRemoveTime: 2000,
			fade: false,
			fadeTime: 1500
		}
		this.containerElement = null;
		this.errorContainer = null;
		this.attributes = {};
		this.clearTimer = null;
		this.fadeTimer = null;
		for(var key in defaultAttributes){
			this.attributes[key] = options[key] || defaultAttributes[key]
		}
		if(this.attributes.minNum!==null || this.attributes.maxNum!==null){
			this.testNum = true;
		} else {
			this.testNum = false;
		}
		this.attributes.element = $(this.attributes.element);
		this.testInput = this.testInput.bind(this);
		this.clearError = this.clearError.bind(this);
		this.fadeClear = this.fadeClear.bind(this);
		this.prepInput();
	}
	getValue(){
		return this.attributes.element.val();
	}
	setValue(newValue){
		if(!this.attributes.testPattern.test(newValue)){
			return false
		}
		if(this.testNum && newValue<this.attributes.minNum){
			return false
		}
		if(this.testNum && newValue>this.attributes.maxNum){
			return false
		}	
		this.attributes.element.val(newValue);
		return true;
	}
	/* private methods */
	prepInput(){
		if(this.attributes.preventBadInput){
			this.attributes.element.on('keydown',this.testInput);
		} else {
			this.attributes.element.on('keyup',this.testInput);
		}
		this.containerElement = $("<span>", {
			'class': 'inputContainer'
		});
		this.errorContainer = $("<span>",{
			'class': 'errorContainer',
			text: ''
		});
		this.containerElement.insertBefore(this.attributes.element);
		this.containerElement.append(this.attributes.element, this.errorContainer);
	}
	testInput(){
		if(this.clearTimer!==null){
			clearTimeout(this.clearTimer);
			this.clearTimer=null;
		}
		this.clearError();
		if(this.attributes.preventBadInput){
			value = this.attributes.element.val() + event.key;
		} else {
			var value = this.attributes.element.val();
		}
		if(this.testNum){
			value = Number(value);
		}
		if(!this.attributes.testPattern.test(value)){
			return this.handleError(value);
		}
		if(this.testNum && value<this.attributes.minNum){
			return this.handleError(value);
		}
		if(this.testNum && value>this.attributes.maxNum){
			return this.handleError(value);
		}
		this.clearError();
		this.attributes.correctCallback(value, this.attributes.element[0]);
		return true; //for inputs to type value
	}
	handleError(value){
		this.errorContainer.text(this.attributes.errorMessage).css('opacity', 1);
		this.attributes.errorCallback(value, this.attributes.element[0], this.attributes.errorMessage);
		if(this.attributes.preventBadInput){
			this.delayClear();
			return false;
		}
	}
	delayClear(){
		var targetFunction;
		if(this.attributes.fade){
			targetFunction = this.fadeClear;
		} else {
			targetFunction = this.clearError;
		}
		this.clearTimer = setTimeout(targetFunction, this.attributes.errorRemoveTime);
	}
	stopFade(){
		clearInterval(this.fadeTimer);
		this.fadeTimer = null;
	}
	fadeClear(){
		this.clearTimer = null;
		this.stopFade();
		var currentOpacity = 1;
		var msPerInterval = 30;
		var intervalCount = Math.ceil(this.attributes.fadeTime / msPerInterval);
		var fadeDelta = 1 / intervalCount;

		function fadeError(){
			this.errorContainer.css('opacity', currentOpacity);
			currentOpacity -= fadeDelta;
			if(currentOpacity<0){
				this.stopFade();
				this.clearError();
			}
		}
		this.fadeTimer = setInterval( fadeError.bind(this), msPerInterval)
	}
	clearError(){
		this.clearTimer = null;
		this.errorContainer.text('');
	}
}





