var app = app || {};

app.ModalWindow = function(elem) {
    this.elem = elem;
    this.buttonEl = elem.dataset.btn;
    this._visible = false;
    this.animateDuration = 600;
    this.distance = 0;
};

app.ModalWindow.prototype.init = function() {
    this.show(this.elem);
};

app.ModalWindow.prototype.show = function (elem) {
    this.animate(elem, 100, 'opacity', 0, 1, function(){
        elem.style.display = 'block';
    });
};

app.ModalWindow.prototype.animate = function(elem, dur, prop, start, end, callback) {
    var startTime = new Date().getTime();
    var path = end - start;

    var time = setInterval(function(){
        var t = (Date.now() - startTime) / dur;

        if(t >= 1) {
            this.distance = end;
            clearInterval(time);
            if(callback instanceof Function) {
                callback();
            }
        } else {
            this.distance = start + (t * path );
        }

        elem.style[prop] = this.distance;

    }.bind(this),this.animateDuration);


};