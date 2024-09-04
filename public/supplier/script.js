// p

async function fetchDNDetails(dn_no) {
    try {
        const detailsDNURL = `http://127.0.0.1:8000/api/indexdndetail/${dn_no}`;
        const response = await fetch(detailsDNURL);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(`Details fetched for DN ${dn_no}:`, data);

        if (data.success && data.data) {
            const processedDetails = data.data.map((detail, index) => ({
                no: (index + 1).toString(),
                dnDetailNo: detail.dn_detail_no,
                planDelivery: detail.plan_delivery_date,
                partNumber: detail.part_no || '',
                partName: detail.item_desc_a || '',
                UoM: detail.dn_unit || '',
                QTY: detail.dn_qty || 0,
                qtyLabel: detail.dn_snp || '',
                qtyRequested: detail.dn_qty || 0,
                qtyConfirm: detail.qty_confirm || 0,
                qtyDelivered: detail.receipt_qty || 0,
                qtyReceived: detail.receipt_qty || 0,
                qtyMinus: (detail.dn_qty - (detail.receipt_qty || 0)).toString()
            }));
            console.log('Processed DN Details:', processedDetails);
            return processedDetails;
        } else {
            console.error('No data found or unexpected format.');
            return [];
        }
    } catch (error) {
        console.error(`Error fetching details for DN ${dn_no}:`, error);
        alert(`Failed to fetch delivery note details. Please try again later.`);
        return [];
    }
}

// Async function to edit DN detail (if needed, you might not need this depending on your API)
async function editDNDetail(dn_detail_no, qtyConfirm) {
    const response = await fetch(`http://127.0.0.1:8000/api/edit/${dn_detail_no}`, {
        method: 'PUT',  // Changed from POST to PUT
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ qtyConfirm: qtyConfirm }),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

// Async function to update DN detail and refresh UI
async function updateDNDetail(dn_detail_no, qtyConfirm) {
    try {
        // Log the payload being sent
        console.log(`Updating DN Detail No: ${dn_detail_no}, Qty Confirm: ${qtyConfirm}`);

        const response = await fetch(`http://127.0.0.1:8000/api/updatedndetail/${dn_detail_no}`, {
            method: 'PUT',  // Ensure the correct HTTP method is used
            headers: {
                'Content-Type': 'application/json',
            },
            // Send the field as "qty_confirm" to match the server's expectation
            body: JSON.stringify({ qty_confirm: parseInt(qtyConfirm) }),  // Ensure qty_confirm is an integer
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error(`Error details:`, errorData);
            // Log each field error if present
            if (errorData.errors) {
                for (const [field, error] of Object.entries(errorData.errors)) {
                    console.error(`Validation error in field "${field}": ${error}`);
                }
            }
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || 'Unknown error'}`);
        }

        const updatedData = await response.json();
        console.log(`Successfully updated DN Detail No: ${dn_detail_no}`, updatedData);

        // Update the UI with the new data
        updateUIDetail(dn_detail_no, qtyConfirm);

        return updatedData;
    } catch (error) {
        console.error(`Failed to update DN detail ${dn_detail_no}:`, error);
        throw error;
    }
}

function updateUIDetail(dn_detail_no, qtyConfirm) {
    // Find the row corresponding to dn_detail_no
    const inputField = document.querySelector(`input[data-dn-detail-no='${dn_detail_no}']`);
    if (inputField) {
        inputField.value = qtyConfirm;
        // Optionally, you could update other parts of the UI here, if needed.
        console.log(`UI updated for DN Detail No: ${dn_detail_no} with Qty Confirm: ${qtyConfirm}`);
    }
}

const bp_code = 'APFEY';  // Define bp_code as a constant
const apiHistoryPoURL = `http://127.0.0.1:8000/api/pohistory/${bp_code}`;
let historyPurchaseOrder = [];
let filteredHistoryPOData = [];

// Function to fetch purchase orders from the API
async function fetchHistoryPurchaseOrders() {
    try {
        console.log("Fetching data...");
        const response = await fetch(apiHistoryPoURL);

        if (!response.ok) {
            const errorText = await response.text(); // Get the response body text for more details
            throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        console.log("Data fetched:", data);

        // Log the data to see the structure
        data.data.forEach(po => console.log("PO Data:", po));

        // Check if data and data.data exist
        if (data.success && data.data) {
            historyPurchaseOrder = data.data
                .filter(po => po.po_status && po.po_status.toLowerCase() === 'closed')  // Filter by status
                .map(po => ({
                    noPO: po.po_number ? po.po_number.toString() : 'No PO Number',
                    poDate: po.po_date || 'No Date Provided',                  
                    status: po.po_status || 'Unknown Status',
                    details: po.detail ? po.detail.map((detail, index) => ({
                        no: (index + 1).toString(),
                        partNumber: detail.bp_part_no || 'No Part Number',
                        partName: detail.item_desc_a || 'No Item Description',
                        UoM: detail.purchase_unit || 'No UoM',
                        QTY: detail.po_qty || 'No Quantity'
                    })) : []
                }));

            // Set filteredHistoryPOData to match historyPurchaseOrder initially
            filteredHistoryPOData = historyPurchaseOrder;
            filteredHistoryPODetailData = historyPurchaseOrder;

            // Call functions to display data and setup pagination
            if (typeof displayTableData === 'function') {
                displayTableData(1);
            } else {
                console.error('displayTableData function is not defined.');
            }
            
            if (typeof updatePagination === 'function') {
                updatePagination();
            } else {
                console.error('updatePagination function is not defined.');
            }
        } else {
            console.error('No data found or unexpected format.');
        }
    } catch (error) {
        console.error('Error fetching purchase orders:', error);
    }
}

// Call fetchHistoryPurchaseOrders to initiate the data fetch when the page loads
// fetchHistoryPurchaseOrders();