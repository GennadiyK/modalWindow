var app = app || {};

app.ModalWindow = function(elem) {
    this.elem = elem;
    this.buttonEl = document.querySelector(elem.dataset.btn);
    this._visible = false;
    this.animateDuration = 600;
    this.timePassed = 0;
};

app.ModalWindow.prototype.init = function() {
    var self = this;
    this.buttonEl.addEventListener('click', function(e){
        e.preventDefault();
        self.show(self.elem);
    });

};

app.ModalWindow.prototype.show = function (elem) {
    elem.style.display = 'block';
    this.animate(elem, 'opacity', 0, 1, this.animateDuration);
};

app.ModalWindow.prototype.animate = function (elem, prop, start, finish, dur, callback) {
    var startTime = Date.now();
    var path = finish - start;


    var timer = setInterval(function(){
        var t = (Date.now() - startTime) / dur;


        if(t >= 1) {
            this.timePassed = finish;
            clearInterval(timer);
            if(callback instanceof Function) {
                callback();
            }
        } else {
            this.timePassed = start + (t * path);
        }



        elem.style[prop] = this.timePassed;

    }.bind(this), 5);

};