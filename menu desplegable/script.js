
const shareButton = document.querySelector('.share-button');
const toggleSocials = () => {
    const socialsWrapper = document.querySelector('.socials-wrapper')
    const shareButtonImage = shareButton.querySelector('img')
    
    socialsWrapper.classList.toggle('active')

    if (shareButtonImage.src.includes('share')) {
        shareButtonImage.src = 'assets/close.svg';
    } else {
        shareButtonImage.src = 'pokebola-llena.png';
    }
}

shareButton.addEventListener('click', toggleSocials);


