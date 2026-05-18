export class SDKSocket{
    constructor({ projectId, endpoint }) {

        this.projectId = projectId;

        this.endpoint = endpoint.replace(
            "http",
            "ws"
        );

        this.socket = null;

        this.connected = false;

        this.connect();
    }

    connect(){
        try{
            this.socket = new WebSocket(
                `${this.endpoint}/project/${this.projectId}/live`
            );

            this.socket.onopen = () =>{
                this.connected = true

                console.log(
                    "BugMonitor WS Connected"
                );
            };

            this.socket.onclose = () =>{
                this.connected = false;

                console.log(
                    "BugMonitor WS Disconnected"
                );

                setTimeout(() => {
                    this.connect();
                }, 3000);
            }

            this.socket.onerror = () =>{
                this.connected = false;
            }
        }catch(error){
            console.error("BugMonitor Socket Error",error);
        };
    }

    send(data){
        if(!this.connected || !this.socket){
            return
        }
        this.socket.send(JSON.stringify(data))
    }
}