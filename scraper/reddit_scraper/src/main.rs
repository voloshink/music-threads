extern crate rawr;
extern crate regex;
extern crate serde;
extern crate toml;

#[macro_use]
extern crate serde_derive;
#[macro_use]
extern crate structopt;

mod config;
mod music_thread;

use config::Config;
use rawr::prelude::*;
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
    let mut target_thread: Option<rawr::structures::submission::Submission<'_>> = None;
    let mut next = 0;
    let mut next_thread: Option<rawr::structures::submission::Submission<'_>> = None;
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
    };
    println!("{:?}", mu_thread);
    // let body = target_thread.body().expect("Error getting thread body");
    // println!("{}", body);
}

fn load_config() -> Config {
    let mut f = File::open(CONFIG_FILE).expect("config file not found");
    let mut contents = String::new();
    f.read_to_string(&mut contents)
        .expect("error reading the config file");

    toml::from_str(&mut contents).expect("error deserializing config")
}

// Ok to compile here since function will be called just once
fn get_spotify(body: &str) -> Option<&str> {
    let re = Regex::new(r"(?mi)Spotify playlist:\s?\n?\[\#\d*\]\s?\n?\((?P<url>.+)\)").unwrap();
    re.captures(body)
        .and_then(|c| c.name("url"))
        .and_then(|u| Some(u.as_str()))
}
