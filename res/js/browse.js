 let profiles=[]
$(function () {
    $(document).on('click', 'button[name="follow"]', function () {
        console.log('Click on follow button event called');
        if ($(this).hasClass('followed')) {
            $(this).removeClass('followed');
            $(this).text("Follow")
        } else {
            $(this).addClass('followed').text("Followed");
        }
    });


    loadProfiles()
        .then(function (response){
        console.log(response)
            $('.profiles-container').empty()
            for (let profile of response) {
                let profileBody = $('<div class="profile">');

                let postAuthor = $('<div class="profile-author">');

                let postAuthorImg = $('<img alt="avatar">');
                postAuthorImg.attr('src', profile.avatar);
                postAuthor.append(postAuthorImg)


                let postAuthorName = $('<p>').text(profile.firstname + " " + profile.lastname);
                postAuthor.append(postAuthorName);



                let postActionsButton = $('<button type="button" name="follow" class="follow-button">').text("Follow");
                profileBody.append(postAuthor);
                profileBody.append(postActionsButton);

                $('.profiles-container').append(profileBody);
            }
        })
        .catch(function() {
            alert('Error loading profiles')
        });

});
function loadProfiles() {
    return $.get({
        url: 'https://private-anon-7f767dfdee-wad20postit.apiary-mock.com/profiles',
        success: function (response) {
            return response;
        },
        error: function () {
            alert('error');
        }
    });

}
