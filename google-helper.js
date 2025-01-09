console.log('google helper has been loaded');

let tokenClient;
let sheetData = [];

// tokenClient Setup
window.onload = function () {
    const data = sessionStorage.getItem('data');
    if (data) {
        window.location.replace('periodictable.html');
    }

    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: '677404942614-3tkv1gdnq85k6ll9o4plmf7658jblhnl.apps.googleusercontent.com',
        scope: 'https://www.googleapis.com/auth/spreadsheets.readonly',
        prompt: '',
        callback: (tokenResponse) => {
            if (tokenResponse && tokenResponse.access_token) {
                getGoogleSheetData(tokenResponse.access_token);
            }
        },
    });

    const button = document.getElementById('signInButton');
    button.addEventListener('click', function (event) {
        tokenClient.requestAccessToken();
    });
};

function getGoogleSheetData(accessToken) {
    const spreadsheetId = '1Uw4EPjNBNI9LWj8g--7DxQVHYJ8lE3WkhqJslmgjTgw';
    const range = 'Sheet1!A2:F201';

    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            sessionStorage.setItem('data', JSON.stringify(data.values));
            window.location.replace('periodictable.html');
        })
        .catch((error) => {
            console.error('Error fetching sheet data:', error);
        });
}