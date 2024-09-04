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

const API = 'api.edutrashgo.com/api';

function saveLogout() {
  localStorage.setItem('APIlogout', API + '/logout');
}
APIlogin = API + '/login';
APIpartner4 = API + '/partner4';
APIcreateuser = API + '/create4';
APIedit4 = API + '/edit4/';
APIupdate4 = API + '/update4/';
APIlistuser = API + '/index4';
APIupdatestatus = API + `/updatestatus/`;

