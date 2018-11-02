#[derive(Debug)]
pub struct Thread<'a> {
    pub number: i32,
    pub score: i64,
    pub spotify_url: &'a str,
}
