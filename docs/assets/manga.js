(() => {
  const links = [...document.querySelectorAll('.chapter-index a')];
  const sections = links.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  function mark(id) {
    links.forEach(link => {
      if (link.getAttribute('href') === `#${id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
  let pending = false;
  function update() {
    let active = sections[0];
    for (const section of sections) if (section.getBoundingClientRect().top < innerHeight * .42) active = section;
    if (active) mark(active.id);
    pending = false;
  }
  addEventListener('scroll', () => { if (!pending) { pending = true; requestAnimationFrame(update); } }, {passive:true});
  addEventListener('resize', update, {passive:true});
  update();
})();
