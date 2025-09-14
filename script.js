const API = "https://DariusVrn.pythonanywhere.com";

async function loadSongs() {
  let res = await fetch(`${API}/songs`);
  let songs = await res.json();
  let lib = document.getElementById("library");
  lib.innerHTML = "";
  songs.forEach(song => {
    let div = document.createElement("div");
    div.className = "song";
    div.innerHTML = `
      <img src="${song.thumbnail}">
      <p>${song.title}</p>
      <button onclick="playSong('${song.file}', \`${song.lyrics}\`)">Play</button>
    `;
    lib.appendChild(div);
  });
}

function playSong(file, lyrics) {
  document.getElementById("player").src = `${API}/songs/${file}`;
  document.getElementById("lyrics").textContent = lyrics;
}

document.getElementById("addForm").onsubmit = async e => {
  e.preventDefault();
  let url = document.getElementById("ytUrl").value;
  await fetch(`${API}/add_song`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url })
  });
  document.getElementById("ytUrl").value = "";
  loadSongs();
};

loadSongs();
