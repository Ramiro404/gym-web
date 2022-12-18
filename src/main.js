const { router } = require("./router/index.routes");
import './style.css';
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'
router(window.location.hash);
window.addEventListener('hashchange', ()=> {
    router(window.location.hash);
})