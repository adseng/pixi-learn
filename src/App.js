import * as PIXI from 'pixi.js';
// 使用本机窗口分辨率作为默认分辨率
// 渲染时支持高密度显示
// PIXI.settings.RESOLUTION = window.devicePixelRatio;
//
// // 缩放时禁用插值，将使纹理像素化
// PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
export const app = () => {
    // The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
    const app = new PIXI.Application();

    app.renderer.backgroundColor = 0xbadc58;
    app.renderer.view.style.position = "relative";
    app.renderer.view.style.display = "block";
    app.renderer.autoDensity = true;
    app.renderer.antialias = true;
    app.resizeTo = document.body;

// The application will create a canvas element for you that you
// can then insert into the DOM
    document.body.appendChild(app.view);

// load the texture we need
    app.loader
        .add('map', 'src/img/map.png')
        .add('blackPlayer', 'src/img/4-black.png')
        .add('whitePlayer', 'src/img/4-white.png')
        .load(setup);

    function setup(loader, resources) {
        // This creates a texture from a 'bunny.png' image
        const map = new PIXI.Sprite(resources.map.texture);
        let rectangle = new PIXI.Rectangle(0, 0, 4, 4);
        resources.blackPlayer.texture.frame = rectangle
        resources.whitePlayer.texture.frame = rectangle
        const blackPlayer = new PIXI.Sprite(resources.blackPlayer.texture);
        const whitePlayer = new PIXI.Sprite(resources.whitePlayer.texture);

        // map原始大小
        const mapWidth = map.width;
        // 棋子原始大小
        const blackPlayerSize = blackPlayer.width;

        map.position.set(app.screen.width / 2, app.screen.height / 2);
        // map.anchor.set(0.5);
        map.scale.set(20);
        map.x -= map.width / 2;
        map.y -= map.height / 2;

        blackPlayer.scale.set(20);
        console.log(blackPlayer);
        blackPlayer.position.set(map.x, map.y);
        // blackPlayer.anchor.set(0.5);


        whitePlayer.scale.set(20);
        whitePlayer.position.set(map.x, map.y + map.height - whitePlayer.width/2);
        // whitePlayer.anchor.set(0.5);



        // Add the map to the scene we are building
        app.stage.addChild(map, blackPlayer, whitePlayer);

        // Listen for frame updates
        app.ticker.add(() => {
            // each frame we spin the bunny around a bit
            // bunny.x += 1;
            // map.rotation += 0.01;
        });
    };
}