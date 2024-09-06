const dummyData = [
    {
      username: '1',
      password: '1234abcd',
      access_token: 'dummyAccessToken123',
      name: 'NAME DUMMY Supplier1',
      bp_code: 'SANOH',
      role: '1'
    },
    {
      username: '2',
      password: '1234abcd',
      access_token: 'dummyAccessToken123',
      name: 'NAME DUMMY Warehouse1',
      bp_code: 'SANOH',
      role: '2'
    },
    {
      username: '3',
      password: '1234abcd',
      access_token: 'dummyAccessToken123',
      name: 'NAME DUMMY Purchasing1',
      bp_code: 'SANOH',
      role: '3'
    },
    {
      username: '4',
      password: '1234abcd',
      access_token: 'dummyAccessToken123',
      name: 'NAME DUMMY Admin1',
      bp_code: 'SANOH',
      role: "4"
    },
];

const API = 'https://api.edutrashgo.com/api';

function saveLogout() {
  const userRole = localStorage.getItem('userRole');

  if(userRole) {
    if (userRole === '1') {
      role = '/supplier';
    } else if (userRole === '2') {
      role = '/warehouse';
    } else if (userRole === '3') {
      role = '/purchasing'
    } else if (userRole === '4') {
      role = '/adming'
    }
  }
  localStorage.setItem('APIlogout', API + role + '/logout');
}

APIlogin = API + '/login';
APIpartner4 = API + '/partner4';
APIcreateuser = API + '/create4';
APIedit4 = API + '/edit4/';
APIupdate4 = API + '/update4/';
APIlistuser = API + '/index4';
APIupdatestatus = API + `/updatestatus/`;
APIpartner2 = API + `/partner2`;
APIindexdnheader2 = API + `/indexdnheader2`;
APIindexdndetail2 = API + '/indexdndetail2/';
APIpartner3 = API + `/partner3`;
APIindexlistingreport = API + `/indexlistingreport3`;
APIuploadlisting = API + `/createlistingreport3`;
APIpartner3 = API + `/partner3`;
APIreadfile = API + '/listingreporttest/file/'
APIindexlistingreportSupplier = API + `/indexlistingreport1`;



