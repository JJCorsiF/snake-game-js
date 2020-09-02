class BarramentoDeEventos {
	constructor() {
		this.events = {};
	}
	
	// 1st implementation:

	subscribe(eventName, fn) {
		this.events[eventName] = this.events[eventName] || [];
		this.events[eventName].push(fn);
	}

	unsubscribe(eventName, fn) {
		if (!(this.events[eventName])) {
			return;
		}
		
		for (let i = 0; i < this.events[eventName].length; i++) {
			if (this.events[eventName][i] === fn) {
				this.events[eventName].splice(i, 1);
				break;
			}
		}
	}
	
	publish(eventName, data) {
		if (!(this.events[eventName])) {
			return;
		}
		
		this.events[eventName].forEach(function (fn) {
			fn(data);
		});
	}
	
	// Implementation 2:

	//subscriber
	// addEventListener(eventName, listener) {
	// 	if (!this.events[eventName] || this.events[eventName].length < 1) {
	// 		this.events[eventName] = [];
	// 	}
	// 	this.events[eventName].push(listener);
	// }

	// //Subscribers:
	// emitEventListeners(eventName, params) {
	// 	if (!this.events[eventName] || this.events[eventName].length < 1) {
	// 		return;
	// 	}
	// 	this.events[eventName].forEach(function (listener) {
	// 		listener(!!params ? params : {});
	// 	});
	// }

	// getListener(eventName) {
	// 	return this.events[eventName];
	// }

	// removeListener(eventName, listener) {
	// 	if (!this.events[eventName] || this.events[eventName].length < 1) {
	// 		return;
	// 	}
	// 	// delete listener by event name
	// 	delete this.events[eventName];
	// }
}

export { BarramentoDeEventos };