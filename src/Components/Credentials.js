import '../App.css';


function Credentials({ inputs, handleChange, isReadOnly }) {

    return (
        <div className='credentials' style={{ float: "right", marginRight: "15vw" }}>
            <div style={{ fontSize: "14px" }}>
                <div style={{ fontWeight: "bold", fontSize: "19px", textDecoration: "underline" }}>Credentials:</div>
                <p><label style={{ fontWeight: "500" }}>Username:</label><input style={{ background: "none" }} size="15" type="text" name="username" onChange={handleChange} value={inputs.username || ""} readOnly={isReadOnly} /></p>
                <p><label style={{ fontWeight: "500" }}><b>Password:</b></label><input style={{ background: "none" }} size="15" type="text" name="password" onChange={handleChange} value={inputs.password || ""} readOnly={isReadOnly} /></p>
            </div>
        </div>
    );
}

export default Credentials;