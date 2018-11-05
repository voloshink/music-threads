#[derive(Debug)]
pub struct Thread<'a> {
    pub number: i32,
    pub score: i64,
    pub spotify_url: &'a str,
    pub created: i64,
}

#[derive(Debug)]
pub struct Submission {
    pub tracks: Vec<Track>,
    pub user: String,
    pub score: i64,
    pub submission_string: Option<String>,
    pub created: i64,
}

#[derive(Debug)]
pub struct Track {
    pub genre: Option<String>,
    pub artist: Option<String>,
    pub track: Option<String>,
    pub url: Option<String>,
}
