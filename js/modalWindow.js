var app = app || {};

app.ModalWindow = function(elem) {
    this.elem = elem;
    this.buttonEl = document.querySelector('.' + elem.dataset.btn);
    this._visible = false;
    this.animateDuration = 600;
    this.animateTimePassed = 0;
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
    this._visible = true;
    this.animate(elem, 'opacity', 0, 1, this.animateDuration, function(){

    });

};

app.ModalWindow.prototype.animate = function (elem, prop, start, end, dur, callback) {
    var startTime = Date.now();
    var path = end - start;

    var time = setInterval(function(){
        var t = (Date.now() - startTime) / dur;

        if(t >=1) {
            this.animateTimePassed = end;
            clearInterval(time);
            if(callback instanceof Function) {
                callback();
            }
        } else {
            this.animateTimePassed = start + (t * path);
        }

        elem.style[prop] = this.animateTimePassed;
    }, 5);


};