import '../App.css';

function OwnershipDetails({ inputs, setInputs, handleChange, isReadOnly }) {

    return (
        <>
            {/* Section for Ownership details */}
            <div className='form-group'>
                <div className='label' style={{ textDecoration: "underline", fontWeight: "bold", marginBottom: "30px", fontSize: "20px", marginTop: "20px" }}>Ownership details</div>
            </div>
            <div className='ownerdetails'>
                <div className='form-group'>
                    <div className='label'>Owner name:</div>
                    <div className='input'><input
                        type="text"
                        name="owner_name"
                        value={inputs.owner_name || ""}
                        onChange={handleChange}
                        readOnly={isReadOnly}
                    /></div>
                </div>
                <div className='form-group'>
                    <div className='label'>Mobile number:</div>
                    <div className='input'><input
                        type="text"
                        name="owner_mobile"
                        value={inputs.owner_mobile || ""}
                        onChange={handleChange}
                        readOnly={isReadOnly}
                    /></div>
                </div>
                <div className='form-group'>
                    <div className='label'>Bank name:</div>
                    <div className='input'><input
                        type="text"
                        name="bank_name"
                        value={inputs.bank_name || ""}
                        onChange={handleChange}
                        readOnly={isReadOnly}
                    /></div>
                </div>
                <div className='form-group'>
                    <div className='label'>Account number:</div>
                    <div className='input'><input
                        type="text"
                        name="bank_account_number"
                        value={inputs.bank_account_number || ""}
                        onChange={handleChange}
                        readOnly={isReadOnly}
                    /></div>
                </div>
                <div className='form-group'>
                    <div className='label'>IFSC code:</div>
                    <div className='input'><input
                        type="text"
                        name="bank_IFSC_code"
                        value={inputs.bank_IFSC_code || ""}
                        onChange={handleChange}
                        readOnly={isReadOnly}
                    /></div>
                </div>
                <div className='form-group'>
                    <div className='label'>PAN Card number:</div>
                    <div className='input'><input
                        type="text"
                        name="owner_pancard_number"
                        value={inputs.owner_pancard_number || ""}
                        onChange={handleChange}
                        readOnly={isReadOnly}
                    /></div>
                </div>
            </div>
        </>
    );
}

export default OwnershipDetails;