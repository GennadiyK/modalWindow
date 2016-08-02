var app = app || {};

app.ModalWindow = function(elem) {
    this.elem = elem;
    this.buttonShowEl = document.querySelector('.' + elem.dataset.btnShow);
    this.buttonHideEl = document.querySelector('.' + elem.dataset.btnClose);
    this.modalBg = document.createElement('div');
    this.modalBg.classList.add('modal-overlay');
    this._visible = false;
    this.animateDuration = 600;
    this.animateTimePassed = 0;
};

app.ModalWindow.prototype.init = function() {
    var self = this;
    this.buttonShowEl.addEventListener('click', function(e){
        e.preventDefault();
        self.showElem(self.elem, self.modalBg);
    });

    this.buttonHideEl.addEventListener('click', function(e){
        e.preventDefault();
        self.hideElem(self.elem, self.modalBg);

    });
};

app.ModalWindow.prototype.showElem = function (elem, overlay) {

    if(!this._visible) {
        this._visible = true;
        this.generateModalBg(overlay);
        elem.style.display = 'block';
        overlay.style.display = 'block';
        this.animate(elem, 'opacity', 0, 1, this.animateDuration);
        this.animate(overlay, 'opacity', 0, 1, this.animateDuration);
    }

};

app.ModalWindow.prototype.hideElem = function (elem, overlay) {
    if(this._visible) {
        this._visible = false;
        this.animate(elem, 'opacity', 1, 0, this.animateDuration, function () {

            elem.style.display = 'none';
        });
        this.animate(overlay, 'opacity', 1, 0, this.animateDuration, function(){
            overlay.style.display = 'none';
            this.removeModalBg(overlay);
        }.bind(this));
    }
};

app.ModalWindow.prototype.generateModalBg = function(elem) {
    if(!document.querySelector('.modal-overlay')) {
        document.querySelector('body').appendChild(elem);
    }
};

app.ModalWindow.prototype.removeModalBg = function(elem) {
    var parent = document.querySelector('body');
    parent.removeChild(elem);
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