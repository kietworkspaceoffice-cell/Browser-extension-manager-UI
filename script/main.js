fetch('./data/data.json')
.then(res => res.json())
.then(data =>{
    const container = document.querySelector('.ext-cards');
    const allBtn = document.getElementById('btn-all');
    const activeBtn = document.getElementById('btn-active');
    const inactiveBtn = document.getElementById('btn-inactive');


    function renderList(list) {
      container.innerHTML = '';
      list.forEach((ext, index) => {
        const item = document.createElement('li');
        item.className = 'ext-cart';
        item.innerHTML = `<header class="ext-header">
            <img class="ext-logo" src="${ext.logo}" alt="${ext.name}">
            <div class="ext-inf">
              <h2 class="ext-name">${ext.name}</h2>
              <p class="ext-disc">${ext.description}</p>
            </div>
          </header>
          <footer class="ext-footer">
            <button class="ext-remove">Remove</button>
            <label class="switch">
              <input type="checkbox" ${ext.isActive?'checked':''}>
              <span class="slider round"></span>
            </label>
          </footer>`;

          container.appendChild(item);

        //   Gắn biến sự kiện
        const removeExt = item.querySelector('.ext-remove');
        const changeActive = item.querySelector('input[type="checkbox"]');

        // Sự kiện remove
        removeExt.addEventListener('click', () => {
            item.remove();
            
            const extIndex = data.indexOf(ext);
            if (extIndex > -1) {
                data.splice(extIndex,1);
            };
            renderList(data);
        })

        // Sự kiện change active
        changeActive.addEventListener('change', () => {
            ext.isActive = changeActive.checked;
        })
      })
    }
    
    // render lại toàn bộ
    renderList(data);

    // các nút filter

    allBtn.addEventListener('click', () => renderList(data));
    activeBtn.addEventListener('click', () => {
      const filtered = data.filter(ext => ext.isActive);
      renderList(filtered);
    });
    inactiveBtn.addEventListener('click', () => {
      const filtered = data.filter(ext => !ext.isActive);
      renderList(filtered);
    })
  })
.catch(error => console.error('Lỗi khi đọc JSON:', error));


const filterBtn = document.querySelectorAll('.filter-btn');
filterBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    // remove tất cả active button khác
    filterBtn.forEach(b => b.classList.remove('active'));
    // thêm active cho button hiện tại
    btn.classList.add('active');
  });
});

// change theme
const themeToggle = document.querySelector('.themes-toggle');
const themeIcon = document.getElementById('theme-icon');
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');

const textLogo = document.querySelector('.text-logo');
const mainHeader = document.querySelector('.main-header');

const bodyMain = document.querySelector('body');


themeToggle.addEventListener('click', () => {
  const extCart = document.querySelectorAll('.ext-cart');
  const extRemove = document.querySelectorAll('.ext-remove');

  sunIcon.classList.toggle('isActive');
  moonIcon.classList.toggle('isActive');
  
  // theme change
  bodyMain.classList.toggle('day-body');
  themeToggle.classList.toggle('day-theme');
  textLogo.classList.toggle('day-time');
  mainHeader.classList.toggle('day-fill');
  extCart.forEach(eC => eC.classList.toggle('day-fill'));
  extRemove.forEach(eR => eR.classList.toggle('day-fill'));
});