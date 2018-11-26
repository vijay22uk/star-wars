class Store {
    constructor() {
        this.isAuthenticated = false;
        this.timeRemaining = 60;
        this.searchRemaining = 15;
        this.timer = null;
        this.onTickCallback = null;
        this.userData = {}
    }
    setAuth(auth) {
        this.isAuthenticated = auth;
    }
    setTimeRemaining(tm) {
        this.timeRemaining = tm;
    }
    getTimeRemaining() {
        return this.tm;
    }
    getSearchRemaining() {
        return this.searchRemaining;
    }
    setSearchRemaining(val) {
        this.searchRemaining = val;
    }
    initTimer(cb) {
        this.onTickCallback = cb;
        clearInterval(this.timer);
        this.timer = setInterval(this.tick, 1000);
    }
    tick = ()=> {
        --this.timeRemaining;
        if (this.onTickCallback && typeof this.onTickCallback === "function") {
            this.onTickCallback(this.timeRemaining);
        }
        if(this.timeRemaining<0){
            this.timeRemaining = 60;
        }
    }
    setUserDetails(userData){
        this.userData = userData;
    }
    getUserDetails(){
        return this.userData;
    }
    unSubscribe(){
        this.onTickCallback = null;
    }
}

export default new Store();