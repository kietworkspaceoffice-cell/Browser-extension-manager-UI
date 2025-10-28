fetch('./data/data.json')
.then(res => res.json())
.then(data =>{
    const container = document.querySelector('.ext-cards');


    data.forEach((ext, index) => {
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
    })
})
.catch(error => console.error('Lỗi khi đọc JSON:', error));