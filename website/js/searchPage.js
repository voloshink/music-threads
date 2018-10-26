/* global Handlebars, getRelativeUrl*/

const submissionsJ = [{ artist: 'Old Chum', id: 1, song: 'test', songUrl: 'https://youtube.com', }, { artist: 'ヨルシカ', id: 2, song: 'test', songUrl: 'https://youtube.com', }, { artist: 'meganeko', id: 3, song: 'test', songUrl: 'https://youtube.com', }, { artist: 'Papadosio', id: 4, song: 'test', songUrl: 'https://youtube.com', }, { artist: 'Vasudeva', id: 5, song: 'test', songUrl: 'https://youtube.com', }];
const usersJ = [{ name: 'tehpolecat', id: 1, }, { name: 'Boondock9099', id: 2, }, { name: 'Wafthrudnir', id: 3, }, { name: 'nablachez', id: 4, }, { name: 'Peckhead', id: 5, }];
const genresJ = [{ name: 'rock', id: 1, }, { name: 'post-rock', id: 2, }, { name: 'noise punk', id: 3, }, { name: 'indie rock', id: 4, }, { name: 'pop punk', id: 5, }];

const jsonData = { submissions: submissionsJ, users: usersJ, genres: genresJ, };

/**
 * Get the URL parameters
 * source: https://css-tricks.com/snippets/javascript/get-url-variables/
 * @param  {String} url The URL
 * @return {Object}     The URL parameters
 */
function getParams(url) {
    const params = {};
    const parser = document.createElement('a');
    parser.href = url;
    const query = parser.search.substring(1);
    const vars = query.split('&');
    for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split('=');
        params[pair[0]] = decodeURIComponent(pair[1]);
    }
    return params;
}

$(() => {
    const params = getParams(window.location.href);
    const query = params.q;
    if (!query) {
        window.location.href = '../index.html';
    }

    const data = [];
    data.push(...jsonData.submissions.map(x => {
        x.type = 'submission';
        return x;
    }));

    data.push(...jsonData.users.map(x => {
        x.type = 'user';
        return x;
    }));

    data.push(...jsonData.genres.map(x => {
        x.type = 'genre';
        return x;
    }));

    const results = [];

    const wordMatches = [];
    const anyMatches = [];

    for (const el of data) {
        if (el.name) {
            if (el.name.toLowerCase().trim().split(' ').indexOf(query.toLowerCase()) > -1) {
                wordMatches.push(el);
            } else if (el.name.toLowerCase().trim().indexOf(query.toLowerCase()) > -1) {
                anyMatches.push(el);
            }
        }

        if (el.artist && el.song) {
            if ((el.artist + ' ' + el.song).toLocaleLowerCase().trim().split(' ').indexOf(query.toLocaleLowerCase()) > -1) {
                wordMatches.push(el);
            } else if ((el.artist + ' ' + el.song).toLocaleLowerCase().trim().indexOf(query.toLocaleLowerCase()) > -1) {
                anyMatches.push(el);
            }
        }
    }

    results.push(...wordMatches);
    results.push(...anyMatches);

    for (const result of results) {
        if (result.type === 'user') {
            result.url = getRelativeUrl('users.html?user=' + encodeURIComponent(result.id));
        }

        if (result.type === 'genre') {
            result.url = getRelativeUrl('genres.html?genre=' + encodeURIComponent(result.id));
        }

        if (result.type === 'submission') {
            result.url = getRelativeUrl('artists.html?artist=' + encodeURIComponent(result.id));
        }
    }

    const container = $('#search-list');
    const normalHTML = '<li class="list-group-item list-group-item-action"><a href="{{url}}">{{type}}: {{name}}</a></li>';
    const submissionHTML = '<li class="list-group-item list-group-item-action"><a href="{{url}}">{{artist}}</a> - <a href="{{songUrl}}">{{song}}</a></li>';
    const normalTemplate = Handlebars.compile(normalHTML);
    const submissionTemplate = Handlebars.compile(submissionHTML);
    for (const result of results) {
        let html;
        if (result.type !== 'submission') {
            html = normalTemplate(result);
        } else {
            html = submissionTemplate(result);
        }
        container.append(html);
    }

    if (results.length === 0) {
        container.append('<li class="list-group-item list-group-item-action">No Result Found</li>');
    }
});
