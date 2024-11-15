import { search, processTrendingTerms } from './youtube_service.js';
import { defaultIgnoredTerms, getSearchTerms, getAvailability } from './command_parser.js';
import { schedule } from './schedule_manager.js';
import { printDivider } from './utils.js';

async function main() {
    printDivider();
    console.log('STARTED YOUTUBE PLANNER');
    printDivider();

    const searchTerm = getSearchTerms();
    console.info(`SEARCH TERMS: ${searchTerm}`);
    printDivider();

    const availability = getAvailability();
    console.info('AVAILABILITY');
    console.table(
        availability.map((a, index) => {
            return {
                day: index + 1,
                availability: a,
            }
        })
    );
    printDivider();

    const videos = await search(searchTerm);
    console.info('FOUND VIDEOS');
    console.table(
        videos.map((video, index) => {
            return {
                id: video.id,
                duration: video.duration,
                title: video.title,
            }
        })
    );
    printDivider();

    const trendingTerms = processTrendingTerms(videos, defaultIgnoredTerms);
    console.info('TRENDING TERMS');
    console.table(trendingTerms);
    printDivider();

    const result = schedule(videos, availability);
    console.info('SCHEDULED VIDEOS');
    console.table(
        result.map((videos, index) => {
            return {
                day: index + 1,
                availability: availability[index],
                videos: videos.map(video => video.duration),
                dayTotal: videos.reduce((a, b) => a + b.duration, 0)
            }
        })
    );
}

main();