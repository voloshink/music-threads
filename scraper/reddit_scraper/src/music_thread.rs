#[derive(Debug)]
pub struct Thread<'a> {
    pub number: i32,
    pub score: i64,
    pub spotify_url: &'a str,
}

pub struct Submission<'a> {
    pub tracks: Vec<&'a Submission<'a>>,
    pub user: &'a str,
    pub score: i64,
}

pub struct Track<'a> {
    pub genre: Option<&'a str>,
    pub artist: Option<&'a str>,
    pub track: Option<&'a str>,
    pub url: Option<&'a str>,
}
