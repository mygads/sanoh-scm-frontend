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

// Call fetchHistoryPurchaseOrders to initiate the data fetch when the page loads
// fetchHistoryPurchaseOrders();
