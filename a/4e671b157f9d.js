function getSectionPartinURLBar(){
    const currentLocation = window.location.href;
    if (currentLocation.includes('#')) {
        const sectionId = currentLocation.split('#')[1];
     return sectionId;
    } else {
    return false;
    }
}
