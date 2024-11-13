const availabilityOption = '-a';
const searchOption = '-s';

export const defaultIgnoredTerms = ['', 'a', 'an', 'the', 'this', 'that', 'is', 'are', 'was', 'were', 'be', 'been', 'for', 'of', 'to', 'in', 'on', 'with', 'by', 'and', 'but', 'or', 'nor', 'yet', 'so', 'at', 'from', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'up', 'down', 'out', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 'can', 'will', 'just', 'don', 'should', 'now'];

export function getSearchTerms() {
    console.log('-- Processing search terms...');
    const searchOptionIndex = process.argv.indexOf(searchOption);
    return process.argv[searchOptionIndex + 1];
}

export function getAvailability() {
    console.log('-- Processing Availability...');

    const availabilityOptionIndex = process.argv.indexOf(availabilityOption);
    const availability = process.argv.slice(availabilityOptionIndex + 1);
    return availability.map(value => parseInt(value));
}
