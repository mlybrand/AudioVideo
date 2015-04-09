$(document).ready(function () {
    Main.init();
});

window.Main = {
    init: function () {
        var self = this;
        if (!Modernizr.audio) {
            alert("Audio tag not supported.");
            return;
        }
        if (!Modernizr.video) {
            alert("Video tag not supported.");
        }
        this.video = this.initMedia("video");
        this.audio = this.initMedia("audio");

        this.$volume = $("#volume");

        this.$volumeUp = $("#volume-up")
            .click(function () {
                self.audio.media.muted = false;
                var newVolume = self.audio.media.volume + 0.1;
                if (newVolume > 1) {
                    newVolume = 1;
                }
                self.audio.media.volume = newVolume;
            });

        this.$volumeDown = $("#volume-down")
            .click(function () {
                self.audio.media.muted = false;
                var newVolume = self.audio.media.volume - 0.1;
                console.log(newVolume);
                if (newVolume < 0) {
                    newVolume = 0;
                }
                self.audio.media.volume = newVolume;
            });

        this.$mute = $("#mute")
            .click(function () {
                self.audio.media.muted = !self.audio.media.muted;
            });
        console.log(this);
        this.audio.$media
            .bind("volumechange", function () {
                console.log("changing");
                self.showVolume();
            });

        this.showVolume();
    },
    initMedia: function (name) {
        var result = {};
        result.$media = $("#" + name);
        result.media = result.$media[0];

        result.$controls = $("#" + name + "-controls");

        result.$play = result.$controls.find(".play");
        result.$time = result.$controls.find(".time");
        console.log(result);
        result.$play.click(function () {
            if (result.media.paused) {
                result.media.play();
            } else {
                result.media.pause();
            }
        });

        result.$media
            .bind("playing", function () {
                result.$play.text("pause");
            })
            .bind("pause", function() {
                result.$play.text("play");
            })
            .bind("ended", function() {
                result.media.play();
            })
            .bind("timeupdate", function() {
                var prettyTime =
                    Math.round(result.media.currentTime * 100) / 100;
                result.$time.text("time: " + prettyTime + "s");
            });

        return result;
    },
    showVolume: function () {
        var prettyVolume =
            Math.round(this.audio.media.volume * 10) / 10;
        if (this.audio.media.muted) {
            prettyVolume = 0;
            this.$mute.text("unmute");
        } else {
            this.$mute.text("mute");
        }
        this.$volume.text(prettyVolume);
    }
};