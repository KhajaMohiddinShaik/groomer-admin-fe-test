import '../App.css';
import TimePicker from './TimePicker';

function SalonTimings({ inputs, setInputs, isReadOnly }) {
    // const hours = Array.from({ length: 12 }, (_, i) => i + 1);
    // const minutes = Array.from({ length: 60 }, (_, i) => i);

    return (
        <div className="form-group">
            <label className="label">Salon Timings:</label>
            <div className="input" style={{ display: "flex", flexDirection: "row" }}>
                {/* Container for opening time */}
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <label style={{ marginRight: "20px" }}>Opening Time</label>
                    {/* TimePicker component for selecting opening time */}
                    <div className='select-wrapper' style={{ background: "rgba(123, 123, 123, 0.25)", padding: "0px 5px 0px 10px", borderRadius: "20px" }}>
                        <TimePicker timeperiods={['AM']} inputs={inputs} setInputs={setInputs} label="opening_time" />
                    </div>
                </div>
                {/* Container for closing time */}
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <label style={{ marginLeft: "40px", marginRight: "20px" }}>Closing Time</label>
                    {/* TimePicker component for selecting closing time */}
                    <div className='select-wrapper' style={{ background: "rgba(123, 123, 123, 0.25)", padding: "0px 5px 0px 10px", borderRadius: "20px" }}>
                        <TimePicker timeperiods={['PM']} inputs={inputs} setInputs={setInputs} label="closing_time" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SalonTimings;