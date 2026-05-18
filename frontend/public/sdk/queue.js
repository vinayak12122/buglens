import {SDK_CONFIG} from './config.js'

export class EventQueue{
    constructor(){
        this.queue = [];
    }

    add(event){
        event.retryCount = event.retryCount || 0;

        if(this.queue.length >= SDK_CONFIG.MAX_QUEUE_SIZE){
            this.queue.shift()
        }
        this.queue.push(event);
    }
    getBatch(){
        return this.queue.splice(0,SDK_CONFIG.MAX_BATCH_SIZE);
    }
    size(){
        return this.queue.length;
    }
    requeue(events) {
        const validEvents = events.filter(
            event =>
                event.retryCount < SDK_CONFIG.RETRY_LIMIT
        );

        validEvents.forEach(event => {
            event.retryCount++;
        });

        this.queue.unshift(...validEvents);
    }
}