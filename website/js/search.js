const artists = [{ name: 'Old Chum', id: 1, }, { name: 'ヨルシカ', id: 2, }, { name: 'meganeko', id: 3, }, { name: 'Papadosio', id: 4, }, { name: 'Vasudeva', id: 5, }];
const users = [{ name: 'tehpolecat', id: 1, }, { name: 'Boondock9099', id: 2, }, { name: 'Wafthrudnir', id: 3, }, { name: 'nablachez', id: 4, }, { name: 'Peckhead', id: 5, }];
const genres = [{ name: 'rock', id: 1, }, { name: 'post-rock', id: 2, }, { name: 'noise punk', id: 3, }, { name: 'indie rock', id: 4, }, { name: 'pop punk', id: 5, }];

const json = { artists: artists, users: users, genres: genres, };

function selected(item) {
    let redirectUrl = '';
    if (item.type === 'genre') {
        redirectUrl = 'genres.html?genre=' + item.id;
    }

    if (window.location.origin === 'file://') {
        if (window.location.href.indexOf('index.html') > -1) {
            const pathArr = window.location.href.split('/');
            pathArr.splice(-1, 1);
            pathArr.push('pages');
            pathArr.push(redirectUrl);
            redirectUrl = pathArr.join('/');
        } else {
            const pathArr = window.location.href.split('/');
            pathArr.splice(-1, 1);
            pathArr.push(redirectUrl);
            redirectUrl = pathArr.join('/');
        }
    }

    window.location.href = redirectUrl;
}

function displayText(item) {
    return item.type + ': ' + item.name;
}

$(() => {
    const data = [];
    data.push(...json.artists.map(x => {
        x.type = 'artist';
        return x;
    }));

    data.push(...json.users.map(x => {
        x.type = 'user';
        return x;
    }));

    data.push(...json.genres.map(x => {
        x.type = 'genre';
        return x;
    }));

    $('#search').typeahead({ source: data, minLength: 3, afterSelect: selected, displayText: displayText, changeInputOnMove: false, changeInputOnSelect: false, autoSelect: false, });
});