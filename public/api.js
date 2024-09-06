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
      role = '/admin'
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
APIreadfile = API + '/listingreporttest/file/';

// supplier
API_indexPOSupplier = API + `/indexpoheader1/`;
API_updatePOSupplier = API + `/updatepoheader1/`;
API_indexPerformanceReportSupplier = API + `/indexlistingreport1`;
API_indexDNSupplier = API + `/indexdnheader1`;
API_indexPOHistorySupplier = API + `/pohistory1/`;
API_indexDNHistorySupplier = API + `/dnhistory1/`;


