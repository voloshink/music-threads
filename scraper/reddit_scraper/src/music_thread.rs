#[derive(Debug)]
pub struct Thread<'a> {
    pub number: i32,
    pub score: i64,
    pub spotify_url: &'a str,
    pub created: i64,
}

pub struct Submission<'a> {
    pub tracks: Vec<Track<'a>>,
    pub user: &'a str,
    pub score: i64,
    pub submission_string: Option<&'a str>,
    pub created: i64,
}

pub struct Track<'a> {
    pub genre: Option<&'a str>,
    pub artist: Option<&'a str>,
    pub track: Option<&'a str>,
    pub url: Option<&'a str>,
}
