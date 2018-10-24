/* global Handlebars, getRelativeUrl*/

function listSubmissions(containerSelector, subs) {
    const sortedSubmissions = subs.sort((a, b) => a.threadNum < b.threadNum);

    for (const sub of subs) {
        sub.threadUrl = getRelativeUrl('threads.html?thread=' + encodeURIComponent(sub.threadNum));
    }

    const container = $(containerSelector);
    const source = '<li class="list-group-item list-group-item-action"><a href="{{threadUrl}}"><span class="badge badge-secondary">Thread {{threadNum}}</span></a><a href="{{genreUrl}}>[{{genre}}]</a><a href="{{artistUrl}}">{{artist}} </a><a href="{{trackUrl}}">- {{song}}</a> submitted by<a href="{{userUrl}}"><span class="badge badge-info">/u/{{user}}</span></a></li>';
    const template = Handlebars.compile(source);
    for (const submission of sortedSubmissions) {
        const html = template(submission);
        container.append(html);
    }
}
