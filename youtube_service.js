const { google } = require('googleapis');

async function search(query, maxResults = 200) {
    console.log('-- Searching Youtube...');

    const maxYoutubeResults = 50;
    const numberOfSearches = maxResults <= maxYoutubeResults ? 1 : Math.ceil(maxResults / maxYoutubeResults);
    const maxResultsPerRequest = maxResults / numberOfSearches;

    const videoList = [];
    let nextPageToken;

    for (let i = 0; i < numberOfSearches; i++) {
        let partialResult = await searchYoutube(query, maxResultsPerRequest, nextPageToken);
        nextPageToken = partialResult.nextPageToken;
        videoList.push(...partialResult.items);
    }

    return videoList;
}

async function searchYoutube(query, maxResults = 50, pageToken = null) {
    const youtube = google.youtube({
        version: 'v3',
        auth: process.env.YOUTUBE_API_KEY
    });

    let result;
    const maxResultsPerRequest = 50;

    try {
        const searchResult = await Promise.resolve(
            youtube.search.list({
                part: 'id',
                q: query,
                type: 'video',
                pageToken: pageToken,
                maxResults: maxResults < maxResultsPerRequest ? maxResults : maxResultsPerRequest,
            })
        );

        const videoListResult = await Promise.resolve(
            youtube.videos.list({
                part: 'snippet,contentDetails',
                q: query,
                type: 'video',
                id: searchResult.data.items.map(item => item.id.videoId).join(','),
                maxResults: maxResults < maxResultsPerRequest ? maxResults : maxResultsPerRequest,
            })
        );

        result = {
            nextPageToken: searchResult.data.nextPageToken,
            items:
                videoListResult.data.items.map(item => {
                    return {
                        id: item.id,
                        duration: parseDuration(item.contentDetails.duration),
                        title: item.snippet.title,
                        description: item.snippet.description,
                    }
                })
        };

    } catch (error) {
        console.error('Error fetching youtube data', error);
        return null;
    }

    return result;
}

function parseDuration(duration) {
    duration = duration.replace('PT', '');
    const match = duration.match(/(\d+H)?(\d+M)?(\d+S)?/);

    const hours = match[1] ? parseInt(match[1].replace('H', '')) : 0;
    const minutes = match[2] ? parseInt(match[2].replace('M', '')) : 0;
    const seconds = match[3] ? parseInt(match[3].replace('S', '')) : 0;
    return Math.ceil(hours * 60 + minutes + seconds / 60);
}

function processTrendingTerms(videos, ignoredTerms = defaultIgnoreList) {
    console.log('-- Processing Trending Terms...');

    const trendingTerms = {};
    videos.forEach(video => {
        const terms = [...video.title.split(' '), ...video.description.split(' ')];
        terms.forEach(term => {
            term = term.toLowerCase();

            if (term.match(/[^a-z0-9#]/)) {
                return;
            }

            if (ignoredTerms.includes(term)) {
                return;
            }

            trendingTerms[term] = trendingTerms[term] ? trendingTerms[term] + 1 : 1;
        });
    });

    return Object.keys(trendingTerms).map(term => {
        return {
            term: term,
            count: trendingTerms[term]
        }
    }).sort((a, b) => b.count - a.count).splice(0, 5);
}

exports.search = search;
exports.processTrendingTerms = processTrendingTerms;