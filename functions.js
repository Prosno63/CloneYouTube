const videoLoader = async () => {

    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    const tabContainer = document.getElementById('tab-container');


    data.data.forEach((category) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <a onclick="handleLoadVideo('${category.category_id}')" class="tab tab-bordered bg-red-500 text-white font-semibold rounded hover:bg-red-300">${category.category}</a>
            `;
        tabContainer.appendChild(div);
    });



};


const handleLoadVideo = async (catagoryID) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${catagoryID}`);
    const data = await response.json();

    const sortButton = document.getElementById('sort-button');
    sortButton.addEventListener('click', () => {

        data.data.sort(function (a, b) {


            const viewsNumberOne = parseFloat(a.others.views);
            const viewsNumberTwo = parseFloat(b.others.views);

            if (viewsNumberTwo < viewsNumberOne) {
                return -1;
            }
        });


        renderVideoData(data.data);
    });

    renderVideoData(data.data);
};


const renderVideoData = (videos) => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    
    const messageContainer = document.getElementById('message-container');


    


    if (videos.length == 0) {

        const cardContainer = document.getElementById('card-container');
        cardContainer.innerHTML = '';


        const messageContainer = document.getElementById('message-container');
        messageContainer.innerHTML = '';

        messageContainer.classList.remove('hidden');

        const div = document.createElement("div");
        div.innerHTML = `
        
        <div class="flex items-center flex-col gap-y-2 mt-20" >

       

        <div><img  class="w-32 text-center" src="resources/Icon.png" alt="" srcset=""></div>
        <div><p class="text-3xl font-bold text-center"> No data Found </p></div> 

    
        </div>
        `;

        messageContainer.appendChild(div);


    }

    else {


        const cardContainer = document.getElementById('card-container');
        cardContainer.innerHTML = '';
        const messageContainer = document.getElementById('message-container');
        
        messageContainer.classList.add('hidden');

        videos.forEach((video) => {



            const div = document.createElement("div");




            div.innerHTML = `

            <div class="card h-full bg-base-100 shadow-xl">
            <div class="video-content">
                <a href="#" class="video-box">
                    <img src=${video?.thumbnail} class="w-full h-44 rounded-xl" alt="">
                </a>
                <div class="absolute -mt-8 ml-1 pl-64 text-white text-xs" > <span class="bg-black m-1 rounded"> ${video.others.posted_date ? Math.floor(video.others.posted_date / 60 / 24) + 'hr ' + (video.others.posted_date % 60) + 'min ago' : ''}</span>
                 
                </div>
                <div class="flex pt-3 items-start">
                    <div class="w-10 h-10  ml-2 overflow-hidden relative rounded-full mt-1">
                        <img src=${video.authors[0].profile_picture} alt="">
                    </div>
                    <div class="ml-3 ">
                        <h3 class="text-lg font-semibold">${video?.title}</h3>
                        <div class="flex gap-2 items-center" >
    
                            <div class="text-sm">${video.authors[0].profile_name}</div>
                            <div class="w-5">${video.authors[0].verified ? '<img src="resources/Twitter.png" alt="Verified">' : ''}
                            </div>
    
                        </div>
                       
                        
                        <div class="flex text-xs mb-2">
                            <div>${video.others.views}</div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
    
            `;


            cardContainer.appendChild(div);




        });

    }


};



videoLoader();
handleLoadVideo('1000');




const button = document.getElementById('blog-btn');

// Add a click event listener to the button
button.addEventListener('click', () => {
    // Replace the URL below with the URL of the page you want to navigate to
    const newPageURL = 'blog.html';

    // Use the window.location.href property to navigate to the new page
    window.location.href = newPageURL;
});



