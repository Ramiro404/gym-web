const { router } = require("./router/index.routes");

router(window.location.hash);
window.addEventListener('hashchange', ()=> {
    router(window.location.hash);
})