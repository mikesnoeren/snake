const settings = {
    game: {
        gridSize: 512,
        cells: 32,
        get cellSize() {
            return this.gridSize / this.cells;
        }
    },
    colors: {
        backgroundColor: '#1f2937',
        button: {
            textColor: '#fff',
            backgroundColor: '#15803d',
            backgroundColorHover: '#16a34a',
            backgroundColorActive: '#166534'
        },
        text: {
            heading: '#15803d',
            body: '#86efac',
            textStroke: '#bbf7d0'
        },
        snakes: [
            '#16a34a',
            '#9333ea'
        ]
    },
    fontStyle: {
        heading: {
            fontFamily: 'Playwrite NL',
            fontSize: 50,
            strokeThickness: 2,
            resolution: 2,
            padding: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10
            },
            get color() {
                return settings.colors.text.heading;
            },
            get stroke() {
                return settings.colors.text.textStroke;
            }
        },
        text: {
            fontFamily: 'inter',
            fontSize: 18,
            strokeThickness: 0,
            resolution: 0,
            padding: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10
            },
            get color() {
                return settings.colors.text.body;
            }
        }
    },
    buttonStyle: {
        default: {
            padding: {
                top: 10,
                right: 15,
                bottom: 10,
                left: 15
            },
            get color() {
                return settings.colors.button.textColor;
            },
            get backgroundColor() {
                return settings.colors.button.backgroundColor;
            }
        },
        hover: {
            get backgroundColor() {
                return settings.colors.button.backgroundColorHover;
            }
        },
        active: {
            get backgroundColor() {
                return settings.colors.button.backgroundColorActive;
            }
        }
    }
};

export default settings;