type songInfoType = {
  track_name: string,
  artist: string,
  album: string,
  url: string,
  is_listening: boolean,
};

const SPOTIFY_ENDPOINT = "https://p7ia9yj603.execute-api.us-east-1.amazonaws.com/default/spotifyAuth";
const SPOTIFY_CACHE_KEY = "spotify-listening-cache";

export default async function spotifyListening() {
  if (window.location.pathname !== "/") {
    return;
  }

  const appendTo = document.querySelector<HTMLElement>(".spotify-data");

  if (!appendTo) {
    return;
  }

  const cachedSong = readCachedSongInfo();

  if (cachedSong) {
    writeSongInfo(appendTo, cachedSong, true);
  } else {
    writePlaceholder(appendTo);
  }

  try {
    const response = await fetch(SPOTIFY_ENDPOINT);
    const data = await response.json() as songInfoType & { error?: string };

    if (data.error) {
      console.log("Error fetching Spotify info:", data.error);
      return;
    }

    writeSongInfo(appendTo, data, false);
    cacheSongInfo(data);
  } catch (_error) {
    if (!cachedSong) {
      writeFallback(appendTo);
    }
  }
}

function writeSongInfo(appendTo: HTMLElement, data: songInfoType, isPending: boolean) {
  const { track_name, album, artist, url, is_listening } = data;
  appendTo.classList.toggle("is-pending", isPending);
  appendTo.dataset.state = isPending ? "cached" : "live";

  appendTo.innerHTML = `
    <span>${is_listening ? "I'm currently listening to" : "I was just listening to"}:</span>
    <span class="about-spotify_inline"><a href="${url}" title="View ${track_name} on Spotify" rel="noreferrer" target="_blank">${track_name}</a></span> by 
    <span class="about-spotify_inline"><a href="${url}" title="View ${track_name} on Spotify" rel="noreferrer" target="_blank">${artist}</a></span> from the album 
    <span class="about-spotify_inline"><a href="${url}" title="View ${track_name} on Spotify" rel="noreferrer" target="_blank">${album}</a></span> on
    <span class="about-spotify_inline"><a href="https://open.spotify.com/user/nationalmuziq" rel="noreferrer" target="_blank">Spotify</a></span>.
  `;
}

function writePlaceholder(appendTo: HTMLElement) {
  appendTo.classList.add("is-pending");
  appendTo.dataset.state = "placeholder";
  appendTo.innerHTML = `
    <span>Checking what I've been listening to on</span>
    <span class="about-spotify_inline"><a href="https://open.spotify.com/user/nationalmuziq" rel="noreferrer" target="_blank">Spotify</a></span>
    <span>...</span>
  `;
}

function writeFallback(appendTo: HTMLElement) {
  appendTo.classList.remove("is-pending");
  appendTo.dataset.state = "fallback";
  appendTo.innerHTML = `
    <span>Spotify listening is taking a minute right now.</span>
    <span class="about-spotify_inline"><a href="https://open.spotify.com/user/nationalmuziq" rel="noreferrer" target="_blank">You can still open my profile directly.</a></span>
  `;
}

function readCachedSongInfo() {
  try {
    const cached = window.localStorage.getItem(SPOTIFY_CACHE_KEY);

    if (!cached) {
      return null;
    }

    const parsed = JSON.parse(cached) as Partial<songInfoType>;

    if (
      typeof parsed.track_name !== "string" ||
      typeof parsed.artist !== "string" ||
      typeof parsed.album !== "string" ||
      typeof parsed.url !== "string" ||
      typeof parsed.is_listening !== "boolean"
    ) {
      return null;
    }

    return parsed as songInfoType;
  } catch (_error) {
    return null;
  }
}

function cacheSongInfo(data: songInfoType) {
  try {
    window.localStorage.setItem(SPOTIFY_CACHE_KEY, JSON.stringify(data));
  } catch (_error) {
    // Ignore storage issues so the live Spotify data can still render.
  }
}
