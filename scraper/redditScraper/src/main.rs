extern crate rawr;
extern crate serde;
extern crate toml;

#[macro_use]
extern crate serde_derive;

mod config;

use rawr::prelude::*;
use config::Config;

static CONFIG_FILE = "../Config.toml";

fn main() {
    println!("Hello, world!");
}

fn load_config() -> Config {
    let mut f = File::open(CONFIG_FILE).expect("config file not found");
    let mut contents = String::new();
    f.read_to_string(&mut contents).expect("error reading the config file");

    let config: Config = toml::decode_str(contents).expect("error deserializing config");
    config
}
