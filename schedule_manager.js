const { printDivider } = require('./utils');


function schedule(videos, availabilityList) {
    console.log('-- Scheduling videos...');

    const longestAvailability = availabilityList.reduce((a, b) => Math.max(a, b), 0);
    console.log(`-- Longest Availability: ${longestAvailability}`,);

    let result = [];
    let currentVideo = 0;

    for (let i = 0; i < availabilityList.length; i++) {
        let availability = availabilityList[i];
        printDivider();
        console.log(`-- Processing Day ${i + 1}`);
        console.log(`-- Current Availability: ${availability}`);

        let scheduledVideos = [];
        let scheduledTime = 0;

        while (scheduledTime < availability && currentVideo < videos.length) {
            let video = videos[currentVideo];
            console.log(`-- Video (id: ${video.id}, duration: ${video.duration})`);

            if (video.duration > longestAvailability) {
                console.warn(`-- Duration: ${video.duration} > Availability: ${longestAvailability}`);
                console.warn('-- Video too long, skipping...');
                currentVideo++;
                continue;
            }

            if (video.duration > availability - scheduledTime) {
                console.warn(`-- Duration: ${video.duration} > Current availability: ${availability - scheduledTime}`);
                console.warn('-- No availability for this video, skipping day...');
                break;
            } else {
                console.log(`-- Scheduling video with duration ${video.duration}...`);
                scheduledVideos.push(video);
                scheduledTime += video.duration;
            }

            currentVideo++;
        }

        result[i] = result[i] || [];
        result[i].push(...scheduledVideos);
        console.log(`-- Scheduled videos: ${scheduledVideos.length}`);
        console.log(`-- Scheduled time: ${scheduledTime}`);
    }

    return result;
}

exports.schedule = schedule;