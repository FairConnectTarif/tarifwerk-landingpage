(function(){
  const hero = document.getElementById('hero');
  const videoWrap = document.getElementById('videoWrap');
  const video = document.getElementById('introVideo');
  const playBtn = document.getElementById('playBtn');

  // iOS/Instagram-safe: Start nur per Nutzer-Geste, dann zurück zum Hauptbild
  async function startVideo(){
    try{
      // Prüfen, ob Video-Datei existiert. Wenn 404, Knopf ausblenden.
      let headOk = true;
      try{
        const resp = await fetch('intro.mp4', { method: 'HEAD' });
        headOk = resp.ok;
      }catch(e){ headOk = true; } // Fallback: versuchen trotzdem zu spielen

      if(!headOk){
        playBtn.textContent = 'Video fehlt: intro.mp4';
        playBtn.disabled = true;
        return;
      }

      hero.hidden = true;
      videoWrap.hidden = false;

      // Autoplay nach Tap
      const p = video.play();
      if(p && typeof p.then === 'function'){
        await p;
      }
    }catch(e){
      // Falls blockiert, Knopf-Text anpassen
      playBtn.textContent = 'Tippen, um Video zu starten 🔊';
      hero.hidden = false;
      videoWrap.hidden = true;
    }
  }

  playBtn?.addEventListener('click', startVideo);

  // Nach Ende zurück zum Hauptbild
  video?.addEventListener('ended', function(){
    video.pause();
    video.currentTime = 0;
    videoWrap.hidden = true;
    hero.hidden = false;
    // Scroll zurück zum Anfang
    window.scrollTo({top:0, behavior:'smooth'});
  }, { passive: true });
})();