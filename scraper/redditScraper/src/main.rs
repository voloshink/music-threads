extern crate rawr;
extern crate serde;
extern crate toml;

#[macro_use]
extern crate serde_derive;

mod config;

use config::Config;
use rawr::prelude::*;
use std::fs::File;
use std::io::prelude::*;

static CONFIG_FILE: &str = "Config.toml";
static USER: &str = "tehpolecat";

fn main() {
    println!("Hello, world!");
    let config = load_config();
    let client = RedditClient::new(&config.reddit_user_agent, AnonymousAuthenticator::new());
    let user = client.user(USER);
    let submissions = user.submissions().expect("error getting user submissions");
    let mut i = 0;
    for submission in submissions {
        i += 1;
        println!("{}", submission.title());
    }

    println!("{}", i);
}

fn load_config() -> Config {
    let mut f = File::open(CONFIG_FILE).expect("config file not found");
    let mut contents = String::new();
    f.read_to_string(&mut contents)
        .expect("error reading the config file");

    toml::from_str(&mut contents).expect("error deserializing config")
}
