extern crate rawr;
extern crate regex;
extern crate serde;
extern crate toml;

#[macro_use]
extern crate serde_derive;
#[macro_use]
extern crate structopt;
#[macro_use]
extern crate lazy_static;

mod config;
mod music_thread;

use config::Config;
use rawr::prelude::*;
use rawr::structures::*;
use regex::Regex;
use std::fs::File;
use std::io::prelude::*;
use structopt::StructOpt;

static CONFIG_FILE: &str = "Config.toml";
static USER: &str = "tehpolecat";

#[derive(StructOpt, Debug)]
#[structopt(name = "reddit_scraper")]
struct Opt {
    /// ThreadNumber, defaults to latest
    #[structopt(short = "t", long = "thread")]
    thread_num: Option<i32>,
}

fn main() {
    let config = load_config();
    let args = Opt::from_args();
    let target_thread_num = args.thread_num.unwrap_or(0);
    let client = RedditClient::new(&config.reddit_user_agent, AnonymousAuthenticator::new());
    let user = client.user(USER);
    let submissions = user.submissions().expect("error getting user submissions");

    let re = Regex::new(r"(?mi)The (.*)weekly Music Sharing Thread\s?\#?(?P<number>\d*)").unwrap();

    let mut target = 0;
    let mut target_thread: Option<submission::Submission<'_>> = None;
    let mut next = 0;
    let mut next_thread: Option<submission::Submission<'_>> = None;
    for submission in submissions {
        let title = String::from(submission.title());
        match re.captures(&title) {
            None => {
                continue;
            }
            Some(captures) => {
                let num_match = captures.name("number");
                let thread_num = num_match
                    .and_then(|c| c.as_str().parse::<i32>().ok())
                    .unwrap_or(1);

                if target_thread_num == 0 {
                    if thread_num > next {
                        next = thread_num;
                        target_thread = next_thread;
                        target = next - 1;
                        next_thread = Some(submission);
                    } else if thread_num == target {
                        target_thread = Some(submission);
                    }
                } else if target_thread_num == thread_num {
                    target = thread_num;
                    target_thread = Some(submission);
                } else if target_thread_num + 1 == thread_num {
                    next_thread = Some(submission);
                }
            }
        }
    }

    let target_thread = target_thread.expect("No Thread Was Found");
    let next_thread = next_thread.expect("No Next Thread was Found");

    let next_thread_body = next_thread.body().expect("Error getting next thread body");
    let spotify_url = get_spotify(&next_thread_body).expect("Error extracting spotify URL");

    let mu_thread = music_thread::Thread {
        number: target,
        score: target_thread.score(),
        spotify_url,
        created: target_thread.created_utc(),
    };
    println!("{:?}", mu_thread);
    let body = target_thread.body().expect("Error getting thread body");
    // println!("{}", body);

    let post_tracks = get_tracks(&body);
    let post_submission = music_thread::Submission {
        user: target_thread.author().name,
        created: target_thread.created_utc(),
        score: 0,
        submission_string: None,
        tracks: post_tracks,
    };

    let mut submissions = vec![post_submission];
    let comment_list = target_thread.replies().expect("error getting comments");
    let subs = get_submissions_from_comments(comment_list);
}

fn load_config() -> Config {
    let mut f = File::open(CONFIG_FILE).expect("config file not found");
    let mut contents = String::new();
    f.read_to_string(&mut contents)
        .expect("error reading the config file");

    toml::from_str(&mut contents).expect("error deserializing config")
}

fn get_spotify(body: &str) -> Option<&str> {
    lazy_static! {
        static ref SPOTIFY_REGEX: Regex =
            Regex::new(r"(?mi)Spotify playlist:\s?\n?\[\#\d*\]\s?\n?\((?P<url>.+)\)").unwrap();
    }
    SPOTIFY_REGEX
        .captures(body)
        .and_then(|c| c.name("url"))
        .and_then(|u| Some(u.as_str()))
}

fn get_tracks(body: &str) -> Vec<music_thread::Track> {
    lazy_static! {
        static ref SUBMISSION_REGEX: Regex =
            Regex::new(r"(?mi)\[\[(?P<genre>.+)\](?P<artist>.+)-(?P<track>.+)\]\((?P<url>.+)\)")
                .unwrap();
    }
    let mut tracks = Vec::new();
    for cap in SUBMISSION_REGEX.captures_iter(body) {
        let genre = cap
            .name("genre")
            .and_then(|m| Some(m.as_str().trim().to_string()));
        if genre == Some("Genre".to_string()) {
            continue;
        }
        let artist = cap
            .name("artist")
            .and_then(|m| Some(m.as_str().trim().to_string()));
        let track = cap
            .name("track")
            .and_then(|m| Some(m.as_str().trim().to_string()));
        let url = cap
            .name("url")
            .and_then(|m| Some(m.as_str().trim().to_string()));

        println!("{:?} | {:?} | {:?} | {:?}", &genre, &artist, &track, &url);
        tracks.push(music_thread::Track {
            genre,
            artist,
            track,
            url,
        });
    }
    tracks
}

fn get_submissions_from_comments(
    comments: comment_list::CommentList<'_>,
) -> Vec<music_thread::Submission> {
    let mut submissions = Vec::new();
    for comment in comments {
        // get_track_from_submission(comment);
        let tracks = get_tracks(&comment.body().expect("error getting comment body"));
        let submission = music_thread::Submission {
            score: comment.score(),
            created: comment.created_utc(),
            user: comment.author().name,
            submission_string: comment.body(),
            tracks,
        };
        // println!("{:?}", submission);
        submissions.push(submission);
    }
    submissions
}
