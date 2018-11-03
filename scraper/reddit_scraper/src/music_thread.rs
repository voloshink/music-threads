#[derive(Debug)]
pub struct Thread<'a> {
    pub number: i32,
    pub score: i64,
    pub spotify_url: &'a str,
}

pub struct Submission<'a> {
    pub genre: &'a str,
    pub artist: &'a str,
    pub track: &'a str,
    pub url: &'a str,
}
