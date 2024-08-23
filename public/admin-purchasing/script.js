const apiURL = 'http://127.0.0.1:8000/api/indexpoheader';
let purchaseOrder = [];
let filteredData = [];

async function fetchPurchaseOrders() {
    try {
        console.log("Fetching data...");
        const response = await fetch(apiURL);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data fetched:", data);

        purchaseOrder = data.data.map(po => ({
            noPO: po.po_no.toString(),
            poDate: po.po_date,
            planDelivery: po.planned_receipt_date,
            poRevision: `Rev ${po.po_revision_no.toString().padStart(2, '0')}`,
            revisionDate: po.po_revision_date,
            status: po.po_status,
            response: po.response,
            note: 'Urgent Delivery',
            details: po.detail.map((detail, index) => ({
                no: (index + 1).toString(),
                partNumber: detail.bp_part_no,
                partName: detail.item_desc_a,
                price: detail.price,
                UoM: detail.purchase_unit,
                QTY: detail.po_qty,
            }))
        }));

        // Set filteredData to match purchaseOrder initially
        filteredData = purchaseOrder;

        // Call functions to display data and setup pagination
        displayTableData(1);
        updatePagination();
    } catch (error) {
        console.error('Error fetching purchase orders:', error);
    }
}

async function fetchPODetails(po_no) {
    try {
        const detailsURL = `http://127.0.0.1:8000/api/indexpodetail/${po_no}`;
        const response = await fetch(detailsURL);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(`Details fetched for PO ${po_no}:`, data);

        if (data.success && data.data) {
            return data.data.map((detail, index) => ({
                no: (index + 1).toString(),
                partNumber: detail.bp_part_no,
                partName: detail.item_desc_a,
                price: detail.price,
                UoM: detail.purchase_unit,
                QTY: detail.po_qty,
            }));
        } else {
            console.error('No data found or unexpected format.');
            return [];
        }
    } catch (error) {
        console.error(`Error fetching details for PO ${po_no}:`, error);
        return [];
    }
}