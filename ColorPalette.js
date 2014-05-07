;(function (root) {
    var ColorPalette = root.Asteroids = (root.Asteroids || {});

    ColorPalette.Gradient = {
        UNCATEGORIZED: 0,
        WHITE: 1,
        GREEN: 2,
        BLUE: 3,
        RED: 4,
        BLACK: 5
    }

    ColorPalette.makeRGBAString = function (red, green, blue, alpha) {
        return "rgba(" + red + "," + green + "," + blue + "," + alpha + ")";
    }

    ColorPalette.color = function (colorGradient, index, count, reversed) {
        if (reversed) {
            index = count - index;
        }

        var startingRedTint, startingGreenTint, startingBlueTint;
        var endingRedTint, endingGreenTint, endingBlueTint;

        var cutoff = 0;
        switch (colorGradient) {
            case this.Gradient.GREEN: {
                startingRedTint   = (25 + cutoff * 10);
                startingGreenTint = (190 + cutoff * 10);
                startingBlueTint  = (25 + cutoff * 10);

                cutoff            = 5;
                endingRedTint     = (25 + cutoff * 10);
                endingGreenTint   = (190 + cutoff * 10);
                endingBlueTint    = (25 + cutoff * 10);
            } break;
            case this.Gradient.BLUE: {
                startingRedTint   = (45 + cutoff * 12);
                startingGreenTint = (100 + cutoff * 12);
                startingBlueTint  = (215 + cutoff * 10);

                cutoff            = 6;
                endingRedTint     = (45 + cutoff * 12);
                endingGreenTint   = (100 + cutoff * 12);
                endingBlueTint    = (215 + cutoff * 10);
            } break;
            case this.Gradient.RED: {
                startingRedTint   = (215 + cutoff * 10);
                startingGreenTint = (25 + cutoff * 20);
                startingBlueTint  = (25 + cutoff * 10);

                cutoff            = 4;
                endingRedTint     = (215 + cutoff * 10);
                endingGreenTint   = (25 + cutoff * 20);
                endingBlueTint    = (25 + cutoff * 10);
            } break;
            case this.Gradient.BLACK: {
                startingRedTint = startingBlueTint = startingGreenTint =
                (65 + cutoff * 8.0);

                cutoff          = 7;
                endingRedTint   = endingGreenTint = endingBlueTint  =
                (65 + cutoff * 8.0);
            } break;
            case this.Gradient.WHITE: {
                startingRedTint = startingGreenTint = startingBlueTint =
                    (200 - cutoff * 6.0);

                cutoff          = 6;
                endingRedTint   = endingGreenTint =  endingBlueTint =
                    (200 - cutoff * 6.0);

            } break;
            default:
                return this.makeRGBAString(192,192,192,1);
                break;
        }

        var delta = 1.0 / cutoff;

        if ( count > cutoff ) {
            delta = 1.0 / count;
        } else {
            count = cutoff;
        }

        var s     = delta * (count - index);
        var e     = delta * index;

        var red   = startingRedTint * s + endingRedTint * e;
        var green = startingGreenTint * s + endingGreenTint * e;
        var blue  = startingBlueTint * s + endingBlueTint * e;

        return this.makeRGBAString(red, green, blue, 255);
    }
})(this);
