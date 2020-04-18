// //stops page from refreshing/default actions
// $(document).ready(function () {

//     //function to pull information from BandsInTown 
//     function searchBands(artist) {
//         var queryURL = 'https://rest.bandsintown.com/artists/' + artist + '?app_id=codingbootcamp'

//         //ajax call to API
//         $.ajax({
//             url: queryURL,
//             method: 'GET'
//         }).then(function (response) {
//             var artistName = $('<h1>').text(response.name)
//             var artistImage = $('<img>').attr('src', response.thumb_url)
//             var fanNumber = $('<h2>').text("Number of Fans: " + response.tracker_count)
//             console.log(response)
//             $('#mainInfo').empty()
//             $('#mainInfo').append(artistName, artistImage, fanNumber)
//         })
//     }



//     //button clicking function
//     $('#select-artist').on('click', function (event) {
//         //preventing the information from disappearing after button is clicked
//         event.preventDefault()
//         var inputArtist = $('#artist-input').val().trim();

//         //replace function parameter with new variable
//         searchBands(inputArtist);


//         //Create UL item, set text of searched city, append to left side bar

//     })
// }); 