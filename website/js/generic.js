/* global Handlebars, getRelativeUrl*/

function listSubmissions(containerSelector, subs) {
    const sortedSubmissions = subs.sort((a, b) => a.threadNum < b.threadNum);

    for (const sub of subs) {
        sub.threadUrl = getRelativeUrl('threads.html?thread=' + encodeURIComponent(sub.threadNum));
        sub.genreUrl = getRelativeUrl('genres.html?genre=' + encodeURIComponent(sub.genreId));
        sub.artistUrl = getRelativeUrl('artists.html?artist=' + encodeURIComponent(sub.artistId));
        sub.userUrl = getRelativeUrl('users.html?user=' + encodeURIComponent(sub.userId));
    }

    const container = $(containerSelector);
    const source = '<li class="list-group-item list-group-item-action"><a href="{{threadUrl}}"><span class="badge badge-secondary thread-badge">Thread {{threadNum}}</span></a><a href="{{genreUrl}}">[{{genre}}]</a> <a href="{{artistUrl}}">{{artist}} </a>-<a href="{{trackUrl}}"> {{song}}</a> submitted by<a href="{{userUrl}}"><span class="badge badge-info user-badge">/u/{{user}}</span></a></li>';
    const template = Handlebars.compile(source);
    for (const submission of sortedSubmissions) {
        const html = template(submission);
        container.append(html);
    }
}
