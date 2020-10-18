let posts = [];

$(function () {
    $(document).on('click', 'button[name="like"]', function() {
        console.log('Click on like button event called');
        if($(this).hasClass('liked')) {
            $(this).removeClass('liked');
        } else {
            $(this).addClass('liked');
        }
    });

    loadPosts()
        .then(function (response) {
            console.log(response);
            $('.main-container').empty()
            for (let post of response) {
                let postBody = $('<div class="post">');
                
                let postAuthor = $('<div class="post-author">');

                let postAuthorInfo = $('<span class="post-author-info">');

                let postAuthorImg = $('<img>');
                postAuthorImg.attr('src', post.author.avatar);
                postAuthorInfo.append(postAuthorImg);

                let postAuthorName = $('<small>').text(post.author.firstname + " " + post.author.lastname);
                postAuthorInfo.append(postAuthorName);

                postAuthor.append(postAuthorInfo);

                let postAuthorDate = $('<small>').text(post.createTime);
                postAuthor.append(postAuthorDate);
                
                postBody.append(postAuthor);

                if (post.media != null && post.media.type == "image") {
                    let postMedia = $('<div class="post-image">');
                    let postMediaImg = $('<img>');
                    postMediaImg.attr('src', post.media.url);
                    postMedia.append(postMediaImg);
                    postBody.append(postMedia);
                }

                if (post.media != null && post.media.type == "video") {
                    let postMedia = $('<div class="post-video">');
                    let postMediaVideo = $('<video width="100%" height="100%" controls>');
                    let postMediaVideoSource = $('<source>');
                    postMediaVideoSource.attr('src', post.media.url);
                    postMediaVideoSource.attr('type', 'video/mp4');
                    postMediaVideo.append(postMediaVideoSource);
                    postMedia.append(postMediaVideo);
                    postBody.append(postMedia);
                }

                if (post.text != null) {
                    let postTitle = $('<div class="post-title">');
                    let postTitleHeading = $('<h3>').text(post.text);
                    postTitle.append(postTitleHeading);
                    postBody.append(postTitle);
                }
                
                let postActions = $('<div class="post-actions">');
                let postActionsButton = $('<button type="button" name="like" class="like-button">').text(post.likes);
                postActions.append(postActionsButton);
                postBody.append(postActions);

                $('.main-container').append(postBody);
            }
        })
        .catch(function() {
            alert('Error loading posts')
        });
});

function loadPosts() {
    return $.get({
        url: 'https://private-anon-e3781a95df-wad20postit.apiary-mock.com/posts',
        success: function (response) {
            return response;
        },
        error: function () {
            alert('error');
        }
    });
}