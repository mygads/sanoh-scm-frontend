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


// API Test No Auth
APIreadfile = API + '/listingreporttest/file/';

// API Global
API_poView = API + `/pohview/`;
API_dnView = API + `/dnhview/`;
API_labelView = API + `/lbview/`;

// supper admin 
APIpartner4 = API + '/partner4';
APIcreateuser = API + '/create4';
APIedit4 = API + '/edit4/';
APIupdate4 = API + '/update4/';
APIlistuser = API + '/index4';
APIupdatestatus = API + `/updatestatus/`;


// purchasing
API_readPerformanceReportPurchasing = API + `/listingreport3/file/`;
APIpartner3 = API + `/partner3`;
APIindexlistingreport = API + `/indexlistingreport3`;
APIuploadlisting = API + `/createlistingreport3`;
APIindexpoheader3 = API + `/indexpoheader3`;
APIpohistory3 = API + `/pohistory3`;
API_SyncPurchasing = API + `/sync`;


// warehouse
APIpartner2 = API + `/partner2`;
APIindexdnheader2 = API + `/indexdnheader2`;
APIindexdndetail2 = API + '/indexdndetail2/';
APIdnhistory2 = API + `/dnhistory2`;
APIdnViewWarehouse2 = API + `/dnhview2/`;
API_SyncWarehouse = API + `/sync`;


// supplier
API_dashboardSupplier = API + `/dashboard`;
API_indexPOSupplier = API + `/indexpoheader1/`;
API_updatePOSupplier = API + `/updatepoheader1/`;
API_indexPerformanceReportSupplier = API + `/indexlistingreport1`;
API_indexDNSupplier = API + `/indexdnheader1`;
API_indexPOHistorySupplier = API + `/pohistory1/`;
API_indexDNHistorySupplier = API + `/dnhistory1/`;
API_readPerformanceReportSupplier = API + `/listingreport1/file/`;
API_indexPODetailSupplier = API + `/indexpodetail1/`;
API_indexDNDetailUpdateSupplier = API + `/updatedndetail1`;

