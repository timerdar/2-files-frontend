import Auth from "./pages/auth.js";
import Download from "./pages/downloadFile.js";
import Menu from "./pages/menu.js";
import SignUp from "./pages/signUp.js";
import Upload from "./pages/uploadFile.js";
import UserStat from "./pages/userFilesStat.js";

const routes = {
    '/': Auth,
    '/menu': Menu,
    '/upload-file': Upload,
    '/sign-up': SignUp,
    '/stat': UserStat
};

export function router() {
    const hash = location.hash.slice(1) || '/';
    var page;
    if (hash.startsWith('/download')){
        page = Download;
    }else {
        page = routes[hash] || (() => '<h1>404 - Страница не найдена</h1>');
    }

    document.getElementById('app').innerHTML = page();
}