class Slide {
    constructor(options) {
        this.$element = $(options.element);
        this.currentPage = 0;
        this.timer = null;
        this.initHtml();
        this.bindEvents();
        if (options.autoplay) {
            this.play();
        }
    }

    initHtml() {
        this.$element.addClass('mySlides');

        const $li = this.$element.find('ol > li');
        this.totalPage = $li.length;
        this.pageWidth = $li.width();
        this.$element.width(this.pageWidth);

        const $prev = $('<div class="buttons prev"></div>');
        $prev.html('<svg class="icon" aria-hidden="true"><use xlink:href="#icon-PreviousTrack"></use></svg>');
        this.$element.append($prev);

        const $next = $('<div class="buttons next"></div>');
        $next.html('<svg class="icon" aria-hidden="true"><use xlink:href="#icon-NextTrack"></use></svg>');
        this.$element.append($next);
    }

    go(index) {
        if (index < 0) {
            index = this.totalPage - 1;
        }
        if (index >= this.totalPage) {
            index = 0;
        }

        this.$element.children('ol').css({
            transform: `translateX(-${index * this.pageWidth}px)`
        });
        this.currentPage = index;
    }

    prev() {
        this.go(this.currentPage - 1);
    }

    next() {
        this.go(this.currentPage + 1);
    }

    play() {
        this.timer = setInterval(() => {
            this.next();
        }, 2000);
    }

    stop() {
        if (this.timer) {
            window.clearInterval(this.timer);
        }
    }

    bindEvents() {
        $('.buttons.prev').on('click', this.prev.bind(this));
        $('.buttons.next').on('click', this.next.bind(this));

        this.$element.on('mouseenter', this.stop.bind(this))
            .on('mouseleave', this.play.bind(this));
    }
}

new Slide({
    element: '.slides',
    autoplay: true
});