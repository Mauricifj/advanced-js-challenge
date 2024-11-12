# Advanced Javascript Challenge

This project is part of a postgraduate course, designed to deepen JavaScript knowledge and demonstrate expertise in advanced concepts.

## Learning Objectives of Phase 1 (JavaScript Advanced Module)

- Develop proficiency in advanced JavaScript features and patterns.
- Build problem-solving skills through hands-on practice.
- Prepare for real-world JavaScript scenarios and technical interviews.
- Promises and Async/Await
- Functional Programming and Closures
- Prototypes, Inheritance, and ES6+ Modules
- Decorators
- Proxy, Reflection, and Memory Management
- Introduction to WebAssembly

## Setup

To run this project locally, ensure you have Node.js installed, then follow these steps:

Clone the repository:

```bash
git clone https://github.com/mauricifj/advanced-js-challenge.git
cd advanced-js-challenge
```

Install dependencies:

```bash
npm install
```

## Environment Variables

For this project, we will need credentials to access YouTube API.

You can generate one in [Google Cloud Platform](https://console.cloud.google.com/apis/credentials).

> Don't forget to select the right project and enable the YouTube API.

## Usage

You will be able to provide a search term and the availability list.

```bash
node index.js -s "search term" -a 50 40 30 40 150
```

### Options

- Search option (-s)

It's the first option and has to be wrapped in quotation marks.
The search terms can also use the Boolean NOT (-) and OR (|) operators to exclude videos or to find videos that are associated with one of several search terms.
For example, to search for videos matching either "boating" or "sailing", set the q parameter value to boating|sailing.
Similarly, to search for videos matching either "boating" or "sailing" but not "fishing", set the q parameter value to boating|sailing -fishing.

- Availability option (-a)

It's the second option and has to be a list of integers that describes the daily availability in minutes.
