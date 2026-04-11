import axios from "axios";
import * as cheerio from "cheerio";

export const fetchAppleMusicMetadata = async (url: string) => {
  try {
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    const $ = cheerio.load(data);

    const metaTitle = $('meta[property="og:title"]').attr("content") || "";
    const artist = metaTitle.split(" by ")[1] || "Unknown Artist";
    const albumTitle = metaTitle.split(" by ")[0] || "Unknown Album";
    
    let cover_url = $('meta[property="og:image"]').attr("content") || "";
    if (cover_url) {
        cover_url = cover_url.replace(/\/\d+x\d+/, "/600x600");
    }

    const tracks: any[] = [];
    $('.songs-list-row').each((index, element) => {
       const trackName = $(element).find('.songs-list-row__song-name').text().trim();
       const duration = $(element).find('.songs-list-row__length').text().trim();
       if (trackName) {
         tracks.push({ 
           position: index + 1, 
           title: trackName, 
           duration: duration || "0:00" 
         });
       }
    });

    return {
      title: albumTitle,
      artist: artist,
      cover_url,
      tracklist: tracks,
      year: $('meta[property="music:release_date"]').attr("content")?.split("-")[0] || new Date().getFullYear().toString(),
    };
  } catch (error) {
    console.error("Scraping Error:", error);
    throw new Error("Could not fetch metadata from Apple Music");
  }
};