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

fn main() {
    println!("Hello, world!");
    let config = load_config();
}

fn load_config() -> Config {
    let mut f = File::open(CONFIG_FILE).expect("config file not found");
    let mut contents = String::new();
    f.read_to_string(&mut contents)
        .expect("error reading the config file");

    toml::from_str(&mut contents).expect("error deserializing config")
}
