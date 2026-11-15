window.initGallery = () => {
  const data = window.galleryConfig; let i = 0;
  const img = document.getElementById('memoryPhoto'), placeholder = document.getElementById('photoPlaceholder'), caption = document.getElementById('photoCaption');
  const render = () => { const item = data[i]; caption.textContent = item.caption; img.src = item.src; img.alt = item.caption; img.classList.remove('hidden'); placeholder.classList.add('hidden'); document.getElementById('galleryCount').textContent = `0${i+1} / 0${data.length}`; };
  img.onerror = () => { img.classList.add('hidden'); placeholder.classList.remove('hidden'); };
  document.getElementById('prevPhoto').onclick = () => { i = (i-1+data.length)%data.length; render(); };
  document.getElementById('nextPhoto').onclick = () => { i = (i+1)%data.length; render(); };
  img.onclick = () => { const item = data[i], modal = document.getElementById('modal'); modal.innerHTML = `<button class="btn primary" id="closeModal">Band Karo ✕</button><img src="${itemSafe(item.src)}" alt="${itemSafe(item.caption)}"><p class="caption">${itemSafe(item.caption)}</p>`; modal.classList.remove('hidden'); document.getElementById('closeModal').onclick = () => modal.classList.add('hidden'); };
  render();
};
function itemSafe(s) { return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
