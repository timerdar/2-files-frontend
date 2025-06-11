export default function Menu() {

    setTimeout(() => {
    document.getElementById('upload').addEventListener('click', () => {
      location.hash = '/upload-file'
    });

    document.getElementById('stat').addEventListener('click', () => {
      location.hash = '/stat'
    })
  }, 0);


    return `
    <h1>Главная страница</h1>
    <div class="menu-div">
        <button id="upload" class="menu-button">Загрузить</button>
        <button id="stat" class="menu-button">Статистика</button>
    </div>    `
};